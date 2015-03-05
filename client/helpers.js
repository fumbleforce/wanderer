Template.registerHelper("loggingIn", function () { return Meteor.loggingIn() });
Template.registerHelper("userStatus", function () { return Session.get("userStatus"); });
Template.registerHelper("camping", function () { return Session.get("userStatus") == "camping"; });
Template.registerHelper("walking", function () { return Session.get("userStatus") == "walking"; });
Template.registerHelper("town", function () { return Session.get("userStatus") == "town"; });
Template.registerHelper("inCombat", function () { return Session.get("userStatus") == "combat"; });

Template.registerHelper('userStatus',function(s) {
    var party = PartyCollection.findOne({ members: Meteor.user().name });
    if (party == null) return Session.get("userStatus") === s;
    return party.status === s;
});

Template.registerHelper('toArray',function(obj) {
    result = [];
    for (var k in obj) result.push({key:k, value:obj[k]});
    return result;
});

Template.registerHelper('addIndex', function (all) {
    return _.map(all, function(val, index) {
        val.index = index;
        return val;
    });
});

Template.registerHelper("diff", function (ctx) {
    return ctx["arg1"] - ctx["arg2"];
});

Template.registerHelper("floor", function (num) {
    return Math.floor(num);
});

Template.registerHelper("percent", function (ctx) {
    return Math.floor(100* ctx.hash["arg1"] / ctx.hash["arg2"]);
});

Template.registerHelper("equals", function (ctx) {
    console.log(ctx)
    return ctx.hash["arg1"] === ctx.hash["arg2"];
});

Template.registerHelper("labelify", labelify);

Template.registerHelper("itemLink", function (id) {
    return Item.get(id).el;
});

Template.registerHelper("spellLink", function (id) {
    return Spell.get(id).el;
});

Template.registerHelper("skillLink", function (id) {
    return "<span class='skillLink'>"+labelify(id)+"</span>";
});

Template.registerHelper('session',function(input) {
    return Session.get(input);
});

Template.registerHelper("canAct", function () {
    var party = PartyCollection.findOne({ members: Meteor.user().name });
    if (party == null) return true;
    return party.leader === Meteor.user().name;
});