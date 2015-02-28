Meteor.methods({

    TradeVendorBuy: function (opts) {
        var id = opts.id,
            shopid = opts.shop,
            qty = +opts.qty,
            shopHasItem = false,
            item = Item.get(id);

        console.log(item)

        var items = Locations.getTown(Meteor.user().location).shops[shopid].items;
        console.log("items", items)
        for (var i = 0; i < items.length; i++) {
            if (items[i].id === id) {
                item.sellPrice = items[i].sell;
                item.buyPrice = items[i].buy;
                shopHasItem = true;
            }
        }

        if (!shopHasItem) {
            throw new Meteor.Error("The shop does not have " + item.name);
        }

        if (Meteor.user().coins < item.sellPrice * qty)
            throw new Meteor.Error("Not enough money in treasury, have " + Meteor.user().coins + " need " + item.sellPrice * qty);

        Meteor.call("WalletSpend", {
            desc: "Bought "+ qty + " of " + item.name + " for $" + (item.sellPrice * qty),
            amount: item.sellPrice * qty
        });

        Meteor.call("StorageAdd", { id: id, qty: qty });

        //Event.addEvent("Bought "+ qty + " of " + item.name + " for $" + (item.sellPrice * qty))
    },

    TradeVendorSell: function (opts) {
        var id = opts.id,
            qty = +opts.qty,
            item = Item.get(id);

        if (!Storage.hasItem(id, qty))
            throw new Meteor.Error("Not enough "+item.name);

        Meteor.call("StorageSpendMultiple", [{ id: id, qty: qty }]);

        Meteor.call("WalletEarn", {
            desc: "Sold "+ qty + " of " + item.name + " for " + (item.buyPrice * qty),
            amount: item.buyPrice * qty
        });

        //Event.addEvent("Sold "+ qty + " of " + item.name + " for " + (item.buyPrice * qty))
    },
});
