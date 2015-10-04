

Meteor.methods({
    PartyStatus: function (status) {
        var party = PartyCollection.findOne({ leader: Meteor.user().name });

        if (party == null) {
            console.log("Not in a party")
            throw new Meteor.Error("Not in a party");
        }
        console.log("Party status to", status)
        PartyCollection.update(party._id, {
            $set: { status: status }
        })
    },

    PartyInvite: function (opts) {
        var partyId;
        var status = opts.status,
            playerName = opts.player;
        var party = PartyCollection.findOne({ leader: Meteor.user().name });

        if (playerName === Meteor.user().name) {
            return new Meteor.Error("Cannot invite yourself");
        }

        if (party == null) {
            partyId = PartyCollection.insert({
                leader: Meteor.user().name,
                members: [Meteor.user().name],
                status: status
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
            throw new Meteor.Error("This is not your invitation")
        }

        var leaderName = PartyCollection.findOne(invite.party).leader,
            leader = Meteor.users.findOne({ name: leaderName });

        if (Meteor.user().location != leader.location) {
            PartyInvitationCollection.remove(inviteId);
            throw new Meteor.Error("Must be in the same location as the leader");
        }

        PartyCollection.update(invite.party, {
            $push: { members: Meteor.user().name }
        });

        PartyInvitationCollection.remove(inviteId);
    },

    PartyReject: function (inviteId) {
        var invite = PartyInvitationCollection.findOne(inviteId);

        if (Meteor.user().name != invite.player) {
            throw new Meteor.Error("This is not your invitation")
        }

        PartyInvitationCollection.remove(inviteId);
    },

    PartyLeave: function () {
        var name = Meteor.user().name,
            party = PartyCollection.findOne({
                members: name
            });

        if (party == null) {
            throw new Meteor.Error("You are not in a party");
        }

        if (party.leader === name) {
            PartyCollection.remove(party._id);
        } else {
            PartyCollection.update(party._id, {
                $pull: { members: name }
            });
        }
    }
});