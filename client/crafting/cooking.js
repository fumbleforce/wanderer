
CookingData = new ReactiveDict;

Cooking = {};

Cooking.start = function () {
    CookingData.set("temp", 100);

    var tempInterval = Meteor.setInterval(function () {
        CookingData.set("temp", CookingData.get("temp")-1);
        if (CookingData.get("temp") <= 0) {
            Meteor.clearInterval(tempInterval);
            Session.set("fireActive", false);
            Session.set("userStatus", "camping");
        }
    }, 1000);


}

Template.cooking.helpers({
    ingredients: function () {
        return Storage.getCategory("food");
    },

    temp: function () {
        return CookingData.get("temp");
    }
});

Template.cooking.events({
    "click [action='inc-heat']": function () {
        CookingData.set("temp", CookingData.get("temp")+10);
    },
});