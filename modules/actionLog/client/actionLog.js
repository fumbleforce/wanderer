const channels = [
    "dialogue",
    "travel",
    "combat"
];

Template.actionLog.onCreated(function () {
    this.activeChannels = new ReactiveVar(channels);
});

Template.actionLog.onDestroyed(function () {

});

Template.actionLog.onRendered(function () {

});

Template.actionLog.helpers({
    logMessages: function () {
        return ActionLog.find();
    },
    
    channels: function () {
        return channels;
    },
    
    activeChannel: function (c) {
        return _.contains(Template.instance().activeChannels.get(), c) ? "active" : "";
    }
});

Template.actionLog.events({
    "click [channel]": (e, t) => {
        let channel = e.currentTarget.getAttribute("channel");
        
        let activeChannels = t.activeChannels.get();
        
        if (_.contains(activeChannels, channel)) {
            t.activeChannels.set(_.without(activeChannels, channel));
        } else {
            activeChannels.push(channel)
            t.activeChannels.set(activeChannels);
        }
    },
});

logAction = function (channel, sender, message) {
    ActionLog.insert({
        channel: channel,
        sender: sender,
        message: message
    });
};