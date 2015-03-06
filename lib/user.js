
PartyCollection = new Meteor.Collection("party");
PartyInvitationCollection = new Meteor.Collection("partyInvitation");

User = {};

User.update = function (opts) {
    Meteor.users.update({ _id: Meteor.userId() }, opts);
};

User.exists = function () {
    return Meteor.user() != undefined && Meteor.user() != null  && Meteor.user().name != undefined;
};


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

    physicalSkills: {
        // Reduces physical damage
        toughness: 0,
        // Increase number of physical spells that can be cast
        endurance: 0,
        // Increases physical damage
        strength: 0,
        // Determines attack order, and number of times in the attack order
        quickness: 0,
        // Resistance to knockback, destabilization, increase block
        poise: 0,
        // Dodging and movement
        flexibility: 0,
    },

    mentalSkills: {
        // Increase trust, ability to make good desicions
        acumen: 0,
        // Allow better jokes
        wit: 0,
        // Increase effect of reading
        wisdom: 0,
        // Resist mind effects
        calmness: 0,
        // Learn science-related skills faster
        rationality: 0,
        // More in tune with the gods
        spirituality: 0,
        // Detect traps
        perception: 0,
        // Better at shady activities
        guile: 0,

        charm: 0,
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
        necromancy: 0,
        emotion: 0,
        transmutation: 0,

    },

    spells: [
        "kick", "punch"
    ],

    craftingSkills: {
        masonry: 0,
        weaponSmith: 0,
        armorSmith: 0,
        fletching: 0,
        farmer: 0,
        cooking: 0,
        firemaking: 0,
    },

    equipment: {},

    armor: {},
    weapons: {},

    books: {
        read: []
    },

    storage: [],

    quests: {},

    discovered: {},
    
};