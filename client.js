if (Meteor.isClient) {

Template.registerHelper("userStatus", function () { return Session.get("userStatus"); });
Template.registerHelper("camping", function () { return Session.get("userStatus") == "camping"; });
Template.registerHelper("walking", function () { return Session.get("userStatus") == "walking"; });
Template.registerHelper("town", function () { return Session.get("userStatus") == "town"; });
Template.registerHelper("inCombat", function () { return Session.get("userStatus") == "combat"; });

Meteor.startup(function () {
    Session.set("userStatus", "camping");
});

function handleAction (action) {

}


Template.user.helpers({

});

Template.user.events({
    "click #log-in": function (e, t) {
        var email = t.find('#email').value,
            password = t.find('#password').value;

        Meteor.loginWithPassword(email, password);
    },

    "click #create-user": function (e, t) {
        var email = t.find('#new-email').value,
            password = t.find('#new-password').value,
            character = t.find('#new-character').value;

        var def = _.extend({}, defaultUser);
        var usr = _.extend(def, {
            name: character,
        });
        console.log(usr)
        Accounts.createUser({
            email: email,
            password: password,
            createdDate: new Date()
        });
        User.update({ $set: usr });
    },
});

Template.uiCamping.helpers({
    campingAction: function () { return Session.get("campingAction"); },
});

Template.uiCamping.events({
    "click .action": function (e, t) {
        var action = e.currentTarget.getAttribute("action");
        Session.set("campingAction", action);

        if (action === "dirt") {
            Meteor.call("StorageAdd", { id: "dirt", qty: 1 });
        } else if (action === "break") {
            Session.set("userStatus", "walking");
        } else if (action === "eat") {
            Meteor.call("CharacterEat");
        } else if (action === "drink") {
            Meteor.call("CharacterDrink");
        } else if (action === "read") {
            Meteor.call("CharacterRead");
        } else if (action === "fire") {

        }
    }
});

function constructDirection (dir) {
    var loc = Meteor.user().location,
        locTo, locToInfo;

    if (dir === "west") {
        locTo = (+loc.split("|")[0] -1) + "|" + (+loc.split("|")[1]);
    } else if (dir === "east") {
        locTo = (+loc.split("|")[0] +1) + "|" + (+loc.split("|")[1]);
    } else if (dir === "north") {
        locTo = (+loc.split("|")[0] ) + "|" + (+loc.split("|")[1]-1);
    } else if (dir === "south") {
        locTo = (+loc.split("|")[0]) + "|" + (+loc.split("|")[1]+1);
    }

    var locToInfo = Locations.get(locTo),
        info = "";

    if (locToInfo) {
        if (locToInfo.hasPath) {
            info += "Follow the path";
        } else {
            info += "Walk ";
        }

        info += " into the " + locToInfo.biome;
        info += " "+dir+"ward";

    }

    return info;
}

Template.uiWalking.helpers({
    campingAction: function () { return Session.get("campingAction"); },

    west: function () {
        return constructDirection("west");
    },
    east: function () {
        return constructDirection("east");
    },
    north: function () {
        return constructDirection("north");
    },
    south: function () {
        return constructDirection("south");
    },
});

Template.uiWalking.events({
    "click .action": function (e, t) {
        var action = e.currentTarget.getAttribute("action");

        if (action === "west") {
            Meteor.call("CharacterGo", "west");
        } else if (action === "east") {
            Meteor.call("CharacterGo", "east");
        } else if (action === "south") {
            Meteor.call("CharacterGo", "south");
        } else if (action === "north") {
            Meteor.call("CharacterGo", "north");
        } else if (action === "east") {
            Meteor.call("GoEast");
        } else if (action === "east") {
            Meteor.call("GoEast");
        }
    }
});

Template.uiCharacter.helpers({
    weaponSkills: function () {
        return _.map(Meteor.user().weaponSkills, function (val, key) {
            return { label: key, value: val };
        });
    },
    spellSkills: function () {
        return _.map(Meteor.user().spellSkills, function (val, key) {
            return { label: key, value: val };
        });
    },
    craftingSkills: function () {
        return _.map(Meteor.user().craftingSkills, function (val, key) {
            return { label: key, value: val };
        });
    },
    physicalSkills: function () {
        return _.map(Meteor.user().physicalSkills, function (val, key) {
            return { label: key, value: val };
        });
    },
    mentalSkills: function () {
        return _.map(Meteor.user().mentalSkills, function (val, key) {
            return { label: key, value: val };
        });
    },
    totalSkills: function () {
        return  _.reduce(Meteor.user().weaponSkills, function (a, b) { return a + b; }, 0) +
                _.reduce(Meteor.user().spellSkills, function (a, b) { return a + b; }, 0) +
                _.reduce(Meteor.user().craftingSkills, function (a, b) { return a + b; }, 0) +
                _.reduce(Meteor.user().physicalSkills, function (a, b) { return a + b; }, 0) +
                _.reduce(Meteor.user().mentalSkills, function (a, b) { return a + b; }, 0);
    }
});

Template.uiBooks.helpers({
    books: function () {
        return _.filter(Storage.getCategory("book"), function (b) { return Meteor.user().books.read.indexOf(b.id) === -1; });
    },
    reading: function () {
        return Meteor.user().activity.reading;
    },
    timeLeft: function () {
        if (Meteor.user().activity.reading) {
            return (new Date(Meteor.user().activity.reading.locked)).getSeconds() - (new Date()).getSeconds();
        }
        return;
    },
})

Template.uiBooks.events({
    "click .read": function (e) {
        var book = e.currentTarget.getAttribute("book");
        Meteor.call("CharacterStartBook", book);
    },
});



Template.map.helpers({
    rows: function () {
        return Locations.asMap;
    },

    location: function () {
        $(".map [player=true]").html("");
        $(".map [loc='"+Meteor.user().location+"']")
                .html("<span>x</span>")
                .attr("player", true);
        Meteor.setTimeout(function () {
            $(".map [loc='"+Meteor.user().location+"']")
                .html("<span>x</span>")
                .attr("player", true);
        }, 1000);

        return Meteor.user().location;
    }
});



Template.combat.helpers({
    combat: function () {
        return BattleCollection.findOne({ party: { $elemMatch: { _id: Meteor.userId() } } });
    }
});

Template.combat.events({
    combat: function () {

    }
});



















}