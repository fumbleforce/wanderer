Session.set("characterToggled", false);
Session.set("inventoryToggled", false);
Session.set("peopleToggled", false);
Session.set("questLogToggled", false);
Session.set("equipmentToggled", false);




Template.menu.events({
    "click [toggle]": function (e) {
        var toggle = e.currentTarget.getAttribute("toggle");

        Session.set(toggle+"Toggled", !Session.get(toggle+"Toggled"));
    },

    "click .logout": function (e) {
        Meteor.logout();
    }
});