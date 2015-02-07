


Meteor.startup(function () {
    Session.set("userStatus", "camping");

    if (BattleCollection.find({ party: { $elemMatch: { _id: Meteor.userId() }}}).count()) {
        Session.set("userStatus", "combat");
    }
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

        var def = _.extend({}, defaultUser);
        var usr = _.extend(def, {
            email: email,
            password: password,
            name: character,
            createdDate: new Date()
        });
        console.log(usr)
        Accounts.createUser(usr);
    },
});

