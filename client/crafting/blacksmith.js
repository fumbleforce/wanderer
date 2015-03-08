Session.set("blacksmithSchematic", false);

Template.blacksmith.helpers({
    blacksmith: function () {
        return Locations.getTown(Meteor.user().location).facilities.blacksmith;
    },

    materials: function () {
        return Storage.getCategory("material");
    },

    schematics: function () {
        return Storage.getCategory("blacksmithSchematic");
    },

    activeSchematic: function () {
        if (!Session.get("blacksmithSchematic")) return;

        var schem = Item.get(Session.get("blacksmithSchematic"));
        return schem;
    }
});

Template.blacksmith.events({
    "click [schematic]": function (e) {
        var schematic = e.currentTarget.getAttribute("schematic");
        Session.set("blacksmithSchematic", schematic);
    }
});