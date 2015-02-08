
User = {};

User.update = function (opts) {
    Meteor.users.update({ _id: Meteor.userId() }, opts);
};

User.exists = function () {
    return Meteor.user() != undefined && Meteor.user() != null  && Meteor.user().name != undefined;
};


defaultUser = {
    location: "0|0",

    coins: 10,

    activity: {},

    health: 100,
    sanity: 100,
    endurance: 100,

    hunger: 0,
    thirst: 0,

    effects: [],

    physicalSkills: {
        toughness: 0,
        endurance: 0,
        strength: 0,
        quickness: 0,
    },

    mentalSkills: {
        acumen: 0,
        wit: 0,
        wisdom: 0,
        calmness: 0,
        rationality: 0,
        spirituality: 0,
        perception: 0,
        guile: 0,
    },

    weaponSkills: {
        unarmed: 0,
        oneHandedSword: 0,
        oneHandedAxe: 0,
        oneHandedMace: 0,
        twoHandedSword: 0,
        twoHandedAxe: 0,
        twoHandedMace: 0,
        bow: 0,
        crossbow: 0,
        daggers: 0,
        polearm: 0,
        fist: 0,
        staff: 0,
    },

    spellSkills: {
        fire: 0,
        ice: 0,
        earth: 0,
        illusion: 0,

    },

    physicalSpells: [
        "kick", "punch"
    ],


    magicalSpells: [

    ],

    craftingSkills: {
        mason: 0,
        weaponSmith: 0,
        armorSmith: 0,

    },

    armor: {},
    weapons: {},

    books: {
        read: []
    },

    storage: [],

};