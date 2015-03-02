
Session.set("townStatus", "navigation");
Session.set("townShopId");

Template.town.helpers({
    townStatus: function (status) {
        return Session.get("townStatus") == status;
    },

    town: function () {
        return Locations.getTown(Meteor.user().location);
    },

    shops: function () {
        return Locations.getTown(Meteor.user().location).shops;
    },

    shop: function () {
        return Locations.getTown(Meteor.user().location).shops[Session.get("townShopId")]
    },

    items: function () {
        return _.map(Locations.getTown(Meteor.user().location).shops[Session.get("townShopId")].items, function (i) {
            console.log(i)
            var item = Item.get(i.id);
            item.buy = i.buy;
            item.sell = i.sell;
            return item;
        });
    },
});

Template.town.events({
    "click .action": function (e, t) {
        var action = e.currentTarget.getAttribute("action");

        switch (action) {
            case "leave": Session.set("userStatus", "walking"); break;
            case "navigation": Session.set("townStatus", "navigation"); break;
            case "shops": Session.set("townStatus", "shops"); break;
            case "shop": Session.set("townStatus", "shop"); break;
            case "inn": Session.set("townStatus", "inn"); break;
            case "leave": Session.set("townStatus", "walking"); break;

        }
    },
    "click .shop": function (e) {
        var shop = +e.currentTarget.getAttribute("shopid");
        Session.set("townShopId", shop);
    },

    "click .buy": function (e) {
        var $el = $(e.target).closest(".shop-item"),
            qty = +$el.find(".amount").val(),
            item = $el.attr("itemid");

        if (qty === 0) qty = 1;

        Meteor.call("TradeVendorBuy", { id: item, qty: qty, shop: Session.get("townShopId") }, Error.handler);
    },

    "click .sell": function (e) {
        var $el = $(e.target).closest(".shop-item"),
            qty = +$el.find(".amount").val(),
            item = $el.attr("itemid");

        if (qty === 0) qty = 1;

        Meteor.call("TradeVendorSell", { id: item, qty: qty, shop: Session.get("townShopId") }, Error.handler);
    }
});
