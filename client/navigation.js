
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
        return Meteor.user().location.split("|")[1] in Locations.towns;
    },

    inDungeon: function () {
        return Meteor.user().location.split("|")[1] in Locations.dungeons;
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
        return _.filter(Locations.getTowns(), function (t) {
            return t.id != Meteor.user().location.split("|")[1];
        });
    },

    dungeons: function () {
        return _.filter(Locations.getDungeons(), function (d) {
            return d.id != Meteor.user().location.split("|")[1];
        });
    },
});

function startWandering (loc) {
    var followPath = $("#on-path").is(":checked");

    var look = {
        ore: $("#look-ore").is(":checked"),
        herb: $("#look-herbs").is(":checked"),
        prey: $("#look-prey").is(":checked"),
        material: $("#look-materials").is(":checked"),
    };

    console.log("followPath", followPath)
    Meteor.call("TravelStart", { loc: loc, onPath: followPath, look: look });
    Status.set("travelling");
    console.log("Starting travel tick from nav")
    Meteor.setTimeout(startTravelTick, 2000);
}

Template.navigation.events({
    "click .action": function (e, t) {
        var action = e.currentTarget.getAttribute("action");
        console.log("Action", action)
        switch (action) {
            case "areas": Session.set("walkingStatus", "areas"); break;
            case "towns": Session.set("walkingStatus", "towns"); break;
            case "dungeons": Session.set("walkingStatus", "dungeons"); break;
            case "navigation": Session.set("walkingStatus", "navigation"); break;
            case "town":
                // Enter town from nav.
                Session.set("userStatus", "town");
                break;
            case "dungeon":
                // Enter dungeon from nav.
                Session.set("userStatus", "dungeon");
                break;
            case "wander":
                startWandering();
                break;
            case "camp":
                Session.set("walkingStatus", "navigation");
                Status.set("camping");
                break;
        }
    },

    "click [loc]": function (e) {
        var loc = e.currentTarget.getAttribute("loc");
        startWandering(loc);
        Session.set("walkingStatus", "navigation");
    },
});
