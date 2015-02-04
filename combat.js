
/*


*/
BattleCollection = new Meteor.Collection('battle');

if (Meteor.isClient) {

Meteor.startup(function () {
    Session.set("battleActive", false);
});



Battle = {};

Battle.start = function (opts) {

    Meteor.call("BattleStart", opts, function (err, res) {
        Session.set("battleActive", res);
    });
};












} else {


Meteor.methods({
    BattleStart: function (opts) {

        var id = BattleCollection.insert(opts);
        return id;
    },

    BattleRandomEncounter: function (loc) {
        var location = Locations.get(loc),
            enemy = [],
            danger = location.danger || 0,
            enemy_number = Math.floor(Math.random()*3);

        var monsters = Monster.find({ danger: danger, habitat: location.biome })
        for (var i = 0; i < enemy_number; i++) {
            enemy.push(monsters[Math.floor(monsters.length * Math.random())]);
        }

        var id = BattleCollection.insert({
            type: "npc",
            party: [Meteor.user()],
            enemy: enemy,
            round: 0,
        });

        Session.set("battleActive", id);
    }
})






}
