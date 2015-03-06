
Meteor.startup(function () {

    // Validate user fields
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
    });

    
})

Meteor.methods({
    CharacterEat: function () {
        if (Meteor.user().health.hunger > 0) {
            User.update({ $inc: { "health.hunger": -1 } });
        }
    },

    CharacterDrink: function () {
        if (Meteor.user().health.thirst > 0) {
            User.update({ $inc: { "health.thirst": -1 } });
        }
    },

});


Accounts.onCreateUser(function(options, user) {
    var usr = _.extend(user, defaultUser);
    usr.name = options.name;
    return usr;
});