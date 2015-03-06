Item = {};

/*
Item quality:

0 - gray - Junk
1 - white - Material
2 - blue - Consumable
3 - lightbrown - Weak
4 - yellow - Sturdy
5 - red - Terrific
6 - purple - Exemplary
*/

Item.quality = [
    "junk",
    "material",
    "consumable",
    "weak",
    "sturdy",
    "terrific",
    "exemplary"
]

Item.items = [
    // Raw metals used for producing things
    {
        id: "coin",
        category: "coin",
        desc: "Used for purchasing items and services",
        quality: 3,
    },

    {
        id: "questItem",
        category: "questItem",
        desc: "Item used for quest",
        quality: 3,
    },


    {
        id: "dirt",
        category: "trash",
        type:"metal",
        name: "Dirt",
        desc: "A handful of dirt.",
        quality: 0,
    },
    {
        id: "steel",
        category: "material",
        type:"metal",
        key: 1,
        name: "Steel",
        quality: 1,
        props: {
            weight: 1.0
        }
    },
    {
        id: "iron",
        category: "material",
        type:"metal",
        key: 7,
        name: "Iron",
        quality: 1,
        props: {
            weight: 1.0
        }
    },

    // Raw materials made from wood. Used in construction
    {
        id: "plank",
        category: "material",
        type:"wood",
        key: 2,
        name: "Plank",
        desc: "It is a plank! :O",
        quality: 1,
        props: {
            weight: 1.0
        }
    },
    {
        id: "log",
        category: "material",
        type:"wood",
        key: 2,
        name: "Logs",
        quality: 1,
        props: {
            weight: 1.0
        }
    },

    {
        id: "fish",
        category: "food",
        quality: 1,
        name: "Barrel of fish",

    },

    {
        id: "meat",
        category: "food",
        quality: 1,
        name: "Piece of meat",
    },

    {
        id: "bone",
        category: "trash",
        quality: 0,
        name: "Bone",
    },

    {
        id: "stone",
        category: "material",
        quality: 1,
        name: "Stack of stones"
    },

    {
        id: "grain",
        category:"food",
        quality: 1,
        name: "Bundle of grains"
    },


    {
        id: "torch",
        name: "Rope",
        category:"utility",
        quality: 3,
        desc: "A bright torch to light up the dark places of the world"
    },

    {
        id: "rope",
        name: "Rope",
        category:"utility",
        quality: 3,
        desc: "Handy rope for climbing up and down things, or maybe to capture a boar."
    },

    {
        id: "oil",
        name: "Oil",
        category:"utility",
        quality: 3,
        desc: "oil for lamps, or lubrication of gears and equipment."
    },

    {
        id: "flint",
        name: "Flint",
        category:"utility",
        quality: 3,
        desc: "Used for lighting a fire."
    },

    {
        id: "nails",
        name: "Nails",
        category:"utility",
        quality: 3,
        desc: "Used to construct wooden objects."
    },

    {
        id: "hardBread",
        name: "Hard Bread",
        category:"food",
        quality: 3,
        desc: "Long lasting food."
    },

    {
        id: "wateredWine",
        name: "Watered wine",
        category:"utility",
        quality: 3,
        desc: "Wine watered down."
    },


    // Weapons
    {
        id: "rustyIronDagger",
        weaponType: "dagger",
        category: "hand",
        quality: 2,
        desc: "A worn, old dagger"
    },
    {
        id: "ironShortsword",
        name: "Iron Shortsword",
        weaponType: "sword",
        category:"rightHand",
        quality: 3,
        desc: ""
    },

    {
        id: "ironTwoHandAxe",
        name: "Iron Two-hand Axe",
        weaponType: "2haxe",
        category:"rightHand",
        quality: 3,
        desc: ""
    },

    {
        id: "ironHammer",
        name: "Iron Hammer",
        weaponType: "mace",
        category:"rightHand",
        quality: 3,
        desc: "Used for crafting various items"
    },

    {
        id: "pewterMug",
        name: "Pewter Mug",
        category:"utility",
        quality: 3,
        desc: "A simple mug for drinking"
    },

    {
        id: "tinKettle",
        name: "Tin Kettle",
        category:"utility",
        quality: 3,
        desc: "A kettle for heating water"
    },

    {
        id: "ironPot",
        name: "Iron Pot",
        category:"utility",
        quality: 3,
        desc: "Pot for preparing food"
    },

    {
        id: "leatherArmor",
        category: "body",
        quality: 3,
        desc: "A basic set of leather armor that offers some protection from thorn bushes and paper cuts.",
        props: {
            defence: 20,
        }
    },


    {
        id: "crudeClub",
        weaponType: "mace",
        category:"rightHand",
        quality: 3,
    },

    {
        id: "heavyClub",
        weaponType: "mace",
        category:"rightHand",
        quality: 4,
    },

    {
        id: "greatClub",
        weaponType: "mace",
        category:"rightHand",
        quality: 5,
    },

    {
        id: "boneBreaker",
        weaponType: "2hmace",
        category:"rightHand",
        quality: 6,
        props: {

        }
    },


    //Books
    {
        id: "bookWaves",
        category:"book",
        quality: 6,
        name: "Waves of fortune",
        props: {

        },
        readingTime: 10,
        skill: "guile",
        skillIncrease: 3,
    },

    {
        id: "spell:windPush",
        category:"book",
        quality: 6,
        name: "Spell: Wind Push",
        props: {

        },
        readingTime: 10,
        spell: "windPush",
    },
    {
        id: "spell:stab",
        category:"book",
        quality: 6,
        name: "Spell: Stab",
        props: {

        },
        readingTime: 10,
        spell: "stab",
    },
];

Item.items = _.map(Item.items, function (i) {
    var name = i.name;
    if (name == undefined) name = labelify(i.id);
    i.el = "<span class='itemlink "+Item.quality[i.quality]+"' title='"+i.desc+"' data-toggle='tooltip'>"+name+"</span>";
    return i;
});


Item.itemDict = {};
Item.itemHierarchy = [];
Item.byQuality = [[], [], [], [], [], [], []];

_.each(Item.items, function (i, index) {
    Item.itemDict[i.id] = index;
    Item.byQuality[i.quality].push(i);
});

Item.byCategory = {};
_.each(Item.items, function (i, index) {
    if (!(i.category in Item.byCategory)) Item.byCategory[i.category] = []
    Item.byCategory[i.category].push(i);
});



Item.sortedItems = _.sortBy(Item.items, function(item) {
    return item.key;
});

Item.get = function (id) {
    if (id === "none" || !id) {
        return {
            id: "none",
            el: "nothing"
        }
    }
    
    if (!(id in Item.itemDict)) return;

    var i = Item.items[Item.itemDict[id]];
    return i;
};


Item.rand = function (quality) {
    return Item.byQuality[quality][Math.floor(Math.random()*(Item.byQuality[quality].length-1))];
};

Item.resolveLoot = function (loots) {
    var resolved = [];

    for (var i = 0; i < loots.length; i++) {
        if (Math.random() < loots[i].chance) {
            resolved.push({ id: loots[i].item, qty: 1 });
        }
    }

    return resolved;
};