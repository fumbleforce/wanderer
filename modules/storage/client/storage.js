Template.storage.helpers({
    storageList: function () {
        return Storage.getExpanded();
    },
});

discardItem = function ($el) {
    var itemId = $el.attr("itemId"),
        quantity = $el.attr("quantity");

    var question = "Are you sure you want to discard " +
        quantity + " of " + Item.get(itemId).name + "?";

    Dialog.getConfirmation(question, function (res) {
        if (res) {
            Meteor.call("removeItems", { item: itemId, amount: quantity });
        }
    });

};