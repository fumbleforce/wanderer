

Meteor.methods({
    TownWalkStreets: function () {


        // Random encounters here

        Meteor.call("BattleRandomEncounter", Meteor.user().location);
    },

    TownInnBuyDrink: function (id) {
        var drink = _.find(Locations.getTown(Meteor.user().location).facilities.inn.drinks, function (el) {
            console.log(el, id)
            return el.id === id;
        });
        console.log("drink", drink)

        if (!Storage.hasItem("coin", drink.buy)) {
            throw new Meteor.Error("Not enough coins");
        }

        Meteor.call("StorageRemove", { id: "coin", qty: drink.buy }, function (err) {
            console.log(err)
        });
        Meteor.call("StorageAdd", { id: id, qty: 1 });
    },
});