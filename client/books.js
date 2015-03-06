
var timeLeftDep = new Tracker.Dependency();
var timer;

Meteor.autorun(function () {
    if (Meteor.user() == undefined) return;

    if (Meteor.user().activity.reading && Meteor.user().activity.reading.finished > new Date()) {
        timer = Meteor.setInterval(function () { timeLeftDep.changed(); }, 1000);
    }
});

Template.uiBooks.helpers({
    books: function () {
        return _.filter(Storage.getCategory("book"), function (b) { return Meteor.user().books.read.indexOf(b.id) === -1; });
    },

    reading: function () {
        console.log(Meteor.user());
        return Meteor.user().activity.reading;
    },

    timeLeft: function () {
        timeLeftDep.depend();
        console.log("timeleft")
        if (Meteor.user().activity.reading) {
            var timeLeft = (new Date(Meteor.user().activity.reading.finished)).getSeconds() - (new Date()).getSeconds();
            if (timeLeft < 0) {
                return 0
            }
            return timeLeft;
        }
        return;
    },

    finished: function () {
        return Meteor.user().activity.reading.finished < new Date();
    },
})

Template.uiBooks.events({
    "click .read": function (e) {
        var book = e.currentTarget.getAttribute("book");
        Meteor.call("BookStart", book);
        timer = Meteor.setInterval(function () { timeLeftDep.changed(); }, 1000);

    },

    "click .finish": function (e) {
        Meteor.clearInterval(timer);
        var book = e.currentTarget.getAttribute("book");
        Meteor.call("BookFinish");
    }
});
