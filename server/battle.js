

Meteor.methods({
    BattleStart: function (opts) {

        var id = BattleCollection.insert(opts);
        return id;
    },

    BattleEnd: function (id) {
        BattleCollection.update(id, { $set: { left: true }});

        var status = "walking";
        if (Meteor.user().location.split("|").length > 1) {
            status = "walking";
        }

        PartyCollection.update({ members: Meteor.user().name }, {
            $set: { status: status }
        });


    },

    BattleTakeAction: function (opts) {
        /*
        Execute a player action in the battle.

        Category:
            physical
            magical
            item

        Action:
            <spell id>

        Target:
            id of the target, friendly or hostile based on spell
        */

        var category = opts.category,
            action = opts.action,
            target = opts.target,
            player = Meteor.user(),
            battle = Battle.getActive();


        if (action === "flee") {
            //[NEED CHANGE] Static 60% chance to flee, to be changed
            if (Math.random() > 0.6) {
                BattleCollection.update(battle._id, {
                    $push: { log: Meteor.user().name + " tried to flee, but failed." }
                });
            } else {
                Meteor.call("BattleEnd", battle._id);
            }
            return;
        }

        var skill = Spell.get(action, Battle.me()),
            updateSet = {},
            updateInc = {},
            updatePush = {};

        if (battle.turn === battle.turnList.length -1) {
            updateSet["turn"] = 0;
        } else {
            updateSet["turn"] = battle.turn +1;
        }

        if (skill.target === "enemy") {
            // Do action to enemy

            var damage = skill.damage;

            var userInc = {},
                baseSkill = skill.baseSkill;
            if (baseSkill in player.physicalSkills) {
                userInc["physicalSkills."+baseSkill] = 0.1;
            } else if (baseSkill in player.mentalSkills) {
                userInc["mentalSkills."+baseSkill] = 0.1;
            } else if (baseSkill in player.weaponSkills) {
                userInc["weaponSkills."+baseSkill] = 0.1;
            } else if (baseSkill in player.spellSkills) {
                userInc["spellSkills."+baseSkill] = 0.1;
            }

            updateInc["enemy."+target+".health"] = -damage;
            updateSet["enemy."+target+".dead"] = battle.enemy[target].health - damage <= 0;
            updatePush["log"] = Battle.me().name + " attacked " + target + " with " + skill.name  + " and dealt " + Math.floor(damage) + " damage";

            User.update({
                $inc: userInc
            });

            BattleCollection.update(battle._id, {
                $set: updateSet,
                $inc: updateInc,
                $push: updatePush
            });
        } else {
            // Do action to ally
        }

        Meteor.call("BattleCheckStatus");
    },

    BattleAIAction: function () {
        console.log("Ai Action battle");

        var action = "",
            target = 0,
            battle = Battle.getActive();

        var monster = _.find(battle.enemy, function (m) {
            return m._id === battle.turnList[battle.turn].id
        });

        console.log("Current turn:", battle.turnList[battle.turn].id)

        if (monster == undefined) {
            console.log("Monster is undefined, returning")
            return;
        }

        var updateSet = {},
            updateInc = {},
            updatePush = {};

        if (battle.turn === battle.turnList.length -1) {
            updateSet["turn"] = 0;
        } else {
            updateSet["turn"] = battle.turn +1;
        }

        if (monster.dead) {
            BattleCollection.update(battle._id, {
                $set: updateSet,
            });
            console.log(monster, "died")
            return;
        }

        var spell = Spell.get(monster.spells[Math.floor(monster.spells.length * Math.random())], monster);

        if (spell.target === "enemy") {
            // Do action to enemy

            var damage = spell.damage,
                target = Math.floor(Math.random()* battle.party.length);

            updateInc["party."+target+".health"] = -damage;
            updateSet["party."+target+".dead"] = battle.party[target].health - damage <= 0;
            updatePush["log"] = monster.name + " attacked " + battle.party[target].name + " with " + spell.name  + " and dealt " + Math.floor(damage) + " damage" ;

            BattleCollection.update(battle._id, {
                $set: updateSet,
                $inc: updateInc,
                $push: updatePush
            });
        } else {
            // Do action to ally
        }

        Meteor.call("BattleCheckStatus");
    },

    BattleCheckStatus: function () {
        console.log("checking status of battle")

        var won = false,
            lost = false,
            battle = Battle.getActive();

        var deadEnemies = 0;
        _.each(battle.enemy, function (e) {
            if (e.dead) {
                deadEnemies++;
            }
        });

        if (deadEnemies === battle.enemy.length) {
            // Won
            console.log("You won!")
            var loot = _.flatten(_.map(battle.enemy, function (e) {
                return Item.resolveLoot(e.loot);
            }));

            console.log("Adding loot", loot);

            var leaderStorage = Meteor.users.findOne(battle.party[0]._id).storage;
            leaderStorage = StorageAddMultiple(leaderStorage, loot);
            Meteor.users.update({ name: battle.party[0] }, { $set: { storage: leaderStorage }});

            console.log("populatinv loot")
            loot = _.map(loot, function (i) {
                return Item.get(i.id).el;
            });
            console.log("updating battle, loot is", loot)
            BattleCollection.update(battle._id, {
                $set: { won: true },
                $push: { log: "Battle won. Leader received " + loot }
            });

        }


        var deadAllies = 0;
        _.each(battle.party, function (e) {
            if (e.dead) {
                deadAllies++;
            }
        });

        console.log(deadAllies, "out of", battle.party.length, "allies are dead")

        if (deadAllies === battle.party.length) {
            // Lost
            console.log("you lost :(");
            BattleCollection.update(battle._id, {
                $set: { lost: true },
                $push: { log: "Battle lost." }
            });
        }
    },

    BattleRandomEncounter: function (loc) {
        var location;
        if (loc.split("|").length > 1) {
            var town = Locations.getTown(loc);
            location = {
                danger: Locations.getArea(loc).danger,
                biome: town.type
            }
        } else {
            location = Locations.getArea(loc);
        }

        var enemy = [], m,
            danger = location.danger || 0,
            enemy_number = Math.floor(Math.random()*3) + 1;

        console.log("Random encounter in", location)

        var monsters = Monster.find({ danger: danger, habitat: location.biome });
        console.log("Monsters: ", monsters)

        if (monsters.length === 0) {
            throw new Meteor.Error("No monsters in this area");
        }

        for (var i = 0; i < enemy_number; i++) {
            m = _.extend({}, monsters[Math.floor(monsters.length * Math.random())]);
            m.name += " " + (i+1);

            // random id
            m._id = ""+i;
            enemy.push(m);
        }

        var party = PartyCollection.findOne({ members: Meteor.user().name });
        var partyMembers = [];
        if (party == null) {
            partyMembers = [Meteor.user().name];
        } else {
            partyMembers = party.members;
        }

        partyMembers = _.map(partyMembers, function (name) {
            return Meteor.users.findOne({ name: name });
        });

        var turnDict = {},
            turnList = [];

        console.log("Enemies:", enemy);
        //console.log("Party:", party);

        _.each(enemy, function (e) {
            turnList.push({
                id: e._id,
                name: e.name,
                quickness: e.physicalSkills.quickness || 0
            });
        });

        _.each(partyMembers, function (a) {
            turnList.push({
                id: a._id,
                name: a.name,
                quickness: a.physicalSkills.quickness || 0
            });
        });

        turnList = _.sortBy(turnList, function (o) {
            return o.quickness + Math.random()/2.0;
        });

        var id = BattleCollection.insert({
            type: "npc",
            party: partyMembers,
            enemy: enemy,
            turn: 0,
            log: [],
            turnList: turnList,
            won: false,
            lost: false,
            left: false,
        });

        if (party != null) {
            PartyCollection.update(party._id, {
                $set: { status: "combat" }
            });
        }
    }
});
