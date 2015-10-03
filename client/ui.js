Template.ui.onCreated(function () {
    Session.set("uiOverlay", "camping");
    Session.set("uiActions", "camping");
    Session.set("uiMain", "camping");
});

Template.ui.onDestroyed(function () {

});

Template.ui.onRendered(function () {

});

Template.ui.helpers({
    actions: () => {
        return Session.get("uiActions");
    },
    overlay: () => {
        return Session.get("uiOverlay");
    },
    main: () => {
        return Session.get("uiMain");
    },
    
});

Template.ui.events({
    "click [attr]": function (e) {
        var attr = e.currentTarget.getAttribute("attr");

    },
});
