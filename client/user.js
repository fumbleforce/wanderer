
var ran = false;

Meteor.autorun(function () {

    if (Meteor.user() == undefined || ran) return;
    ran = true;

    console.log("travelactive", Meteor.user().travel.active)
    if (Meteor.user().travel.active) {
        Session.set("userStatus", "travelling");
    } else if (Meteor.user().location.split("|").length > 1) {
        Session.set("userStatus", "town");
    } else {
        Session.set("userStatus", "camping");
    }

    Meteor.autosubscribe(function() {
        PartyCollection.find({ members: Meteor.user().name }).observeChanges({
            changed: function(id, fields){
                console.log("Party Changed", fields)
                if ("status" in fields) {
                    Session.set("userStatus", fields["status"]);
                }
            },
        });
    });

    if (BattleCollection.find({ party: { $elemMatch: { _id: Meteor.userId() }}}).count()) {
        Session.set("userStatus", "combat");
    }
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


        Accounts.createUser({
            email: email,
            password: password,
            name: character
        });
    },
});