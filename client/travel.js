var countdownDep = new Tracker.Dependency(),
    countdownInterval,
    started = new ReactiveVar(false);

Session.set("travelArrived", false);




/* Travel tick

Ticks every sec. when travelling.
Each tick triggers the discovery function,
that has a chance of discovering an item the player
is looking for.

Self-terminates if player has arrived.
*/
var travelTick = function () {

    var look = Meteor.user().travel.look;
    console.log("tick");

    if (Session.get("travelArrived")) {
        console.log("Arrived, stopping tick")
        Meteor.clearInterval(countdownInterval);
        return;
    }

    _.each(look, function (val, key) {
        if (val) discover(key);
    });

    countdownDep.changed();
};



/* discover

As long as the player is travelling,
the travelTick function calls this function.
It has a chance of triggering a discovery of a type
the player is looking for.

Types:
    prey
    material
    ore
    herb

The "type" is a category in the item list, and the item
discovered will be of the same "danger" level as the area
the player is in.

*/
function discover (type) {
    var look = Meteor.user().travel.look;

    if (!look[type]) {
        console.log("Not looking for", type)
        return Session.set("discovered"+type, undefined);
    }

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



/* startTravelTick

Starts up the tick function.
Should be called when initiating travel.
See the travelTick function.
*/
startTravelTick = function () {
    var travel = Meteor.user().travel;
    console.log("Time left", Math.floor((new Date(travel.arrival) - new Date())/1000), Math.floor((new Date(travel.arrival) - new Date())/1000) > 0);
    if (!Session.get("travelArrived") && travel.active && Math.floor((new Date(travel.arrival) - new Date())/1000) > 0) {
        Meteor.clearInterval(countdownInterval);
        countdownInterval = Meteor.setInterval(travelTick, 1000);
        console.log("Started tick")
        started.set(true);
    } else {
        console.log("Arrived")
        Session.set("travelArrived", true);
        Meteor.clearInterval(countdownInterval);
    }
}




Template.travelNav.helpers({

    /* destination

    Returns the labelified destination name.
    */
    destination: function () {
        var travel = Meteor.user().travel;
        if (!travel.locTo) return;
        if (travel.locTo.split("|").length > 1) {
            return labelify(travel.locTo.split("|")[1]) + " in " + labelify(travel.locTo.split("|")[0]);
        }
        return labelify(travel.locTo)
    },

    /* timeLeft

    Number of secons until player has arrived at destination.
    */
    timeLeft: function () {
        countdownDep.depend();
        var travel = Meteor.user().travel,
            timeLeft = Math.floor((new Date(travel.arrival) - new Date())/1000);

        if (timeLeft < 0) timeLeft = 0;

        return timeLeft;
    },

    /* progress

    Travel progress as a percentage.
    */
    progress: function () {
        countdownDep.depend();
        var travel = Meteor.user().travel,
            totalTime = Math.floor((new Date(travel.arrival) - new Date(travel.start))/1000),
            timeLeft = Math.floor((new Date(travel.arrival) - new Date())/1000);

        if (timeLeft < 0) timeLeft = 0;

        return 100 * (totalTime-timeLeft)/totalTime;
    },

    /* arrived

    Boolean, returns true if player has arrived.
    */
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

    /* wandering

    Is the player wandering in the same location?
    */
    wandering: function () {
        return Meteor.user().travel.locTo === Meteor.user().location;
    },

    /* onPath

    Is the player on a path?
    When the player is on a path, travel time is lower,
    and the chance of encountering wildlife is lower, but
    the chance of finding materials is also lower.
    */
    onPath: function () {
        return Meteor.user().travel.onPath;
    },

    /* lookingFor

    Returns a list of the material types the player
    is looking for while travelling.
    */
    lookingFor: function () {
        var look = _.map(Meteor.user().travel.look, function (el, key) {
            return { looking: el, id: key};
        });
        look = _.filter(look, function (el) { return el.looking; });
        return look;
    },

    /* started

    Has travel started?
    */
    started: function () {
        return started.get();
    }

});

Template.travelNav.events({

    /* Start travel

    !!! Should not be necessary, but it refuses
    to start on its own.
    */
    "click .start": function () {
        startTravelTick();
    },

    /* Complete

    Manually complete the travel.
    */
    "click .complete": function () {
        var travel = Meteor.user().travel;
        Meteor.call("TravelComplete");

        Meteor.clearInterval(countdownInterval);
        started.set(false);
        Status.set(Locations.getStatus());
    },

    /* Cancel travel

    Cancel the travel, and return to navigation screen.
    */
    "click .cancel": function () {
        Meteor.call("TravelCancel")
        Meteor.clearInterval(countdownInterval);
        started.set(false);
        Status.set(Locations.getStatus());
    },

});

Template.travel.helpers({

    /* discovered

    Updates when an item of a specified type
    has been discovered while travelling, and returns
    the labelified name of the item. The item will appear
    as a button, that triggers the [discover] event.
    */
    discovered: function (type) {
        countdownDep.depend();
        var discovered = Session.get("discovered"+type);
        if (discovered == undefined) return;
        return labelify(discovered);
    },

    /* discoveredId

    Same as the "discovered" helper, but returns the
    itemId.
    */
    discoveredId: function (type) {
        countdownDep.depend();
        var discovered = Session.get("discovered"+type);
        if (discovered == undefined) return;
        return discovered;
    }
});

Template.travel.events({

    /* discover event

    Triggers when clicking on a discovered item.

    [IMPROVE]
    Adds the discovered item to storage, but should not call
    storage diectly.
    */
    "click [discover]": function (e) {
        var itemid = e.currentTarget.getAttribute("discover"),
            type = e.currentTarget.getAttribute("discover-type");
        console.log("Adding", itemid)
        console.log("discovered"+type)
        Session.set("discovered"+type, undefined);
        Meteor.call("StorageAdd", { id: itemid, qty: 1 });
    }
})