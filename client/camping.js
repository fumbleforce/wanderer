
Session.set("campStatus", false);

Template.campingNav.helpers({
    campingAction: function () { return Session.get("campingAction"); },
    fireActive: function () { return Session.get("fireActive"); },
    location: function () {
        var loc = Meteor.user().location.split("|");
        if (loc.length === 1) {
            return "Somewhere in " + Util.labelify(loc[0]);
        } else if (loc.length === 2) {
            return Util.labelify(loc[1]) + " in " + Util.labelify(loc[0]);
        }
    },
});

Template.campingNav.events({
    "click .action": function (e, t) {
        var action = e.currentTarget.getAttribute("action");
        Session.set("campingAction", action);

        switch (action) {
            case "dirt":
                Meteor.call("StorageAdd", { id: "dirt", qty: 1 });
                break;
            case "break":
                Status.set("navigation");
                break;
            case "fire":
                Session.set("fireActive", true);
                break;
            case "cook":
                Session.set("campStatus", "cooking")
                break;
        }
    }
});

Template.camping.helpers({
    fireActive: function () { return Session.get("fireActive"); },
    campStatus: function () { return Session.get("campStatus"); },
});
