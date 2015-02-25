

Template.players.helpers({
    players: function () {
        return Meteor.users.find({ location: Meteor.user().location });
    }
});