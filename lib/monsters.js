


Monster = typeof Monster !== 'undefined' ? Monster : {},

Monster.monsters = {

    boar: {
        name: "Boar",
        health: 10,
        maxHealth: 10,
        danger: 0,
        habitat: ["grasslands"],
        spells: [
            "charge",
        ],
        loot: [
            { item: "bone", chance: 0.3 },
        ],
        physicalSkills: {
            quickness: 0
        }
    },

    thug: {
        name: "Thug",
        health: 10,
        maxHealth: 10,
        danger: 0,
        habitat: ["city"],
        spells: [
            "punch", "kick"
        ],
        loot: [
            { item: "torch", chance: 0.8 },
            { item: "rope", chance: 0.3 },
            { item: "nails", chance: 0.3 },
        ],
        physicalSkills: {
            quickness: 0
        }
    },

    rat: {
        name: "Rat",
        health: 10,
        maxHealth: 10,
        danger: 0,
        habitat: ["village"],
        spells: [
            "bite",
        ],
        loot: [
            { item: "bone", chance: 0.8 },
        ],
        physicalSkills: {
            quickness: 0
        }
    },


    bandit: {
        name: "Bandit",
        health: 100,
        maxHealth: 100,
        danger: 3,
        habitat: ["marches"],
        spells: [
            "punch", "kick"
        ],
        loot: [
            { item: "torch", chance: 0.8 },
            { item: "rope", chance: 0.3 },
            { item: "nails", chance: 0.3 },
        ],
        physicalSkills: {
            quickness: 0,
            strength: 15,
        }
    },

    swampTroll: {
        name: "Swamp Troll",
        health: 200,
        maxHealth: 200,
        danger: 3,
        habitat: ["marches"],
        spells: [
            "punch", "kick"
        ],
        loot: [
            { item: "torch", chance: 0.8 },
            { item: "rope", chance: 0.3 },
            { item: "nails", chance: 0.3 },
        ],
        physicalSkills: {
            quickness: 0,
            strength: 20,
        }
    },

    wolf: {
        name: "Wolf",
        health: 30,
        maxHealth: 30,
        danger: 1,
        habitat: ["lightForest"],
        spells: [
            "bite"
        ],
        loot: [
            { item: "torch", chance: 0.8 },
            { item: "rope", chance: 0.3 },
            { item: "nails", chance: 0.3 },
        ],
        physicalSkills: {
            quickness: 0,
            strength: 5,
        }
    },

    troll: {
        health: 300,
        maxHealth: 300,
        danger: 1,
        habitat: ["dungeon"],
        spells: [
            "punch"
        ],
        loot: [
            { item: "torch", chance: 0.8 },
            { item: "rope", chance: 0.3 },
        ],
        physicalSkills: {
            quickness: 5,
            strength: 10,
        }
    },


};


Monster.find = function (opts) {
    var filtered = _.filter(Monster.monsters, function (el) { return el.danger == opts.danger; });
    filtered = _.filter(Monster.monsters, function (el) { return el.habitat.indexOf(opts.habitat) != -1; });
    return filtered;
};

Monster.get = function (id) {
    var m = Monster.monsters[id];
    m.id = id;
    return m;
};