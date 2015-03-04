

Meteor.methods({
    TownWalkStreets: function () {


        // Random encounters here

        Meteor.call("BattleRandomEncounter", Meteor.user().location);
    },
});