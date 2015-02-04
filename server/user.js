
Meteor.startup(function () {

    // Validate user fields
    Meteor.users.find().forEach(function (user) {
        var changed = false;
        for (var x in defaultUser) {
            if (!(x in user)) {
                user[x] = defaultUser[x];
                changed = true;
            }
        }

        if (changed) {
            Meteor.users.update(user._id, user);
        }
    });

    // Finish books{ $where: "this.mayor.indexOf('"+term+"') != -1" },
    Meteor.users.find({
            $where: "this.activity.reading != undefined" ,
    }).forEach(function (user) {
        console.log(user.name)
        Meteor.users.update(user._id, {
            $inc: { "activity.reading.progress": 1 },
            $set: { "activity.reading.locked": undefined },
        });
        if (user.activity.reading.progress >= 10) {
            console.log(user.activity.reading)
            var book = Item.get(user.activity.reading.book);
            var skillInc = {};
            skillInc["mentalSkills."+book.skill] = book.skillIncrease;
            console.log(skillInc)
            Meteor.users.update(user._id, {
                $set: { "activity.reading": undefined },
                $push: { "books.read": book.id },
                $inc: skillInc,
            });
        }
    });
})

function resolveDir(loc, dir) {
    var locTo;
    if (dir === "west") {
        locTo = (+loc.split("|")[0] -1) + "|" + (+loc.split("|")[1]);
    } else if (dir === "east") {
        locTo = (+loc.split("|")[0] +1) + "|" + (+loc.split("|")[1]);
    } else if (dir === "north") {
        locTo = (+loc.split("|")[0] ) + "|" + (+loc.split("|")[1]-1);
    } else if (dir === "south") {
        locTo = (+loc.split("|")[0]) + "|" + (+loc.split("|")[1]+1);
    }
    return locTo;
}

Meteor.methods({
    CharacterEat: function () {
        if (Meteor.user().health.hunger > 0) {
            User.update({ $inc: { "health.hunger": -1 } });
        }
    },

    CharacterDrink: function () {
        if (Meteor.user().health.thirst > 0) {
            User.update({ $inc: { "health.thirst": -1 } });
        }
    },

    CharacterRead: function () {
        if (Meteor.user().activity.reading && Meteor.user().activity.reading.locked < new Date()) {
            var now = new Date();
            User.update({
                $set: { "activity.reading.locked": now.setSeconds(now.getSeconds() + Globals.readingTime) },
            });
        }

        Meteor.setTimeout(function () {
            User.update({ $inc: { "activity.reading.progress": 1 } });
            if (Meteor.user().activity.reading.progress >= 10) {
                var book = Item.get(Meteor.user().activity.reading.book);
                var skillInc = {};
                skillInc["mentalSkills."+book.skill] = book.skillIncrease;
                User.update({
                    $set: { "activity.reading": undefined },
                    $push: { "books.read": book.id },
                    $inc: skillInc,
                });
            }
        }, 1000 * Globals.readingTime);

    },

    CharacterStartBook: function (book) {

        if (Storage.hasItem(book, 1) && Meteor.user().books.read.indexOf(book) === -1) {
            console.log("Starting to read", book)
            var now = new Date();
            var reading = {
                book: book,
                locked: now.setSeconds(now.getSeconds() + Globals.readingTime),
                progress: 0
            };

            User.update({ $set: { "activity.reading": reading } });

            Meteor.setTimeout(function () {
                User.update({ $inc: { "activity.reading.progress": 1 } });
            });
        }
    },

    CharacterGo: function (dir) {
        var loc = Meteor.user().location,
            locTo = resolveDir(loc, dir);
            locationTo = Locations.get(locTo);

        if (locationTo && locationTo.accessible) {
            User.update({ $set: { location: locTo } });
        }

        if (Math.random() > 0.7) {
            Meteor.call("BattleRandomEncounter", locTo);
        }
    },
});