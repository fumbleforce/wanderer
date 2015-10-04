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
        var smelted;
        var alloy = opts.alloy;
        var total = 0;

        _.each(alloy, function (val,key) { total += val; }, 0);

        _.each(alloy, function (val, key) {
            alloy[key] = Math.floor(100*val/total);
        });

        console.log("Alloy: ", alloy)
        var smeltedBar = _.some(Crafting.smelting, function (ores, bar) {
            console.log("Smelted", bar, "?");
            var correctCombo = _.all(ores, function (range, ore) {
                console.log("Must have ", ore, "in", range)
                return _.some(alloy, function (val, alloyOre) {
                    console.log(alloyOre, val, ore === alloyOre && range[0] <= val && val <= range[1]);
                    return ore === alloyOre && range[0] <= val && val <= range[1];
                });
            });
            console.log("Correct:", correctCombo)
            if (correctCombo) {
                smelted = bar;
                return true;
            }
            return false;
        });

        if (smeltedBar) {
            Meteor.call("StorageAdd", { id: smelted, qty: 1 });
        } else {
            //Meteor.call("StorageAdd", { id: "lumpOfMetal", qty: 1 });
            var metals = [];
            _.each(opts.alloy, function (val, key) {
                metals.push({ id: key, qty: Math.floor(val/20) });
            });
            Meteor.call("StorageAddMultiple", metals);
        }

    },

    BlacksmithSmeltConsume: function (opts) {
        var ore = opts.ore;
        Meteor.call("StorageRemove", { id: ore, qty: 1 });
    }
});