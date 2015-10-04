

Meteor.methods({
    EquipmentSet: function (opts) {
        var id = opts.id,
            slot = opts.slot;

        if (id == undefined || id === "") {
            if (Meteor.user().equipment && Meteor.user().equipment[slot]) {
                Meteor.call("StorageAdd", { id: Meteor.user().equipment[slot], qty: 1 });
            }
            id = undefined;
        } else {
            Meteor.call("StorageRemove", { id: id, qty: 1 });
        }

        var setUpdate = {};
        setUpdate["equipment."+slot] = id;
        User.update({ $set: setUpdate });
    }
})