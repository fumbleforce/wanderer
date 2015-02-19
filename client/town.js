Template.city.helpers({
    city: function () {
        return Locations.cities[Meteor.user().location];
    }
});

Template.city.events({
    "click .action": function (e, t) {
        var action = e.currentTarget.getAttribute("action");

        if (action === "leave") {
            Session.set("userStatus", "walking");
        }
    }
});



Template.village.helpers({
    village: function () {
        return Locations.villages[Meteor.user().location];
    }
});

Template.village.events({
    "click .action": function (e, t) {
        var action = e.currentTarget.getAttribute("action");

        if (action === "leave") {
            Session.set("userStatus", "walking");
        }
    }
});