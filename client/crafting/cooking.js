
var CookingData = new ReactiveDict;

CookingData.set("temp", 0);

function startCooking () {

    var tempInterval = Meteor.setInterval(function () {
        CookingData.set("temp", CookingData.get("temp")-1);
        if (CookingData.get("temp") <= 0) {
            Meteor.clearInterval(tempInterval);
            Session.set("fireActive", false);
            Session.set("userStatus", "camping");
        }
    }, 1000);
};

Template.cooking.helpers({
    ingredients: function () {
        return Storage.getCategory("food");
    },

    temp: function () {
        return CookingData.get("temp");
    }
});

Template.cooking.events({
    "click [action]": function () {

        switch (acction) {
            case "light":
                CookingData.set("temp", 100);
                break;
            case "inc-heat":
                // Temperature needs to be kept in certain ranges in different phases of cooking
                CookingData.set("temp", CookingData.get("temp")+10);
                break;
        }
    },
    "click [action='stop']": function () {
        Session.set("fireActive", false);
        Session.set("userStatus", "camping");
    },
    "click [action='add']": function () {
        // Add a new ingredient
        // Should be added at the correct time
        // according to a recipe
    },
    "click [action='stir']": function () {
        // Balance stirring based on recipe
        // Keep stirring in range of the optimal
        // [        |----@           ]
    },
});