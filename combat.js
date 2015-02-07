
/*


*/
BattleCollection = new Meteor.Collection('battle');

Battle = {};

Battle.start = function (opts) {

    Meteor.call("BattleStart", opts, function (err, res) {
        Session.set("userStatus", "combat");
    });
};

Battle.getActive = function () {
    return BattleCollection.findOne({ party: { $elemMatch: { _id: Meteor.userId() } } });
};

Battle.me = function () {
    var el = _.find(Battle.getActive().party, function (el) { return el._id === Meteor.userId(); });
    console.log("Battle.me", el)
    return el
}

if (Meteor.isClient) {


} else {


Meteor.methods({
    BattleStart: function (opts) {

        var id = BattleCollection.insert(opts);
        return id;
    },

    BattleEnd: function (id) {
        BattleCollection.remove(id);
    },

    BattleTakeAction: function (opts) {
        var category = opts.category,
            action = opts.action,
            target = opts.target,
            battle = Battle.getActive();

        if (action === "flee") {
            if (Math.random() > 0.6) {
                BattleCollection.update(battle._id, {
                    $push: { log: Meteor.user().name + " tried to flee, but failed." }
                });
            } else {
                Meteor.call("BattleEnd", battle._id);
            }
            return
        }

        /// TODO !!!
        if (category === "magical") {

        } else if (category == "physical") {

        }
        var skill = Spell.get(action, Battle.me());

        BattleCollection.update(battle._id, {
            $push: { log: target + " was hit by " + action }
        });


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






}
