
Template.registerHelper("isAdmin", function (name) {
    return name === "admin";
})

var channels = [
    { id: "local", active: false, visible: true },
    { id: "global", active: false, visible: true },
    { id: "party", active: false, visible: false },
];

Template.chat.onCreated(function () {
    this.room = new ReactiveVar("local");
    
    OnlineMessage.getCollection().find().observe({
        added: (item) => {
            $(".chat.online .messages").scrollTop(99999);
            setTimeout(() => {
                $(".chat.online .messages").scrollTop(99999);
            }, 100);
        }
    });
    
    Meteor.subscribe("message", this.room.get());
});


Template.chat.onRendered(function () {
    this.rendered = true;
});

Template.chat.helpers({
    /* Name of the current room */
    room: function () {
        return Template.instance().room.get();
    },
    
    activeRoom: function (room) {
        console.log("is", room, "active?", Template.instance().room.get() === room );
        return Template.instance().room.get() === room ? "active" : "";
    },

    /* Messages
    
    Return the messages for the current room.
    
    {
        String client: Username of sender
        String message: The message 
    }
    */
    onlineMessages: function () {
        
        switch (Template.instance().room.get()) {
            case "local":
                return OnlineMessage.find({ room: Meteor.user().location });
                break;
            case "party":
                return OnlineMessage.find({
                    room: Party.get()._id
                });
                break;
            case "global":
                console.log("Online is global");
                return OnlineMessage.find({ room: Template.instance().room.get() });
                break;
        }

    },
    
    localMessages: function () {
        if (!Template.instance().rendered) return;
        
        Template.instance().$(".messages").scrollTop(99999);

        return LocalMessage.find({  });
    },


    /* Scroll bottom

    Scrolls the chat to bottom on update.
    */
    scrollBot: function () {
        if (!Template.instance().rendered) return;
        
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

        return channels;
    },
});

Template.chat.events({

    /* Submit message
    
    Takes the current message in the input
    and inserts it when user clicks Enter key.
    */
    "keyup .writer textarea": function (e, tmp) {
        // Enter key
        if (e.keyCode === 13) {
            
            var room = Template.instance().room.get();
            
            if (room === "local") {
                room = Meteor.user().location;
            }

            OnlineMessage.insert({
                message: tmp.find("textarea").value,
                client: Meteor.user().name,
                room: room,
            });
            
            tmp.find("textarea").value = "";
        }
    },

    /* Channel toggle
    
    Handles the switching of chat channels.
    */
    "click [chat]": function (e, t) {
        var chat = e.currentTarget.getAttribute("chat");
        t.room.set(chat);
    },
})

