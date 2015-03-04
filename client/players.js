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
    },

    canInvite: function () {
        if (!Session.get("playerSelected")) return false;
        if (PartyInvitationCollection.find({ player: Session.get("playerSelected") }).count() > 0) return false;
        if (PartyCollection.findOne({ members: Session.get("playerSelected") })) return false;
        return true;
    },
});

Template.players.events({
    "click .player": function (e) {
        var playerId = e.currentTarget.getAttribute("playerid");
        if (playerId != Meteor.user().name) {
            Session.set("playerSelected", playerId);
        }
    },

    "click [action]": function (e) {
        var action = e.currentTarget.getAttribute("action");

        switch (action) {
            case "cancel": Session.set("playerSelected", false); break;
            case "invite":
                Meteor.call("PartyInvite", {
                    status: Session.get("userStatus"),
                    player: Session.get("playerSelected")
                });
                break;
            case "trade":
                Meteor.call("TradePlayer", Session.get("playerSelected"));
                break;
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

    "click .leave": function () {
        Meteor.call("PartyLeave");
    }
})