Locations = {};




/*

var map = [], loc,
    ri = 0,
    width = jsonmap.width,
    height = jsonmap.height;

for (var r = 0; r < height; r++) {
    map.push([]);

    for (var c = 0; c < width; c++) {
        loc = {
            biome: Locations.biomes[jsonmap.layers[0].data[c+r*width]-1],
            loc: c + "|" + r,
        };

        if (loc.biome === "highmountain" || loc.biome === "water") {
            loc.accessible = false;
        }

        map[ri].push(loc);
    };
    ri++;
};

Locations.asMap = map;
*/



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
    "63|51": {
        name: "Caldum",

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
                    { id: "ironShortsword", buy: 10, sell: 15 },
                    { id: "ironTwoHandAxe", buy: 10, sell: 15 },
                    { id: "ironHammer", buy: 10, sell: 15 },
                    { id: "pewterMug", buy: 10, sell: 15 },
                    { id: "tinKettle", buy: 10, sell: 15 },
                    { id: "ironPot", buy: 10, sell: 15 },
                ]
            }
        ]
    },
    "57|38": {
        name: "Wildberry",

        shops: [
            {
                id:"generalStore",
                owner: "galadonGreaves",
            }
        ]
    },
};

Locations.getTown = function (loc) {
    if (loc in Locations.towns) {
        return Locations.towns[loc];
    }
    return null;
};


Locations.get = function (l) {
    var row = +l.split("|")[0];
    var col = +l.split("|")[1];
    var width = jsonmap.width,
        height = jsonmap.height;
    var loc = {
        biome: Locations.biomes[jsonmap.layers[0].data[row+col*width]-1],
        loc: l,
        accessible: true,
    };
    if (loc.biome === "tallmountain" || loc.biome === "water") {
        loc.accessible = false;
    }
    return loc;
}


constructDirection = function (dir) {
    var loc = Meteor.user().location,
        locTo, locToInfo;
    //console.log(dir)
    if (dir === "west") {
        locTo = (+loc.split("|")[0] -1) + "|" + (+loc.split("|")[1]);
    } else if (dir === "east") {
        locTo = (+loc.split("|")[0] +1) + "|" + (+loc.split("|")[1]);
    } else if (dir === "north") {
        locTo = (+loc.split("|")[0] ) + "|" + (+loc.split("|")[1]-1);
    } else if (dir === "south") {
        locTo = (+loc.split("|")[0]) + "|" + (+loc.split("|")[1]+1);
    }
    //console.log("loc to", locTo)
    var locToInfo = Locations.get(locTo),
        info = "";
    //console.log("locinfo", locToInfo)
    if (locToInfo) {
        if (locToInfo.hasPath) {
            info += "Follow the path";
        } else {
            info += "Walk ";
        }
        if (locToInfo.biome === "city") {
            info += " into the city of " + Locations.getTown(locTo).name;
        } else if (locToInfo.biome === "village") {
            info += " into the village of " +  Locations.getTown(locTo).name;
        } else {
            info += " into the " + locToInfo.biome;
        }
        //info += " "+dir+"ward";

    }

    return info;
};