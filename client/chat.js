Session.set("isNotSystem", false);
Session.set("msgCount", 0);
Session.set("chatChannel", "local");

Meteor.subscribe("message", Session.get("room"));

UI.registerHelper("isAdmin", function (name) {
    return name === "admin";
})

var updateTimeDep = new Tracker.Dependency();

var channels = [
    { id: "local", active: false, visible: true },
    { id: "party", active: false, visible: false },
];

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

        if (Session.get("chatChannel") === "local") {
            return Message.find({ room: Meteor.user().location });
        } else if (Session.get("chatChannel") === "party") {
            return Message.find({
                room: PartyCollection.findOne({
                    members: Meteor.user().name
                })._id
            });
        }

    },

    scrollBot: function () {
        if (Session.get("messagesRendered")) {
            console.log("scrolling")
            Meteor.setTimeout(function () {
                $(".messages").scrollTop($(".messages")[0].scrollHeight);
            }, 100);
        }
        return Session.get("messagesAdded");
    },

    channels: function () {
        var party = PartyCollection.findOne({
            members: Meteor.user().name
        });

        _.each(channels, function (c, i) {
            if (c.id === "party") {
                if (party != null) {
                    channels[i].visible = true;
                } else {
                    channels[i].visible = false;
                }
            }
            if (c.id === Session.get("chatChannel")) {
                channels[i].active = true;
            }
        });

        return channels;
    },
});

Template.chat.events({
    "mouseenter .chat-container": function () {
        console.log("clicked")
        $(".room-id").css("background", "green");
    },
    "keyup .writer input": function (e, tmp) {
        if (e.keyCode === 13) {

            var channel = Session.get("chatChannel"),
                room = "";

            if (channel === "party") {
                room = PartyCollection.findOne({
                    members: Meteor.user().name
                })._id;
            } else if (channel === "local") {
                room = Meteor.user().location;
            }

            Message.insert({
                message: tmp.find("input").value,
                client: Meteor.user().name,
                room: room,
                time: new Date(),
            });
            tmp.find("input").value = "";
        }
    },

    "click [chat]": function (e) {
        var chat = e.currentTarget.getAttribute("chat");
        Session.set("chatChannel", chat);

        _.each(channels, function (c, i) {
            if (c.id === Session.get("chatChannel")) {
                channels[i].active = true;
            } else {
                channels[i].active = false;
            }
        });
    },
})


Meteor.startup(function () {
    Meteor.setInterval(function () {
        updateTimeDep.changed();
    }, 60000);
});