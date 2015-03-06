
Storage = {};

Storage.get = function () {
    return Meteor.user().storage
};

Storage.getCategory = function (category) {

    var expanded = _.map(Meteor.user().storage, function (i) { return Item.get(i.id); });

    return _.filter(expanded, function (i) {
        if (category === "rightHand" || category === "leftHand") {
            return i.category === category || i.category === "hand";
        }
        return i.category === category
    });
};

Storage.getExpanded = function () {
    return _.map(Storage.get(), function (item) {
        if (item == undefined) return;

        $.extend(item, Item.get(item.id));
        return item;
    });
}

Storage.spend = function (id, qty) {
    if (Storage.hasItem(id, qty)) {
        Meteor.call("StorageSpend", found);
        return true;
    }
    return false;
};

Storage.add = function (id, qty) {
    Meteor.call("StorageAdd", { id: id, qty: qty });
};

Storage.hasItem = function (id, qty) {
    var storage = Storage.get(),
        found = [],
        enough = false,
        need = qty;

    for (var i = 0; i < storage.length; i++) {
        var item = storage[i].id,
            quantity = storage[i].qty;

        if (item === id) {
            if (quantity < need) {
                found.push({ pos: i, qty: quantity, id: id });
            } else {
                found.push({ pos: i, qty: need, id: id });
                enough = true;
                break;
            }
        }
    }
    return enough;
}

Storage.has = function (items) {
    for (var i = 0; i < items.length; i++) {
        var hasOne = Storage.hasItem(items[i].id, items[i].qty);
        if (!hasOne) return false;
    }
    return true;
}

Storage.hasCategory = function (cat, num) {
    var storage = Storage.get(),
        found = 0;

    for (var i = 0; i < storage.length; i++) {
        var item = storage[i].id,
            quantity = storage[i].qty;

        if (Item.get(item).category === cat) {
            found += quantity;
        }
    }
    return found >= num;
};
