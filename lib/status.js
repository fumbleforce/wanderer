Status = {};

Status.get = function (status) {
    var party = Party.get();

    if (party == null) {
        return Session.get("userStatus");
    } else {
        return party.status;
    }
};

Status.set = function(val) {
    var party = Party.get();

    if (party == null) {
        Session.set("userStatus", val);
    } else {
        Meteor.call("PartyStatus", val);
    }
};