
Template.uiBooks.helpers({
    books: function () {
        return _.filter(Storage.getCategory("book"), function (b) { return Meteor.user().books.read.indexOf(b.id) === -1; });
    },
    reading: function () {
        console.log(Meteor.user());
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
