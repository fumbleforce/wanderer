if (Meteor.isClient) {

Template.registerHelper("loggingIn", function () { return Meteor.loggingIn() });
Template.registerHelper("userStatus", function () { return Session.get("userStatus"); });
Template.registerHelper("camping", function () { return Session.get("userStatus") == "camping"; });
Template.registerHelper("walking", function () { return Session.get("userStatus") == "walking"; });
Template.registerHelper("town", function () { return Session.get("userStatus") == "town"; });
Template.registerHelper("inCombat", function () { return Session.get("userStatus") == "combat"; });

Handlebars.registerHelper('toArray',function(obj) {
    result = [];
    for (var k in obj) result.push({key:k, value:obj[k]});
    return result;
});





}