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

        if (Meteor.user().coins < item.sellPrice * qty) {
            throw new Meteor.Error("Not enough money in treasury, have " + Meteor.user().coins + " need " + item.sellPrice * qty);
        }

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

    TradePlayer: function (player) {

        if (TradeCollection.find({ parties: Meteor.user().name, completed:false }).count() > 0) {
            throw new Meteor.Error("Already trading");
        }

        TradeCollection.insert({
            parties: [Meteor.user().name, player],
            offers: [[], []],
            accept: [false, false],
            completed: false,
        });
    },

    TradeAccept: function () {
        var trade = TradeCollection.findOne({ parties: Meteor.user().name, completed:false }),
            index = trade.parties.indexOf(Meteor.user().name),
            indexOther = Math.abs(1 - index);

        trade.accept[index] = true;

        if (trade.accept[0] && trade.accept[1]) {
            // Trade complete
            
            //Remove my items from my storage
            var storage = Meteor.user().storage;
            var items = trade.offers[index];
            //storage = StorageRemoveMultiple(storage, items);

            //Add the offered items to my storage
            items = trade.offers[indexOther];
            storage = StorageAddMultiple(storage, items);

            User.update({ $set: { storage: storage } });

            //Remove traders offered items
            storage = Meteor.users.findOne({ name: trade.parties[indexOther] }).storage;
            items = trade.offers[indexOther];
            //storage = StorageRemoveMultiple(storage, items);

            //Add my offered items to traders storage
            items = trade.offers[index];
            storage = StorageAddMultiple(storage, items);

            Meteor.users.update({ name: trade.parties[indexOther] }, {
                $set: { storage: storage }
            });

            TradeCollection.update(trade._id, {
                $set: { completed: true }
            });

        } else {
            TradeCollection.update(trade._id, {
                $set: { accept: trade.accept }
            });
        }
    },

    TradeCancel: function () {
        var trade = TradeCollection.findOne({ parties: Meteor.user().name, completed:false }),
            index = trade.parties.indexOf(Meteor.user().name),
            indexOther = Math.abs(1 - index);

        // Trade complete
        
        //Remove my items from my storage
        var storage = Meteor.user().storage;
        var items;
        //items = trade.offers[index];
        //storage = StorageRemoveMultiple(storage, items);

        //Add the offered items to my storage
        items = trade.offers[index];
        storage = StorageAddMultiple(storage, items);

        User.update({ $set: { storage: storage } });

        //Remove traders offered items
        var trader = Meteor.users.findOne({ name: trade.parties[indexOther] });
        storage = trader.storage;
        //items = trade.offers[indexOther];
        //storage = StorageRemoveMultiple(storage, items);

        //Add my offered items to traders storage
        items = trade.offers[indexOther];
        storage = StorageAddMultiple(storage, items);

        Meteor.users.update({ name: trade.parties[indexOther] }, {
            $set: { storage: storage }
        });

        TradeCollection.update(trade._id, {
            $set: { completed: true }
        });
    },

    TradeAdd: function (itemid) {
        var trade = TradeCollection.findOne({ parties: Meteor.user().name, completed:false }),
            index = trade.parties.indexOf(Meteor.user().name);

        var offerIndex = -1
        for (var i = 0; i < trade.offers[index].length; i++) {
            if (trade.offers[index][i].id === itemid) {
                offerIndex = i;
                break;
            }
        }

        if (offerIndex != -1) {
            var update = {};
            update["offers."+index+"."+offerIndex+".qty"] = 1;
            TradeCollection.update(trade._id, {
                $inc: update
            });
        } else {
            var update = {};
            update["offers."+index] = { id: itemid, qty: 1 };
            TradeCollection.update(trade._id, {
                $push: update
            });
        }

        Meteor.call("StorageRemove", { id: itemid, qty: 1 });
    },

    TradeRemove: function (itemid) {
        var trade = TradeCollection.findOne({ parties: Meteor.user().name, completed:false }),
            index = trade.parties.indexOf(Meteor.user().name);

        var offerIndex = -1
        for (var i = 0; i < trade.offers[index].length; i++) {
            if (trade.offers[index][i].id === itemid) {
                offerIndex = i;
                break;
            }
        }

        if (offerIndex != -1) {
            var update = {};

            if (trade.offers[index][offerIndex].qty > 1) {
                update["offers."+index+"."+offerIndex+".qty"] = -1;
                TradeCollection.update(trade._id, {
                    $inc: update
                });
            } else {
                update["offers."+index] = { id: itemid };
                TradeCollection.update(trade._id, {
                    $pull: update
                });
            }

        } else {
            throw new Meteor.Error("Could not find item to remove");
        }

        Meteor.call("StorageAdd", { id: itemid, qty: 1 });
    }
});
