
var dungeon, dungeonInstance;
var instanceUpdateDep = new Tracker.Dependency();

/*
Keeps the dungeon and dungeonInstance variables up
to date. If no dungeonInstance has been created, call
DungeonEnter to create a new one.

The dungeonInstance keeps track of all dynamic data
regarding dungeon progress, while dungeon  handles all static
data.
*/
Meteor.autorun(function () {
    if (Session.get("userStatus") != "dungeon") return;
    if (Meteor.user() == undefined) return;

    dungeon = Locations.getDungeon(Meteor.user().location);

    var party = Party.get(),
        owner;
    if (party == null) {
        owner = Meteor.userId();
    } else {
        owner = party._id;
    }

    dungeonInstance = DungeonInstanceCollection.findOne({ owner: owner });
    console.log("Refreshed instance from DB")
    if (dungeonInstance == null) {
        Meteor.call("DungeonEnter");
        dungeonInstance = DungeonInstanceCollection.findOne({ owner: owner });
    }
    instanceUpdateDep.changed();
})

Template.dungeonNav.helpers({
    level: function () {
        instanceUpdateDep.depend();
        return dungeonInstance.status.level;
    },

    hasNext: function () {
        instanceUpdateDep.depend();
        if (dungeon == undefined || dungeonInstance == undefined) return;
        var level = dungeon.levels[dungeonInstance.status.level];
        console.log("leevel", level)
        return level.next != undefined;
    },

    type: function (t) {
        instanceUpdateDep.depend();
        if (dungeon == undefined || dungeonInstance == undefined) return;
        var level = dungeon.levels[dungeonInstance.status.level];
        return level.type === t;
    },

    completed: function () {
        instanceUpdateDep.depend();
        // Completed room and can move on
        if (dungeon == undefined || dungeonInstance == undefined) return;
        var level = dungeon.levels[dungeonInstance.status.level];
        if (level.type === "encounter") {
            return dungeonInstance.status["completed"+dungeonInstance.status.level];
        }

        return true;
    },

    choices: function () {
        instanceUpdateDep.depend();
        // Completed room and can move on
        if (dungeon == undefined || dungeonInstance == undefined) return;
        var level = dungeon.levels[dungeonInstance.status.level];
        if (level.type === "choice") {
            return level.choices;
        }
        return [];
    }
});

Template.dungeonNav.events({
    "click [action]": function (e) {
        var action = e.currentTarget.getAttribute("action");

        switch (action) {
            case "move":
                Meteor.call("DungeonStatus", { "level": dungeonInstance.status.level+1 });
                break;
            case "fight":
                Meteor.call("BattleDungeonEncounter");
                break;
            case "loot":
                Meteor.call("DungeonLoot");
                break;
            case "back":
                var prev = dungeon.levels[dungeonInstance.status.level].prev;
                if (prev == null) {
                    Meteor.call("DungeonStatus", { "level": 0 });
                    Status.set("navigation");
                } else {
                    Meteor.call("DungeonStatus", { "level": prev });
                }
                break;
            case "flee":
                Meteor.call("DungeonStatus", { "level": 0 });
                Status.set("navigation");
                break;
        }
    },

    "click [choice]": function (e) {
        var choice = e.currentTarget.getAttribute("choice");
        choice = _.find(dungeon.levels[dungeonInstance.status.level].choices, function (el) {
            return el.id === choice;
        });
        switch (choice.type) {
            case "level":
                Meteor.call("DungeonStatus", { "level": choice.level });
                break;
        }
    },
});



Template.dungeon.helpers({
    type: function (t) {
        instanceUpdateDep.depend();
        if (dungeon == undefined || dungeonInstance == undefined) return;
        var level = dungeon.levels[dungeonInstance.status.level];
        return level.type === t;
    },

    loc: function () {
        instanceUpdateDep.depend();
        if (dungeon == undefined || dungeonInstance == undefined) return;
        return labelify(dungeon.levels[dungeonInstance.status.level].id);
    },

    text: function () {
        instanceUpdateDep.depend();
        if (dungeon == undefined || dungeonInstance == undefined) return;
        return dungeon.levels[dungeonInstance.status.level].text;
    },

    treasures: function () {
        instanceUpdateDep.depend();
        if (dungeon == undefined || dungeonInstance == undefined) return;
        if (dungeonInstance.status["looted"+dungeonInstance.status.level]) {
            return [{ id:"Already looted", notItem: true}];
        }
        return dungeon.levels[dungeonInstance.status.level].treasure;
    }
});

Template.dungeon.events({

});