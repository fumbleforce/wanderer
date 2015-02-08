if (Meteor.isClient) {

Template.registerHelper("loggingIn", function () { return Meteor.loggingIn() });
Template.registerHelper("userStatus", function () { return Session.get("userStatus"); });
Template.registerHelper("camping", function () { return Session.get("userStatus") == "camping"; });
Template.registerHelper("walking", function () { return Session.get("userStatus") == "walking"; });
Template.registerHelper("town", function () { return Session.get("userStatus") == "town"; });
Template.registerHelper("inCombat", function () { return Session.get("userStatus") == "combat"; });

UI.registerHelper('toArray',function(obj) {
    result = [];
    for (var k in obj) result.push({key:k, value:obj[k]});
    return result;
});

UI.registerHelper('addIndex', function (all) {
    return _.map(all, function(val, index) {
        val.index = index;
        return val;
    });
});

Template.registerHelper("diff", function (ctx) {
    return ctx["arg1"] - ctx["arg2"];
});

UI.registerHelper("percent", function (ctx) {
    return 100* ctx.hash["arg1"] / ctx.hash["arg2"];
});

UI.registerHelper("equals", function (ctx) {
    console.log(ctx)
    return ctx.hash["arg1"] === ctx.hash["arg2"];
});

UI.registerHelper("labelify", function (str) {
    var parts = str.replace(/([a-z])([A-Z])/g, '$1 $2')
    return parts[0].toUpperCase() + parts.slice(1);
});


UI.registerHelper("itemLink", function (id) {
    return Item.get(id).el;
});

UI.registerHelper('session',function(input) {
    return Session.get(input);
});

}