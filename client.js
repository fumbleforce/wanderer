if (Meteor.isClient) {

Template.registerHelper("userStatus", function () { return Session.get("userStatus"); });
Template.registerHelper("camping", function () { return Session.get("userStatus") == "camping"; });
Template.registerHelper("walking", function () { return Session.get("userStatus") == "walking"; });
Template.registerHelper("town", function () { return Session.get("userStatus") == "town"; });
Template.registerHelper("battle", function () { return Session.get("userStatus") == "battle"; });

Meteor.startup(function () {
    Session.set("userStatus", "camping");

});


Template.user.helpers({

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

        Accounts.createUser(_.extend(defaultUser, {
            email: email,
            password: password,
            name: character,
            createdDate: new Date()
        }));
    },
});

Template.uiCamping.helpers({
    campingAction: function () { return Session.get("campingAction"); },
});

Template.uiCamping.events({
    "click .action": function (e, t) {
        var action = e.currentTarget.getAttribute("action");
        console.log(action)
        if (action === "dirt") {
            Meteor.call("StorageAdd", { id: "dirt", qty: 1 });
        }
        Session.set("campingAction", action);
    }
});

Template.uiCharacter.helpers({
    weaponSkills: function () {
        return _.map(Meteor.user().weaponSkills, function (val, key) {
            return { label: key, value: val };
        });
    },
    spellSkills: function () {
        return _.map(Meteor.user().spellSkills, function (val, key) {
            return { label: key, value: val };
        });
    },
    craftingSkills: function () {
        return _.map(Meteor.user().craftingSkills, function (val, key) {
            return { label: key, value: val };
        });
    },
})








}