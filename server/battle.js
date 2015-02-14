

Meteor.methods({
    BattleStart: function (opts) {

        var id = BattleCollection.insert(opts);
        return id;
    },

    BattleEnd: function (id) {
        BattleCollection.remove(id);
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

            updateInc["enemy."+target+".health"] = -damage;
            updateSet["enemy."+target+".dead"] = battle.enemy[target].health - damage <= 0;
            updatePush["log"] = Battle.me().name + " attacked " + target + " with " + skill.name  + " and dealt " + damage + " damage";

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

        var monster = _.find(battle.enemy, function (m) { return m._id === battle.turnList[battle.turn].id });

        if (monster == undefined) {
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
            return;
        }

        var spell = Spell.get(monster.spells[Math.floor(monster.spells.length * Math.random())], monster);


        if (spell.target === "enemy") {
            // Do action to enemy

            var damage = spell.damage,
                target = Math.floor(Math.random()* battle.party.length);

            updateInc["party."+target+".health"] = -damage;
            updateSet["party."+target+".dead"] = battle.party[target].health - damage <= 0;
            updatePush["log"] = monster.name + " attacked " + battle.party[target].name + " with " + spell.name  + " and dealt " + damage + " damage" ;

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
            Meteor.call("StorageAddMultiple", loot);
            console.log("populatinv loot")
            loot = _.map(loot, function (i) {
                return Item.get(i.id).el;
            });
            console.log("updating battle, loot is", loot)
            BattleCollection.update(battle._id, {
                $set: { won: true },
                $push: { log: "Battle won. Received " + loot }
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
        var location = Locations.get(loc),
            enemy = [], m,
            danger = location.danger || 0,
            enemy_number = Math.floor(Math.random()*3) + 1;

        var monsters = Monster.find({ danger: danger, habitat: location.biome });

        for (var i = 0; i < enemy_number; i++) {
            m = _.extend({}, monsters[Math.floor(monsters.length * Math.random())]);
            m.name += " " + (i+1);

            // random id
            m._id = ""+i;
            enemy.push(m);
        }

        var party = [Meteor.user()];

        var turnDict = {},
            turnList = [];

        _.each(enemy, function (e) { turnList.push({ id: e._id, name: e.name, quickness: e.physicalSkills.quickness }); });
        _.each(party, function (a) { turnList.push({ id: a._id, name: a.name, quickness: a.physicalSkills.quickness }); });
        turnList = _.sortBy(turnList, function (o) { return o.quickness + Math.random()/2.0; });

        var id = BattleCollection.insert({
            type: "npc",
            party: party,
            enemy: enemy,
            turn: 0,
            log: [],
            turnList: turnList,
        });
    }
});