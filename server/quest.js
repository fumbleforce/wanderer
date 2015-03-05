Meteor.methods({
    QuestStart: function (id) {
        if (!("quests") in Meteor.user()) {
            Meteor.user().quests = {};
        }

        if (id in Meteor.user().quests) {
            throw new Meteor.Error("Already on quest");
        }

        console.log("Accepted quest", id);
        // TODO Check requirements

        var quests = Meteor.user().quests,
            quest = Quest.get(id),
            update = {};

        update["quests."+id] = {
            state: 1,
            completed: false
        };

        User.update({
            $set: update
        });

        if (quest.states[0].gives != undefined) {
            Meteor.call("StorageAddMultiple", quest.states[0].gives);
        }
    },

    QuestAbandon: function (id) {
        var update = {};

        update["quests."+id] = "";

        User.update({
            $unset: update
        });
    },

    QuestComplete: function (id) {
        var quest = Meteor.user().quests[id];

        if (quest == undefined) {
            throw new Meteor.Error("Not on this quest");
        }

        var questData = Quest.get(id),
            state = questData.states[quest.state];

        if (!Quest.hasRequired(id)) {
            throw new Meteor.Error("Do not have what is required to complete quest");
        }

        //Remove required items
        var requiredItems =  _.filter(state.requires, function (el) {
            return el.type === "items";
        });

        requiredItems = _.flatten(_.map(requiredItems, function (el) {
            return el.items;
        }));

        Meteor.call("StorageRemoveMultiple", requiredItems);

        if (state.reward) {
            for (var i = 0; i < state.reward.length; i++) {
                var rew = state.reward[i];

                switch (rew.type) {
                    case "item":
                        Meteor.call("StorageAdd", { id: rew.id, qty: rew.qty });
                        break;
                    case "skill":
                        var inc = {};
                        if (rew.id in Meteor.user().physicalSkills) {
                            inc["physicalSkills."+rew.id] = rew.qty;
                        } else if (rew.id in Meteor.user().mentalSkills) {
                            inc["mentalSkills."+rew.id] = rew.qty;
                        } else if (rew.id in Meteor.user().weaponSkills) {
                            inc["weaponSkills."+rew.id] = rew.qty;
                        } else if (rew.id in Meteor.user().craftingSkills) {
                            inc["craftingSkills."+rew.id] = rew.qty;
                        }
                        User.update({ $inc: inc });
                        break;
                    case "spell":
                        var s = Spell.get(rew.id);
                        if (s.statType === "physical" && Meteor.user().physicalSpells.indexOf(rew.id) === -1) {
                            User.update({ $push: { physicalSpells: rew.id } });
                        } else if (s.statType === "magical" && Meteor.user().magicalSpells.indexOf(rew.id) === -1) {
                            User.update({ $push: { magicalSpells: rew.id } });
                        }
                        break;
                }
            }
        }

        if (quest.state == questData.states.length-1) {
            // Final state
            var set = {};
            set["quests."+id+".completed"] = true;
            User.update({ $set: set });
        } else {
            // Not in final state
            var inc = {};
            inc["quests."+id+".state"] = 1;
            User.update({ $inc: inc });
        }
    },
})