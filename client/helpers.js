Template.registerHelper("loggingIn", function () { return Meteor.loggingIn() });
Template.registerHelper("userStatus", function () { return Session.get("userStatus"); });
Template.registerHelper("camping", function () { return Session.get("userStatus") == "camping"; });
Template.registerHelper("navigation", function () { return Session.get("userStatus") == "navigation"; });
Template.registerHelper("town", function () { return Session.get("userStatus") == "town"; });
Template.registerHelper("inCombat", function () { return Session.get("userStatus") == "combat"; });

Template.registerHelper('userStatus',function(s) {
    var party = Party.get();
    if (party == null) return Session.get("userStatus") === s;
    console.log("Party status", party.status)
    return party.status === s;
});

Template.registerHelper('bgClasses', function () {
    return "bg-" + Session.get("userStatus");
});

Template.registerHelper("canAct", function () {
    var party = Party.get();
    if (party == null) return true;
    return party.leader === Meteor.user().name;
});