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
        physicalSkills:1,
        mentalSkills:1,
        spells:1,
        craftingSkills:1,
        armor:1,
        weapons:1,
        storage: 1,
        books: 1,
        activity: 1,
    }});
});

Meteor.methods({
    UserCreate: function (opts) {
        Meteor.user.insert(opts);
    }
})