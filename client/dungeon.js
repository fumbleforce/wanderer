var dungeonStatus = new ReactiveDict();
dungeonStatus.set("level", 0);

var dungeon;

Meteor.autorun(function () {
    if (Session.get("userStatus") != "dungeon") return;

    dungeon = Locations.getDungeon(Meteor.user().location);
})

Template.dungeonNav.helpers({
    level: function () { return dungeonStatus.get("level"); },



    type: function (t) {
        if (dungeon == undefined) return;
        var level = dungeon.levels[dungeonStatus.get("level")];
        return level.type === t;
    },

    completed: function () {
        // Completed room and can move on
        if (dungeon == undefined) return;
        var level = dungeon.levels[dungeonStatus.get("level")];
        if (level.type === "story") return true;
        return dungeonStatus.get("completed");
    },
});

Template.dungeonNav.events({
    "click [action]": function (e) {
        var action = e.currentTarget.getAttribute("action");

        switch (action) {
            case "move":
                dungeonStatus.set("level", dungeonStatus.gey("level"));
                break;
            case "flee":
                dungeonStatus.set("level", 0);
                Session.set("userStatus", "navigation");
                break;
        }
    }
});



Template.dungeon.helpers({
    loc: function () {
        if (dungeon == undefined) return;
        return labelify(dungeon.levels[dungeonStatus.get("level")].id);
    },

    text: function () {
        if (dungeon == undefined) return;
        return dungeon.levels[dungeonStatus.get("level")].text;
    },
});

Template.dungeon.events({

});