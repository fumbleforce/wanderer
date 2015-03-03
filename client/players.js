Session.set("playerSelected", false);

Template.players.helpers({
    players: function () {
        return Meteor.users.find({
            location: Meteor.user().location,
            "_id": { $ne: Meteor.userId() }
        });
    },

    selectedPlayer: function () {
        return Session.get("playerSelected");
    },

    invitations: function () {
        return PartyInvitationCollection.find({ player: Meteor.user().name });
    },

    party: function () {
        return PartyCollection.findOne({
            members: Meteor.user().name
        });
    },

    isLeader: function (name) {
        return PartyCollection.findOne({
            members: Meteor.user().name
        }).leader === name;
    }
});

Template.players.events({
    "click .player": function (e) {
        var playerId = e.currentTarget.getAttribute("playerid");

        Session.set("playerSelected", playerId);
    },

    "click [action]": function (e) {
        var action = e.currentTarget.getAttribute("action");

        switch (action) {
            case "cancel": Session.set("playerSelected", false); break;
            case "invite": Meteor.call("PartyInvite", Session.get("playerSelected")); break;
            case "cancel": Session.set("playerSelected", false); break;
            case "cancel": Session.set("playerSelected", false); break;
        }
    },

    "click .accept": function (e) {
        var inviteid = e.currentTarget.getAttribute("inviteid");

        Meteor.call("PartyAccept", inviteid);
    },

    "click .reject": function (e) {
        var inviteid = e.currentTarget.getAttribute("inviteid");

        Meteor.call("PartyReject", inviteid);
    },
})