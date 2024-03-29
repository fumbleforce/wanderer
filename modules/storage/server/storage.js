
cleanupStorage = function (storage) {
    var remNum = 0;
    for (var p = 0; p < storage.length - remNum; p++) {
        if (storage[p] == undefined || storage[p] == null) {
            remNum++;
            for (var x = p; x < storage.length-1; x++) {
                console.log(_.map(storage, function (el) { if(el) return el.id; else return undefined}));
                var temp = storage[x];
                storage[x] = storage[x+1];
                storage[x+1] = temp;
            }
            console.log(_.map(storage, function (el) { if(el) return el.id; else return undefined}));
        }
    }
    storage.length -= remNum;
    return storage;
};

StorageAddMultiple = function (storage, items) {
    console.log("Adding", items)
    for (var i = 0; i < items.length; i++) {
        var id = items[i].id,
            qty = items[i].qty,
            hasPos = false;

        for (var j = 0; j < storage.length; j++) {
            if (storage[j].id === id) {
                storage[j].qty += qty;
                hasPos = true;
                break;
            }
        }
        if (!hasPos) {
            console.log(storage)
            storage.push({ id: id, qty: qty });
        }
    }
    return storage;
};

StorageRemoveMultiple = function (storage, items) {
    for (var i = 0; i < items.length; i++) {
        for (var pos = 0; pos < storage.length; pos++) {
            if (storage[pos].id === items[i].id) {
                storage[pos].qty -= items[i].qty;
                if (storage[pos].qty === 0) {
                    storage[pos] = undefined;
                } else if (storage[pos].qty < 0) {
                    throw new Meteor.Error("Not enough items to remove, homework was not done.");
                }
            }
        }
    }
    storage = cleanupStorage(storage);
    return storage;
};

Meteor.methods({

    StorageSpend: function (posqty) {
        var s = Meteor.user().storage;
        for (var i = 0; i < posqty.length; i++) {
            if (s[posqty[i].pos].id != posqty[i].id)
                throw new Meteor.Error("Position in storage spending invalid");

            s[posqty[i].pos].qty -= posqty[i].qty;
            if (s[posqty[i].pos].qty <= 0) {
                s[posqty[i].pos] = undefined;
            }
        }
        User.update({ $set: { storage: s } });
    },

    StorageRemove: function (opts) {
        var storage = Meteor.user().storage,
            id = opts.id,
            qty = opts.qty;
        console.log("Removing", opts)
        for (var pos = 0; pos < storage.length; pos++) {
            if (storage[pos].id === id) {
                console.log("Removing from", storage[pos])
                storage[pos].qty -= qty;
                if (storage[pos].qty === 0) {
                    storage[pos] = undefined;
                } else if (storage[pos].qty < 0) {
                    throw new Meteor.Error("Not enough items to remove, homework was not done.");
                }
            }
        }

        storage = cleanupStorage(storage);
        
        User.update({ $set: { storage: storage } });
    },

    StorageSpendCategory: function (opts) {
        var s = Meteor.user().storage,
            cat = opts.category,
            qty = opts.qty,
            spent = 0;
        for (var i = 0; i < s.length; i++) {
            if (spent >= qty) {
                break;
            }
            if (Item.get(s[i].id).category === cat) {
                if (spent + s[i].qty > qty) {
                    console.log("reducing quantity by", qty - spent)
                    s[i].qty -= qty - spent;
                    spent += qty - spent;
                    break;
                } else {
                    spent += s[i].qty;
                    s[i] = undefined;
                }
            }
        }

        User.update({ $set: { storage: s } });
    },

    StorageSpendMultiple: function (items) {
        var storage = Meteor.user().storage;
        storage = StorageRemoveMultiple(storage, items);
        User.update({ $set: { storage: storage } });
    },

    StorageRemoveMultiple: function (items) {
        var storage = Meteor.user().storage;
        storage = StorageRemoveMultiple(storage, items);
        User.update({ $set: { storage: storage } });
    },

    StorageAdd: function (opts) {
        var storage = Storage.get(),
            id = opts.id,
            qty = +opts.qty,
            hasPos = false;

        if (isNaN(qty))
            throw new Meteor.Error("Quantity is NaN: " + opts.qty);

        for (var i = 0; i < storage.length; i++) {
            if (storage[i].id === id) {
                storage[i].qty += qty;
                hasPos = true;
                break;
            }
        }
        if (!hasPos) {
            storage.push({ id: id, qty: qty });
        }
        User.update({ $set: { storage: storage } });
    },

    StorageAddMultiple: function (items) {
        var storage = Storage.get();
        storage = StorageAddMultiple(storage, items);
        User.update({ $set: { storage: storage } });
    }

});