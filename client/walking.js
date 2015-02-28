
Template.registerHelper("biome", function (biome) {
    return Locations.get(Meteor.user().location).biome === biome;
});

Template.uiWalking.helpers({
    campingAction: function () { return Session.get("campingAction"); },

    west: function () {
        return constructDirection("west");
    },
    east: function () {
        return constructDirection("east");
    },
    north: function () {
        return constructDirection("north");
    },
    south: function () {
        return constructDirection("south");
    },
});

Template.uiWalking.events({
    "click .action": function (e, t) {
        var action = e.currentTarget.getAttribute("action");

        if (action === "west") {
            Meteor.call("CharacterGo", "west");
        } else if (action === "east") {
            Meteor.call("CharacterGo", "east");
        } else if (action === "south") {
            Meteor.call("CharacterGo", "south");
        } else if (action === "north") {
            Meteor.call("CharacterGo", "north");
        } else if (action === "camp") {
            Session.set("userStatus", "camping");
        } else if (action === "city") {
            Session.set("userStatus", "town");
        } else if (action === "village") {
            Session.set("userStatus", "town");
        }
    }
});
