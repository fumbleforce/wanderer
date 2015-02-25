Session.set("isNotSystem", false);
Session.set("msgCount", 0);

Meteor.subscribe("message", Session.get("room"));

UI.registerHelper("isAdmin", function (name) {
    return name === "admin";
})

var updateTimeDep = new Tracker.Dependency();

Template.chat.helpers({
    roomname: function () {
        return Session.get("roomname");
    },

    isNotSystem: function () {
        console.log("isnotsyustem",Session.get("isNotSystem"))
        return Session.get("isNotSystem");
    },
    messages: function () {
        updateTimeDep.depend();
        var count = Message.find({ room: Meteor.user().location }).count();
        if (count != Session.get("msgCount")) {
            Session.set("msgCount", count);
            $(".room-id").css("background", "orange");
        }
        $(".messages").scrollTop(99999);
            
        return Message.find({ room: Meteor.user().location });
    },

    scrollBot: function () {
        if (Session.get("messagesRendered")) {
            console.log("scrolling")
            Meteor.setTimeout(function () {
                $(".messages").scrollTop($(".messages")[0].scrollHeight);
            }, 100);
        }
        return Session.get("messagesAdded");
    }
});

Template.chat.events({
    "mouseenter .chat-container": function () {
        console.log("clicked")
        $(".room-id").css("background", "green");
    },
    "keyup .writer input": function (e, tmp) {
        if (e.keyCode === 13) {
            Message.insert({
                message: tmp.find("input").value,
                client: Meteor.user().name,
                room: Meteor.user().location,
                time: new Date(),
            });
            tmp.find("input").value = "";
        }
    },
})


Meteor.startup(function () {
    Meteor.setInterval(function () {
        updateTimeDep.changed();
    }, 60000);
});