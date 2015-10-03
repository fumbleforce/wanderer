Item = typeof Item !== 'undefined' ? Item : {};

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



Item.items = [
    // Raw metals used for producing things
    {
        id: "coin",
        category: "coin",
        desc: "Used for purchasing items and services",
        quality: 3,
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

];

Item.items = Item.items.concat(_items_armor);
Item.items = Item.items.concat(_items_books);
Item.items = Item.items.concat(_items_herb);
Item.items = Item.items.concat(_items_materials);
Item.items = Item.items.concat(_items_metal);
Item.items = Item.items.concat(_items_prey);
Item.items = Item.items.concat(_items_quest);
Item.items = Item.items.concat(_items_trash);
Item.items = Item.items.concat(_items_utility);
Item.items = Item.items.concat(_items_weapons);
Item.items = Item.items.concat(_items_schematics);

Item.items = _.map(Item.items, function (i) {
    var name = i.name;
    if (name == undefined) name = Util.labelify(i.id);
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

Item.filter = function (filters) {
    var items = Item.items;
    _.each(filters, function (val, filter) {
        items = _.filter(items, function (item) {
            return item[filter] == val;
        });
    });
    return items;
}