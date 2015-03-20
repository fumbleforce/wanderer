Session.set("msgCount", 0);
Session.set("chatChannel", "local");

Meteor.subscribe("message", Session.get("room"));

UI.registerHelper("isAdmin", function (name) {
    return name === "admin";
})

var updateTimeDep = new Tracker.Dependency();

var channels = [
    { id: "local", active: false, visible: true },
    { id: "global", active: false, visible: true },
    { id: "party", active: false, visible: false },
];

Template.chat.helpers({
    /* Name of the current room */
    roomname: function () {
        return Session.get("roomname");
    },

    /* Messages
    
    Return the messages for the current room.
    
    {
        String client: Username of sender
        String message: The message 
    }
    */
    messages: function () {
        updateTimeDep.depend();
        var count = Message.find({ room: Meteor.user().location }).count();
        
        if (count != Session.get("msgCount")) {
            Session.set("msgCount", count);
            $(".room-id").css("background", "orange");
        }
        
        $(".messages").scrollTop(99999);

        switch (Session.get("chatChannel")) {
            case "local":
                return Message.find({ room: Meteor.user().location });
            case "party":
                return Message.find({
                    room: Party.get()._id
                });
            case "global":
                return Message.find({ room: "global" });
        }

    },

    /* Scroll bottom

    Scrolls the chat to bottom on update.
    */
    scrollBot: function () {
        if (Session.get("messagesRendered")) {
            console.log("scrolling")
            Meteor.setTimeout(function () {
                $(".messages").scrollTop($(".messages")[0].scrollHeight);
            }, 100);
        }
        return Session.get("messagesAdded");
    },

    /* Channels
    
    Return a list of channel labels that
    are sued for buttons.
    */
    channels: function () {
        var party = Party.get();

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

    /* Submit message
    
    Takes the current message in the input
    and inserts it when user clicks Enter key.
    */
    "keyup .writer input": function (e, tmp) {
        if (e.keyCode === 13) {

            var channel = Session.get("chatChannel"),
                room = "";

            if (channel === "party") {
                room = Party.get()._id;
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

    /* Channel toggle
    
    Handles the switching of chat channels.
    */
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
    /* Update the "time ago" label for each message */
    Meteor.setInterval(function () {
        updateTimeDep.changed();
    }, 60000);
});