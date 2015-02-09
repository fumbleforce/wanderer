

Meteor.methods({
    CampLightFire: function () {
        User.update({ $inc: { "craftingSkills.firemaking": 1 } });
    }
})