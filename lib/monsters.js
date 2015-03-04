


Monster = {},

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
            { item: "meat", chance: 0.8 },
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
            { item: "meat", chance: 0.3 },
        ],
        physicalSkills: {
            quickness: 0
        }
    },











};


Monster.find = function (opts) {
    var filtered = _.filter(Monster.monsters, function (el) { return el.danger == opts.danger; });
    filtered = _.filter(Monster.monsters, function (el) { return el.habitat.indexOf(opts.habitat) != -1; });
    return filtered;
};