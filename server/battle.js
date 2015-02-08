

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

        var skill = Spell.get(action, Battle.me());

        if (skill.target === "enemy") {
            // Do action to enemy

            var damage = skill.damage,
                enemyInc = {},
                enemySet = {};

            enemyInc["enemy."+target+".health"] = -damage;
            enemySet["enemy."+target+".dead"] = battle.enemy[target].health - damage <= 0;

            BattleCollection.update(battle._id, {
                $set: enemySet,
                $inc: enemyInc,
                $push: { log: Battle.me().name + " attacked " + target + " with " + action  + " and dealt " + damage + " damage" }
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

        console.log(deadEnemies, "out of", battle.enemy.length, "enemies are dead")

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
            enemy = [],
            danger = location.danger || 0,
            enemy_number = Math.floor(Math.random()*3) + 1;

        var monsters = Monster.find({ danger: danger, habitat: location.biome });

        for (var i = 0; i < enemy_number; i++) {
            enemy.push(monsters[Math.floor(monsters.length * Math.random())]);
        }

        var id = BattleCollection.insert({
            type: "npc",
            party: [Meteor.user()],
            enemy: enemy,
            turn: "party",
            log: [],
        });
    }
});
