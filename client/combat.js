


Meteor.autosubscribe(function() {
    BattleCollection.find({ party: { $elemMatch: { _id: Meteor.userId() }}}).observe({
        added: function(item){
            Session.set("userStatus", "combat");
        },
        removed: function () {
            Session.set("userStatus", "walking");
        }
    });
});



Meteor.startup(function () {
    Session.set("battleActive", false);
    Session.set("combatCategory", "none");
    Session.set("combatAction", "none");
    Session.set("combatTarget", "none");
});


Template.combat.helpers({
    combat: function () {
        return Battle.getActive();
    },

    playersTurn: function () {
        return Battle.getActive().turn === "party";
    },

    noAction: function () { return Session.get("combatCategory") === "none"; },
    physicalAction: function () { return Session.get("combatCategory") === "physical"; },
    magicalAction: function () { return Session.get("combatCategory") === "magical"; },
    itemsAction: function () { return Session.get("combatCategory") === "items"; },
    targetAction: function () { return Session.get("combatCategory") === "target"; },

    physicalActions: function () {
        console.log(Battle.me().physicalSpells)
        return _.map(Battle.me().physicalSpells, function (id) { return Spell.get(id, Battle.me()); });
    },

    magicalActions: function () {
        return _.map(Battle.me().magicalSpells, function (id) { return Spell.get(id, Battle.me()); });
    },

    itemsActions: function () {
        return [
            { id: "hpPot1", label: "Health Potion" },
            { id: "mpPot1", label: "Mana Potion" },
        ]
    },

    combatLog: function () {
        Meteor.setTimeout(function () {
            $(".combat .log").scrollTop(999999999);
        }, 500);

        return Battle.getActive().log;
    },
});

Template.combat.events({
    "click .combat-category": function (e, t) {
        var action = e.currentTarget.getAttribute("action");
        if (action === "flee") {
            Meteor.call("BattleTakeAction", {
                category: "flee",
                action: "flee",
                target: Meteor.userId(),
            });
        } else {
            Session.set("combatCategory", action);
        }
    },

    "click .combat-action": function (e) {
        var action = e.currentTarget.getAttribute("action");
        console.log(action);
        Session.set("combatAction", action);
        Session.set("combatCategory", "target");
    },

    "click .target-action": function (e) {
        var target = e.currentTarget.getAttribute("target");
        console.log(target);
        Session.set("combatTarget", target);
        Session.set("combatCategory", "none");

        Meteor.call("BattleTakeAction", {
            category: Session.get("combatCategory"),
            action: Session.get("combatAction"),
            target: Session.get("combatTarget"),
        });

        Session.set("combatTarget", "none");
        Session.set("combatAction", "none");
    },
});

