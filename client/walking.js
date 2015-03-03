
Session.set("walkingStatus", "navigation");

Template.uiWalking.helpers({
    campingAction: function () { return Session.get("campingAction"); },

    location: function () {
        var loc = Meteor.user().location.split("|");
        if (loc.length === 1) {
            return "Somewhere in " + labelify(loc[0]);
        } else if (loc.length === 2) {
            return labelify(loc[1]) + " in " + labelify(loc[0]);
        }
    },

    walkingStatus: function (status) { return Session.get("walkingStatus") === status; },

    inTown: function () {
        return Meteor.user().location.split("|").length > 1;
    },

    areas: function () {
        return Locations.getAreas();
    },

    cities: function () {
        return Locations.getTowns(Meteor.user().location.split("|")[0], "city");
    },

    villages: function () {
        return Locations.getTowns(Meteor.user().location.split("|")[0], "village");
    },
});

Template.uiWalking.events({
    "click .action": function (e, t) {
        var action = e.currentTarget.getAttribute("action");

        switch (action) {
            case "areas": Session.set("walkingStatus", "areas"); break;
            case "cities": Session.set("walkingStatus", "cities"); break;
            case "villages": Session.set("walkingStatus", "villages"); break;
            case "navigation": Session.set("walkingStatus", "navigation"); break;
            case "wander": 
                Meteor.call("Wander", function (err, res) {
                    
                });
                break;
            case "town":
                Session.set("userStatus", "town");
                Session.set("walkingStatus", "navigation");
                break;
            case "camp":
                Session.set("walkingStatus", "navigation");
                Session.set("userStatus", "camp");
                break;

        }
    },

    "click [area]": function (e) {
        var area = e.currentTarget.getAttribute("area");

        Meteor.call("TravelArea", area);
        Session.set("walkingStatus", "navigation");
    },

    "click [city]": function (e) {
        var city = e.currentTarget.getAttribute("city");

        Meteor.call("TravelTown", city);
        Session.set("userStatus", "town");

    },

    "click [village]": function (e) {
        var village = e.currentTarget.getAttribute("village");

        Meteor.call("TravelTown", village);
        Session.set("userStatus", "town");
    },
});
