
Session.set("townStatus", "navigation");
Session.set("townShopId");
Session.set("activeQuest", false)

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

    people: function () {
        return NPC.byLocation[Meteor.user().location];
    },

    quests: function () {
        return _.filter(Quest.getByNpc(Session.get("selectedNpc")), function (q) {
            return !(q.id in Meteor.user().quests);
        });
    },

    questActive: function () {
        return Session.get("activeQuest");
    },
});

Template.town.events({
    "click [action]": function (e, t) {
        var action = e.currentTarget.getAttribute("action");

        switch (action) {
            case "navigation": Session.set("townStatus", "navigation"); break;
            case "shops": Session.set("townStatus", "shops"); break;
            case "inn": Session.set("townStatus", "inn"); break;
            case "people": Session.set("townStatus", "people"); break;
            case "walk":
                Meteor.call("TownWalkStreets");
                break;
            case "leave":
                console.log("Leaving city");
                Meteor.call("PartyStatus", "walking");
                Session.set("townStatus", "navigation");
                Session.set("userStatus", "walking");
                break;

        }
    },

    "click [npc]": function (e) {
        var npc = e.currentTarget.getAttribute("npc");
        Session.set("selectedNpc", npc);
        Session.set("townStatus", "npc")
    },

    "click [quest]": function (e) {
        var quest = e.currentTarget.getAttribute("quest");
        Session.set("activeQuest", quest);
    },


    "click [shop]": function (e) {
        var shop = +e.currentTarget.getAttribute("shop");
        Session.set("townShopId", shop);
        Session.set("townStatus", "shop");
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
