Session.set("playerSelected", false);

Template.players.helpers({
    players: function () {
        return Meteor.users.find({ location: Meteor.user().location });
    },

    selectedPlayer: function () {
        return Session.get("playerSelected");
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
        }
    }
})