function getSelector () {

}

Meteor.methods({
    DungeonEnter: function () {
        var party = Party.get(),
            loc = Meteor.user().location,
            owner;

        var dungeonId = loc.split("|")[1];

        if (!(dungeonId in Locations.dungeons)) {
            throw new Meteor.Error(dungeonId+" is not a dungeon");
        }

        if (party == null) {
            owner = Meteor.userId();
        } else {
            owner = party._id;
        }
        
        DungeonInstanceCollection.insert({
            dungeon: dungeonId,
            owner: owner,
            party: party != null,
            status: {
                level: 0,
            }
        });
    },

    DungeonStatus: function (opts) {
        var party = Party.get(),
            loc = Meteor.user().location,
            owner;

        var dungeonId = loc.split("|")[1];

        if (!(dungeonId in Locations.dungeons)) {
            throw new Meteor.Error(dungeonId+" is not a dungeon");
        }

        if (party == null) owner = Meteor.userId();
        else owner = party._id;
        console.log("owner", owner, "dungeon", dungeonId)
        console.log("Setting status ", opts)

        var update = {};
        _.each(opts, function (val, key) {
            update["status."+key] = val;
        });

        DungeonInstanceCollection.update(
            { owner: owner, dungeon: dungeonId },
            { $set: update }
        );
    },

    DungeonLoot: function () {
        var party = Party.get(),
            loc = Meteor.user().location,
            owner;

        var dungeonId = loc.split("|")[1];

        if (!(dungeonId in Locations.dungeons)) {
            throw new Meteor.Error(dungeonId+" is not a dungeon");
        }

        var dungeon = Locations.getDungeon(dungeonId);

        if (party == null) owner = Meteor.userId();
        else owner = party._id;

        var instance = DungeonInstanceCollection.findOne({ owner: owner, dungeon: dungeonId }),
            level = instance.status.level,
            loot = dungeon.levels[level].treasure;

        if (instance.status["looted"+level]) {
            throw new Meteor.Error("Already looted");
        }

        if (party == null) {
            Meteor.call("StorageAddMultiple", loot);
        } else {
            var leader = Meteor.users.findOne({ name: party.leader });
            var storage = StorageAddMultiple(leader.storage, loot);
            Meteor.users.update({ name: party.leader }, { $set: { storage: storage }});
        }
        var set = {};
        set["status.looted"+level] = true;
        DungeonInstanceCollection.update(instance._id, { $set: set });


    }
})