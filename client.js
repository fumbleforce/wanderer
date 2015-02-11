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

Template.user.events({
    "click #log-in": function (e, t) {
        var email = t.find('#email').value,
            password = t.find('#password').value;

        Meteor.loginWithPassword(email, password);
    },

    "click #create-user": function (e, t) {
        var email = t.find('#new-email').value,
            password = t.find('#new-password').value,
            character = t.find('#new-character').value;

        var def = _.extend({}, defaultUser);
        var usr = _.extend(def, {
            name: character,
        });
        console.log(usr)
        Accounts.createUser({
            email: email,
            password: password,
            createdDate: new Date()
        });
        User.update({ $set: usr });
    },
});

Template.uiCamping.helpers({
    campingAction: function () { return Session.get("campingAction"); },
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

        }
    }
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