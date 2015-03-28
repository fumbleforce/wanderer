ItemCollection = new Mongo.Collection("item");

Item = typeof Item !== 'undefined' ? Item : {};


Item.categories = [
    "coin",
    "utility",
    "ore",
    "material",
    "body",
    "book",
    "herb",
    "prey",
    "quest",
    "trash",
    "weapon",
];

Item.quality = [
    "junk",
    "material",
    "consumable",
    "weak",
    "sturdy",
    "terrific",
    "exemplary"
];


Item.get = function (filter) {
    if (typeof filter === "string") {
        filter = { $or: [
                { id: filter },
                { _id: filter },
        ]};
    }
    return ItemCollection.findOne(filter);
};

Item.filter = function (filter) {
    if (typeof filter === "string") {
        filter = { $or: [
                { id: filter },
                { _id: filter },
        ]};
    }
    return ItemCollection.find(filter);
};