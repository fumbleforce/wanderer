
Meteor.startup(function () {

    // Validate users
    Meteor.users.find().forEach(function (user) {
        var changed = false;
        for (var x in defaultUser) {
            if (!(x in user)) {
                user[x] = defaultUser[x];
                changed = true;
            }
        }

        if (changed) {
            Meteor.users.update(user._id, user);
        }
    })
})