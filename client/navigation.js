
Session.set("walkingStatus", "navigation");

Template.navigation.helpers({
    campingAction: function () { return Session.get("campingAction"); },

    location: function () {
        var loc = Meteor.user().location.split("|");
        if (loc.length === 1) {
            return "Somewhere in " + labelify(loc[0]);
        } else if (loc.length === 2) {
            return labelify(loc[1]) + " in " + labelify(loc[0]);
        }
    },

    danger: function () { return Locations.getArea(Meteor.user().location).danger; },

    walkingStatus: function (status) { return Session.get("walkingStatus") === status; },

    inTown: function () {
        return Meteor.user().location.split("|").length > 1;
    },

    town: function () {
        return Meteor.user().location.split("|")[1];
    },

    areas: function () {
        return _.filter(Locations.getAreas(), function (a) {
            return a.id != Meteor.user().location;
        });
    },

    towns: function () {
        return Locations.getTowns(Meteor.user().location.split("|")[0]);
    },
});

function startTravel (loc) {
    var followPath = $("#on-path").is(":checked");

    var look = {
        ore: $("#look-ore").is(":checked"),
        herb: $("#look-herbs").is(":checked"),
        prey: $("#look-prey").is(":checked"),
        material: $("#look-materials").is(":checked"),
    };

    console.log("followPath", followPath)
    Meteor.call("TravelStart", { loc: loc, onPath: followPath, look: look });
    Meteor.call("PartyStatus", "travelling");
    Session.set("userStatus", "travelling");
}

Template.navigation.events({
    "click .action": function (e, t) {
        var action = e.currentTarget.getAttribute("action");

        switch (action) {
            case "areas": Session.set("walkingStatus", "areas"); break;
            case "towns": Session.set("walkingStatus", "towns"); break;
            case "navigation": Session.set("walkingStatus", "navigation"); break;
            case "wander":
                startTravel();
                break;
            case "camp":
                Session.set("walkingStatus", "navigation");
                Session.set("userStatus", "camping");
                Meteor.call("PartyStatus", "camping");
                break;
        }
    },

    "click [loc]": function (e) {
        var loc = e.currentTarget.getAttribute("loc");
        startTravel(loc);
        Session.set("walkingStatus", "navigation");
    },
});
