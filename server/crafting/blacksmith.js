Meteor.methods({
    BlacksmithCraft: function (schematicId) {
        var schematic = Item.get(schematicId);

        if (!Storage.has(schematic.requires)) {
            throw new Meteor.Error("Do not have the required materials")
        }

        Meteor.call("StorageRemoveMultiple", schematic.requires);
        Meteor.call("StorageAdd", { id: schematic.crafts, qty: 1 });
    },

    BlacksmithSmelt: function (opts) {
        var smelted = Crafting.smelting[opts.ore];
        Meteor.call("StorageAdd", { id: smelted, qty: 1 });
    },

    BlacksmithSmeltConsume: function (opts) {
        var ore = opts.ore;
        Meteor.call("StorageRemove", { id: ore, qty: 1 });
    }
});