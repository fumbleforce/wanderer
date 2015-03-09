var countdownDep = new Tracker.Dependency();
var countdownInterval;

Session.set("travelArrived", true);


Meteor.autorun(function () {
    if (Meteor.user() == undefined) return;

    var travel = Meteor.user().travel;

    if (travel.active && Math.floor((new Date(travel.arrival) - new Date())/1000) > 0) {
        Meteor.clearInterval(countdownInterval);
        countdownInterval = Meteor.setInterval(travelTick, 1000);
    } else {
        Session.set("travelArrived", true);
        Meteor.clearInterval(countdownInterval);
    }
});

var travelTick = function () {
    var look = Meteor.user().travel.look;

    _.each(look, function (val, key) {
        if (val) discover(key);
    });

    countdownDep.changed();
};

function discover (type) {
    var look = Meteor.user().travel.look;

    if (type === "prey") {
        type = "meat";
    }

    if (!look[type])
        return Session.set("discovered"+type, undefined);

    console.log("discoveryDur"+type, Session.get("discoveryDur"+type))

    if (Session.get("discoveryDur"+type) > 0) {
        Session.set("discoveryDur"+type, Session.get("discoveryDur"+type)-1);
    } else {
        var discoveryChance = 10;

        if (Math.floor(Math.random()*100) > discoveryChance)
            return Session.set("discovered"+type, undefined);

        var loc = Locations.getArea(Meteor.user().location);
        var possibleItems = Item.filter({ danger: loc.danger, category: type });
        var discoveredItem = possibleItems[Math.floor(Math.random()*possibleItems.length)];
        if (discoveredItem == undefined) {
            console.log("Looked for ", type, "but found nothing")
            return Session.set("discovered"+type, undefined);
        }
        console.log("discovered"+type, discoveredItem.id);
        Session.set("discovered"+type, discoveredItem.id);
        Session.set("discoveryDur"+type, 3);
    }
};

Template.travel.helpers({
    destination: function () {
        var travel = Meteor.user().travel;
        if (!travel.locTo) return;
        if (travel.locTo.split("|").length > 1) {
            return labelify(travel.locTo.split("|")[1]) + " in " + labelify(travel.locTo.split("|")[0]);
        }
        return labelify(travel.locTo)
    },

    timeLeft: function () {
        countdownDep.depend();
        var travel = Meteor.user().travel,
            timeLeft = Math.floor((new Date(travel.arrival) - new Date())/1000);

        if (timeLeft < 0) timeLeft = 0;

        return timeLeft;
    },

    progress: function () {
        countdownDep.depend();
        var travel = Meteor.user().travel,
            totalTime = Math.floor((new Date(travel.arrival) - new Date(travel.start))/1000),
            timeLeft = Math.floor((new Date(travel.arrival) - new Date())/1000);

        if (timeLeft < 0) timeLeft = 0;

        return 100 * (totalTime-timeLeft)/totalTime;
    },

    arrived: function () {
        countdownDep.depend();
        var travel = Meteor.user().travel,
            timeLeft = new Date(travel.arrival) - new Date(),
            arrived = timeLeft < 0;

        if (arrived) {
            Meteor.clearInterval(countdownInterval);
        }
        Session.set("travelArrived", arrived);
        return Session.get("travelArrived");
    },

    wandering: function () {
        return Meteor.user().travel.locTo === Meteor.user().location;
    },

    onPath: function () {
        return Meteor.user().travel.onPath;
    },

    lookingFor: function () {
        var look = _.map(Meteor.user().travel.look, function (el, key) {
            return { looking: el, id: key};
        });
        look = _.filter(look, function (el) { return el.looking; });
        return look;
    },

    discovered: function (type) {
        countdownDep.depend();
        if (type === "prey") {
            type = "meat";
        }
        var discovered = Session.get("discovered"+type);
        if (discovered == undefined) return;
        return labelify(discovered);
    },

    discoveredId: function (type) {
        countdownDep.depend();
        if (type === "prey") {
            type = "meat";
        }
        var discovered = Session.get("discovered"+type);
        if (discovered == undefined) return;
        return discovered;
    }
});

Template.travel.events({
    "click .complete": function () {
        var travel = Meteor.user().travel;
        Meteor.call("TravelComplete");

        Meteor.clearInterval(countdownInterval);

        if (travel.locTo.split("|").length > 1) {
            Meteor.call("PartyStatus", "town");
            Session.set("userStatus", "town");
        } else {
            Meteor.call("PartyStatus", "navigation");
            Session.set("userStatus", "navigation")
        }
    },

    "click .cancel": function () {
        Meteor.call("TravelCancel")
        Meteor.clearInterval(countdownInterval);

        if (Meteor.user().location.split("|").length > 1) {
            Meteor.call("PartyStatus", "town");
            Session.set("userStatus", "town");
        } else {
            Meteor.call("PartyStatus", "navigation");
            Session.set("userStatus", "navigation")
        }
    },

    "click [discover]": function (e) {
        var itemid = e.currentTarget.getAttribute("discover"),
            type = e.currentTarget.getAttribute("discover-type");
        console.log("Adding", itemid)
        Session.set("discovered"+type, undefined);
        Meteor.call("StorageAdd", { id: itemid, qty: 1 });
    }
})