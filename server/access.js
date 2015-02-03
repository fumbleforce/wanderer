Meteor.publish(null, function() {
    return Meteor.users.find({}, {fields: {
        createDate: 1,
        name: 1,
        location:1,
        coins: 1,
        health:1,
        effects:1,
        weaponSkills:1,
        spellSkills:1,
        spells:1,
        craftingSkills:1,
        armor:1,
        weapons:1,
        storage: 1,
    }});
});

Meteor.methods({
    UserCreate: function (opts) {
        Meteor.user.insert(opts);
    }
})