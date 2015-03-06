Meteor.startup(function () {

});

Meteor.methods({

    BookFinish: function () {
        if (Meteor.user().activity.reading.finished < new Date()) {

            var book = Item.get(Meteor.user().activity.reading.book);
            var skillInc = {};
            var push = {
                "books.read": book.id
            };

            if (book.skill) {
                skillInc["mentalSkills."+book.skill] = book.skillIncrease;
            }
            if (book.spell) {
                push["spells"] = book.spell;
            }

            User.update({
                $unset: { "activity.reading": "" },
                $push: push,
                $inc: skillInc,
            });
        }
    },

    BookStart: function (book) {

        if (Storage.hasItem(book, 1) && Meteor.user().books.read.indexOf(book) === -1) {
            console.log("Starting to read", book);
            var bookData = Item.get(book);
            var now = new Date();
            var reading = {
                book: book,
                finished: now.setSeconds(now.getSeconds() + bookData.readingTime),
            };

            User.update({ $set: { "activity.reading": reading } });

        }
    },
})