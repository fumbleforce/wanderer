Template.ui.onCreated(function () {
    Session.set("uiOverlay", "");
    Session.set("uiActions", "camping");
    Session.set("uiMain", "camping");
});

Template.ui.onDestroyed(function () {

});

Template.ui.onRendered(function () {

});

Template.ui.helpers({
    actions: () => {
        return Session.get("uiActions") + "Nav";
    },
    
    overlay: () => {
        return Session.get("uiOverlay");
    },
    
    overlayOn: () => {
        return Session.get("uiOverlay") === "" ? "": "active";
    },
    
    main: () => {
        return Session.get("uiMain");
    },
    
});
