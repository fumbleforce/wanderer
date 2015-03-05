Session.set("questLogSelected", false);

Template.quest.helpers({
    quest: function () {
        return Quest.get(Session.get("activeQuest")).states[0];
    },
});

Template.quest.events({
    "click [choice]": function (e) {
        var choiceId = e.currentTarget.getAttribute("choice"),
            quest = Quest.get(Session.get("activeQuest"));

        var choice = quest.states[0].choices[choiceId];

        if (choice.effect != undefined) {
            switch (choice.effect) {
                case "cancel":
                    Session.set("activeQuest", false);
                    break;
                case "startQuest":
                    Meteor.call("QuestStart", Session.get("activeQuest"));
                    Session.set("activeQuest", false);
                    break;
            }
        }
    }
});

Template.questLog.helpers({
    quest: function () {
        var quest = Meteor.user().quests[Session.get("questLogSelected")],
            questData = Quest.get(Session.get("questLogSelected"));


        return _.extend(quest, questData.states[quest.state]);
    },

    haveRequired: function () {
        return Quest.hasRequired(Session.get("questLogSelected"));
    },

    quests: function () {
        var quests = Meteor.user().quests;

        return _.map(quests, function (q, key) {
            return _.extend(q, Quest.get(key));
        });
    }
});

Template.questLog.events({
    "click [quest]": function (e) {
        var questId = e.currentTarget.getAttribute("quest");

        Session.set("questLogSelected", questId);
    },

    "click .list": function () {
        Session.set("questLogSelected", false);
    },

    "click .abandon": function () {
        Meteor.call("QuestAbandon", Session.get("questLogSelected"));
        Session.set("questLogSelected", false);
    },

    "click [choice]": function (e) {
        var choiceId = e.currentTarget.getAttribute("choice"),
            quest = Meteor.user().quests[Session.get("questLogSelected")],
            questData = Quest.get(Session.get("questLogSelected"));

        var choice = questData.states[quest.state].choices[choiceId];

        if (choice.effect != undefined) {
            switch (choice.effect) {
                case "cancel":
                    Session.set("questLogSelected", false);
                    break;
                case "completeQuest":
                    Meteor.call("QuestComplete", Session.get("questLogSelected"));
                    break;
            }
        }
    }
})