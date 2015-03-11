
Session.set("townStatus", "navigation");
Session.set("townShopId");
Session.set("activeQuest", false);
Session.set("innRumor", "");

var town;

Meteor.autorun(function () {
    // Set town
    if (!Meteor.user()) return;

    town = Locations.getTown(Meteor.user().location);
});

Template.townNav.helpers({
    townStatus: function (status) {
        return Session.get("townStatus") == status;
    },

    town: function () {
        if (!town) return;
        return town;
    },

    shops: function () {
        if (!town) return;
        return town.shops;
    },

    inn: function () {
        if (!town) return;

        if (!town.facilities || !town.facilities.inn) return;
        var inn = town.facilities.inn;
        console.log(inn)
        if (Locations.discovered(Meteor.user().location+"|inn")) {
            inn.welcomeMsg = inn.welcome[1];
        } else {
            inn.welcomeMsg = inn.welcome[0];
        }
        return inn;
    },

    shop: function () {
        return Locations.getTown(Meteor.user().location).shops[Session.get("townShopId")]
    },

    facilities: function () {
        return _.filter(asArray(Locations.getTown(Meteor.user().location).facilities), function (el) {
            return el.id != "inn";
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


});

Template.townNav.events({
    "click [action]": function (e, t) {
        var action = e.currentTarget.getAttribute("action");

        switch (action) {
            case "navigation": Session.set("townStatus", "navigation"); break;
            case "shops": Session.set("townStatus", "shops"); break;
            case "facilities":
                Session.set("townStatus", "facilities");
                break;
            case "inn":
                Session.set("townStatus", "inn");
                Meteor.setTimeout(function () { Locations.discover(Meteor.user().location+"|inn"); }, 30000);
                break;
            case "walk":
                Meteor.call("TownWalkStreets");
                break;
            case "leave":
                console.log("Leaving city");
                Status.set("navigation");
                Session.set("userStatus", "navigation");
                break;

        }
    },

    "click [inn]": function (e) {
        var innAction = e.currentTarget.getAttribute("inn");

        switch (innAction) {
            case "people": Session.set("townStatus", "innPeople"); break;
            case "drinks": Session.set("townStatus", "innDrinks"); break;
            case "rumor":
                var inn = Locations.getTown(Meteor.user().location).facilities.inn;
                Session.set("innRumor", inn.rumors[Math.floor(Math.random()*inn.rumors.length)]);
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

    "click [facility]": function (e) {
        var facility = e.currentTarget.getAttribute("facility");
        if (!facility) {
            Session.set("townFacility", false);
            return;
        }
        Session.set("townFacility", facility);
        Session.set("townStatus", "facility");
    },

    "click [drink]": function (e) {
        var drink = e.currentTarget.getAttribute("drink");
        Meteor.call("TownInnBuyDrink", drink);
        Session.set("townStatus", "inn");
    },


});

Template.town.helpers({
    townStatus: function (status) {
        return Session.get("townStatus") == status;
    },

    townFacility: function (facility) {
        return Session.get("townFacility") == facility;
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

    questActive: function () {
        return Session.get("activeQuest");
    },
});

Template.town.events({
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