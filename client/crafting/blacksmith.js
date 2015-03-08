Session.set("blacksmithSchematic", false);

Template.blacksmith.helpers({
    blacksmith: function () {
        return Locations.getTown(Meteor.user().location).facilities.blacksmith;
    },

    materials: function () {
        return Storage.getCategory("material");
    },

    ores: function () {
        return Storage.getCategory("ore");
    },


    schematics: function () {
        return Storage.getCategory("blacksmithSchematic");
    },

    activeSchematic: function () {
        if (!Session.get("blacksmithSchematic")) return;

        var schem = Item.get(Session.get("blacksmithSchematic"));
        return schem;
    },

    activeOre: function () {
        if (!Session.get("blacksmithOre")) return;

        var schem = Item.get(Session.get("blacksmithOre"));
        return schem;
    },
});

Template.blacksmith.events({
    "click [schematic]": function (e) {
        var schematic = e.currentTarget.getAttribute("schematic");
        Session.set("blacksmithSchematic", schematic);
    },

    "click [ore]": function (e) {
        var ore = e.currentTarget.getAttribute("ore");
        Session.set("blacksmithOre", ore);
    },

    "click .craft": function () {
        var schematic = Session.get("blacksmithSchematic");

        Meteor.call("BlacksmithCraft", schematic);
    },

    "click .smelt": function () {
        var ore = Session.get("blacksmithOre");

        Meteor.call("BlacksmithSmelt", ore);
    },
});