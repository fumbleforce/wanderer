
PartyCollection = new Meteor.Collection("party");
PartyInvitationCollection = new Meteor.Collection("partyInvitation");

User = {};

User.update = function (opts) {
    Meteor.users.update({ _id: Meteor.userId() }, opts);
};

User.exists = function () {
    return Meteor.user() != undefined && Meteor.user() != null  && Meteor.user().name != undefined;
};

function zeroSkills (skills) {
    return _.object(_.map(skills, function (s) { return [s, 0]; }))
}


defaultUser = {
    location: "theMeadows",

    coins: 10,

    activity: {},

    health: 100,
    maxHealth: 100,

    sanity: 100,
    maxSanity: 100,

    endurance: 100,
    maxEndurance: 100,

    hunger: 0,
    thirst: 0,

    effects: [],

    physicalSkills: zeroSkills(Skill.physicalSkills),

    mentalSkills: zeroSkills(Skill.mentalSkills),

    weaponSkills: zeroSkills(Skill.weaponSkills),

    spellSkills: zeroSkills(Skill.spellSkills),

    craftingSkills: zeroSkills(Skill.craftingSkills),

    spells: [
        "kick", "punch"
    ],

    equipment: {},

    armor: {},
    weapons: {},

    books: {
        read: []
    },

    storage: [],

    quests: {},

    discovered: {},

    travel: {},

};