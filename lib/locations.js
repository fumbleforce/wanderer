Locations = {};

Locations.biomes = [
    "sand",
    "forest",
    "grass",
    "water",
    "mountain",
    "snow",
    "pass",
    "bridge",
    "cave",
    "village",
    "tallmountain",
    "city",
];

Locations.towns = {
    "caldum": {
        name: "Caldum",
        type: "city",
        area: "theMeadows",
        facilities: {
            inn: {
                owner: "Bernard Gallows",
                welcome: [
                    "Howdy there! Great to see a new face in this town. Help yourself to a chair and enjoy your stay in my humble inn.",
                    "Welcome back, friend! Just tell me if there is anything I can provide.",
                ],
                drinks: [
                    { id: "wateredWine", buy: 3 }
                ],
                room: 10,
                rumors: [
                    "I've heard old Erecus Eldor is looking for some able-bodied travellers.",
                    "Don't try to wander off the main roads too much if you can't handle yourself. Lots of shady characters around these days."
                ],

            }
        },
        shops: [
            {
                id: "generalStore",
                owner: "Hort Stallon",
                items: [
                    { id: "oil", buy: 10, sell: 15 },
                    { id: "flint", buy: 10, sell: 15 },
                    { id: "rope", buy: 10, sell: 15 },
                    { id: "nails", buy: 10, sell: 15 },
                    { id: "hardBread", buy: 10, sell: 15 },
                    { id: "wateredWine", buy: 10, sell: 15 },
                ],
            },
            {
                id: "blacksmith",
                owner: "Rock Hardhand",
                items: [
                    { id: "rustyIronDagger", buy: 1, sell: 5 },
                    { id: "ironShortsword", buy: 10, sell: 15 },
                    { id: "ironTwoHandAxe", buy: 10, sell: 15 },
                    { id: "ironHammer", buy: 10, sell: 15 },
                    { id: "leatherArmor", buy: 10, sell: 15 },
                    { id: "pewterMug", buy: 10, sell: 15 },
                    { id: "tinKettle", buy: 10, sell: 15 },
                    { id: "ironPot", buy: 10, sell: 15 },
                ]
            },
            {
                id: "bookShop",
                owner: "Ardus Wolander",
                items: [
                    { id: "spell:windPush", buy: 1, sell: 5 },
                    { id: "spell:stab", buy: 1, sell: 5 },
                ]
            }
        ]
    },
    "wildberry": {
        name: "Wildberry",
        type: "village",
        area: "theMeadows",
        shops: [
            {
                id:"generalStore",
                owner: "galadonGreaves",
            }
        ]
    },
};

Locations.areas = {
    "durranMarches": {
        biome: "marches",
        danger: 3,
    },

    "windfall": {
        biome: "lightForest",
        danger: 1,
    },

    "theMeadows": {
        biome: "grasslands",
        danger: 0,
    }
};

Locations.getArea = function (id) {
    if (id.split("|").length > 1) {
        id = id.split("|")[0];
    }
    return Locations.areas[id];
};

Locations.getAreas = function () {
    return asArray(Locations.areas);
}

Locations.getTown = function (id) {
    console.log("Town:", id);
    if (id.split("|").length > 1) {
        id = id.split("|")[1];
    }
    return Locations.towns[id];
};

Locations.getTowns = function (area, type) {
    if (area.split("|").length > 1) area = area.split("|")[0];

    return _.filter(asArray(Locations.towns), function (t) {
        return t.type === type && t.area === Meteor.user().location.split("|")[0];
    });

};

Locations.discovered = function (loc) {
    return loc in Meteor.user().discovered;
};

Locations.discover = function (loc) {
    if (!Locations.discovered(loc)) {
        Meteor.call("LocationsDiscover", loc);
    }
};