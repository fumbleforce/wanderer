Template.quest.onCreated(function () {
    this.questLogSelected = new ReactiveVar(false);
});

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
    },

    "click [action]": function (e) {
        var action = e.currentTarget.getAttribute("action");

        switch (action) {
            case "people":
                Session.set("townStatus", "people");
                break;
        }
    }
});

Template.questLog.helpers({
    quest: function () {
        var questLogSelected = Template.instance().questLogSelected.get();
        
        var quest = Meteor.user().quests[questLogSelected],
            questData = Quest.get(questLogSelected);


        return _.extend(quest, questData.states[quest.state]);
    },

    haveRequired: function () {
        return Quest.hasRequired(Template.instance().questLogSelected.get());
    },

    quests: function () {
        var quests = Meteor.user().quests;

        return _.map(quests, function (q, key) {
            return _.extend(q, Quest.get(key));
        });
    }
});

Template.questLog.events({
    "click [quest]": function (e, instance) {
        var questId = e.currentTarget.getAttribute("quest");
        instance.questLogSelected.set(questId);
    },

    "click .list": function (e, instance) {
        instance.questLogSelected.set(false);
    },

    "click .abandon": function (e, instance) {
        Meteor.call("QuestAbandon",  instance.questLogSelected.get());
        instance.questLogSelected.set(false);
    },

    "click [choice]": function (e, instance) {
        var choiceId = e.currentTarget.getAttribute("choice"),
            quest = Meteor.user().quests[instance.questLogSelected.get()],
            questData = Quest.get(instance.questLogSelected.get());

        var choice = questData.states[quest.state].choices[choiceId];

        if (choice.effect != undefined) {
            switch (choice.effect) {
                case "cancel":
                    instance.questLogSelected.set(false);
                    break;
                case "completeQuest":
                    Meteor.call("QuestComplete", instance.questLogSelected.get());
                    break;
            }
        }
    }
})