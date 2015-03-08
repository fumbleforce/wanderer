Meteor.methods({
    BlacksmithCraft: function (schematicId) {
        var schematic = Item.get(schematicId);

        if (!Storage.has(schematic.requires)) {
            throw new Meteor.Error("Do not have the required materials")
        }

        Meteor.call("StorageRemoveMultiple", schematic.requires);
        Meteor.call("StorageAdd", { id: schematic.crafts, qty: 1 });
    },

    BlacksmithSmelt: function (oreId) {
        var ore = Item.get(oreId);

        Meteor.call("StorageRemove", { id: ore.id, qty: 2 });
        Meteor.call("StorageAdd", { id: "ironBar", qty: 1 });
    },
});