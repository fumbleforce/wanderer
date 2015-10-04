Session.set("tradeAddingItems", false);

Template.trade.helpers({
    storageItems: function () {
        return Storage.getExpanded();
    },

    yourItems: function () {
        var trade = TradeCollection.findOne({ parties: Meteor.user().name, completed:false });
        if (trade == null) return [];
        var index = trade.parties.indexOf(Meteor.user().name);
        return _.map(trade.offers[index], function (i) {
            return _.extend(i, Item.get(i.id));
        });
    },

    traderItems: function () {
        var trade = TradeCollection.findOne({ parties: Meteor.user().name, completed:false });
        if (trade == null) return [];
        var index = Math.floor(trade.parties.length - trade.parties.indexOf(Meteor.user().name) - 1);
        return _.map(trade.offers[index], function (i) {
            return _.extend(i, Item.get(i.id));
        });
    },

    trade: function () {
        return TradeCollection.findOne({ parties: Meteor.user().name, completed: false })
    },

});

Template.trade.events({
    "click .accept": function () {
        Meteor.call("TradeAccept");
    },

    "click .cancel": function () {
        Meteor.call("TradeCancel");
    },

    "click .add-item": function(e) {
        var itemid = e.currentTarget.getAttribute("itemid");
        Meteor.call("TradeAdd", itemid);
    },

    "click .remove-item": function(e) {
        var itemid = e.currentTarget.getAttribute("itemid");
        Meteor.call("TradeRemove", itemid);
    },


    "click .add": function () {
        Session.set("tradeAddingItems", true);
    },

    "click .stop": function () {
        Session.set("tradeAddingItems", false);
    }
})