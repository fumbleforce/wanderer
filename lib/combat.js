
/*
    The battle collection keeps track of active battles, and are removed when the
    battle is over.

    Can consider archiving these later, if needed.
*/
BattleCollection = new Meteor.Collection('battle');

// Common battle functions.
Battle = {};


Battle.getActive = function () {
    return BattleCollection.findOne({
        party: { $elemMatch: { _id: Meteor.userId() } },
        left: false,
    });
};

Battle.me = function () {
    var el = _.find(Battle.getActive().party, function (el) { return el._id === Meteor.userId(); });
    console.log("Battle.me", el)
    return el
}

