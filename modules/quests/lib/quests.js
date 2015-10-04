Quest = {};

Quest.quests = [
    {
        id: "simpleDelivery",
        npc: "erecusEldor",
        states: [
            {
                text: "I need you to deliver something for me. Go to Wildberry and talk to Speckles, he will reward you for your efforts",
                choices: [
                    {
                        choice: "Yes, I will",
                        effect: "startQuest",
                    },
                    {
                        choice: "No, not now",
                        effect: "cancel",
                    },
                ],
                gives: [
                    { id: "questItem", qty: 1 }
                ]
            },
            {
                text: "Deliver the package to Speckles in wildberry",
                choices: [
                    {
                        choice: "Deliver items",
                        effect: "completeQuest",
                    },
                    {
                        choice: "Return later",
                        effect: "cancel",
                    },
                ],
                requires: [
                    {
                        type: "items",
                        items: [
                            { id: "questItem", qty: 1, }
                        ]
                    },
                    {
                        type: "location",
                        loc: "theMeadows|wildberry"
                    }
                ],
                reward: [
                    { type: "item", id: "coin", qty: 100 },
                    { type: "skill", id: "charm", qty: 1 }
                ]               
            },
        ]
    },
    






];


Quest.questDict = {};
Quest.byNpc = {};

_.each(Quest.quests, function (i, index) {
    if (!(i.npc in Quest.byNpc)) {
        Quest.byNpc[i.npc] = [];
    }
    Quest.byNpc[i.npc].push(index);
    Quest.questDict[i.id] = index;
});



Quest.getByNpc = function (id) {
    return _.map(Quest.byNpc[id], function (q) {
        return Quest.quests[q];
    });
};

Quest.get = function (id) {
    return Quest.quests[Quest.questDict[id]];
};

Quest.hasRequired = function (id) {

    var quest = Meteor.user().quests[id],
        questData = Quest.get(id);

    var state = questData.states[quest.state];
        console.log("State: ", state)

    if (state.requires == undefined) {
        console.log("No requirements")
        return true;
    }
    for (var i = 0; i < state.requires.length; i++) {
        var req = state.requires[i];
        console.log("Needs to have", req)
        switch (req.type) {
            case "items":
                for (var j = 0; j < req.items.length; j++) {
                    var item = req.items[j];
                    if (!Storage.hasItem(item.id, item.qty)) {
                        console.log("Missing", item.id, "x", item.qty)
                        return false;
                    }
                }
                console.log("Have all items")
                break;
            case "location":
                if (Meteor.user().location != req.loc) {
                    console.log("In the wrong location")
                    return false;
                }
                console.log("In the right location")
                break;
            case "questCompleted":
                var q = Meteor.user().quests[req.quest];
                if (q == undefined) return false;
                if (!q.completed) return false;
                break;
        }
    }
    return true;
};