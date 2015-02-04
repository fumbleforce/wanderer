
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

    BattleRandomEncounter: function (opts) {
        var location = Locations.get(opts.loc),
            enemy = [],
            danger = location.danger || 0,
            enemy_number = Math.floor(Math.random()*3);

        for (var i = 0; i < enemy_number; i++) {
            enemy.push(Monster.getByDanger(danger));
        }

        BattleCollection.insert({
            type: "npc",
            party: [Meteor.User()],
            enemy: enemy,
            round: 0,
        });
    }
})






}
