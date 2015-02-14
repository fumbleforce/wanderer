
Template.uiCamping.helpers({
    campingAction: function () { return Session.get("campingAction"); },
    fireActive: function () { return Session.get("fireActive"); }
});

Template.uiCamping.events({
    "click .action": function (e, t) {
        var action = e.currentTarget.getAttribute("action");
        Session.set("campingAction", action);

        if (action === "dirt") {
            Meteor.call("StorageAdd", { id: "dirt", qty: 1 });
        } else if (action === "break") {
            Session.set("userStatus", "walking");
        } else if (action === "eat") {
            Meteor.call("CharacterEat");
        } else if (action === "drink") {
            Meteor.call("CharacterDrink");
        } else if (action === "read") {
            Meteor.call("CharacterRead");
        } else if (action === "fire") {
            Session.set("fireActive", true);
            Meteor.call("CampLightFire");
        } else if (action === "cook") {
            Session.set("userStatus", "cooking");
            Cooking.start();
        }
    }
});