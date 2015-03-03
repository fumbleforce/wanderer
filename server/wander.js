

Meteor.methods({
    Wander: function () {
        var area = Meteor.user().location.split("|")[0];
        console.log("Wandering in ", area);

        Meteor.call("BattleRandomEncounter", Meteor.user().location);
    }
})