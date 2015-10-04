Meteor.methods({
    LocationsDiscover: function (loc) {
        var set = {};
        set["discovered."+loc] = true;
        User.update({
            $set: set
        });
    }
});