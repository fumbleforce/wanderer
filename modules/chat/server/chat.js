 Meteor.startup(function () {
    // code to run on server at startup
});

Meteor.publish('message', function(room) {
    return OnlineMessage.find({});
});

OnlineMessage.getCollection().allow({
    insert: function (userId, msg) {
        console.log(msg)
        if (msg.room === "system") {
            console.log(msg.room, "is system")
            return msg.client === "admin";
        }
        return true;
    },
});