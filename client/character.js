
Template.uiCharacter.helpers({
    weaponSkills: function () {
        return _.map(Meteor.user().weaponSkills, function (val, key) {
            return { label: key, value: val };
        });
    },
    spellSkills: function () {
        return _.map(Meteor.user().spellSkills, function (val, key) {
            return { label: key, value: val };
        });
    },
    craftingSkills: function () {
        return _.map(Meteor.user().craftingSkills, function (val, key) {
            return { label: key, value: val };
        });
    },
    physicalSkills: function () {
        return _.map(Meteor.user().physicalSkills, function (val, key) {
            return { label: key, value: val };
        });
    },
    mentalSkills: function () {
        return _.map(Meteor.user().mentalSkills, function (val, key) {
            return { label: key, value: val };
        });
    },
    totalSkills: function () {
        return  _.reduce(Meteor.user().weaponSkills, function (a, b) { return a + b; }, 0) +
                _.reduce(Meteor.user().spellSkills, function (a, b) { return a + b; }, 0) +
                _.reduce(Meteor.user().craftingSkills, function (a, b) { return a + b; }, 0) +
                _.reduce(Meteor.user().physicalSkills, function (a, b) { return a + b; }, 0) +
                _.reduce(Meteor.user().mentalSkills, function (a, b) { return a + b; }, 0);
    }
});

