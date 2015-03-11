Party = {};

Party.get = function (selector) {
    if (selector) {
        return PartyCollection.findOne(selector);
    }
    return PartyCollection.findOne({ player: Meteor.user().name });
};

