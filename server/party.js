

Meteor.methods({
    PartyInvite: function (playerName) {
        var partyId;
        var party = PartyCollection.findOne({ leader: Meteor.user().name });

        if (playerName === Meteor.user().name) {
            return new Meteor.Error("Cannot invite yourself");
        }

        if (party == null) {
            partyId = PartyCollection.insert({
                leader: Meteor.user().name,
                members: [Meteor.user().name]
            });
        } else {
            partyId = party._id;
        }

        PartyInvitationCollection.insert({
            player: playerName,
            party: partyId,
            inviter: Meteor.user().name,
        });
    },

    PartyAccept: function (inviteId) {
        var invite = PartyInvitationCollection.findOne(inviteId);

        if (Meteor.user().name != invite.player) {
            return new Meteor.Error("This is not your invitation")
        }

        PartyCollection.update(invite.party, {
            $push: { members: Meteor.user().name }
        });

        PartyInvitationCollection.remove(inviteId);
    },

    PartyReject: function (inviteId) {
        var invite = PartyInvitationCollection.findOne(inviteId);

        if (Meteor.user().name != invite.player) {
            return new Meteor.Error("This is not your invitation")
        }

        PartyInvitationCollection.remove(inviteId);
    },

    PartyLeave: function () {
        var name = Meteor.user().name,
            party = PartyCollection.findOne({
                members: name
            });

        if (party == null) {
            return new Meteor.Error("You are not in a party");
        }

        if (party.leader === name) {
            PartyCollection.remove(party._id);
        } else {
            PartyCollection.update({
                $pull: { members: name }
            });
        }
    }
});