

Template.menu.events({
    "click [toggle]": function (e) {
        var toggle = e.currentTarget.getAttribute("toggle");
        console.log("Setting overlay to", toggle);
        
        if (Session.get("uiOverlay") === toggle) {
            Session.set("uiOverlay", "");
        } else {
            Session.set("uiOverlay", toggle);
        }
    },

    "click .logout": function (e) {
        Meteor.logout();
    }
});