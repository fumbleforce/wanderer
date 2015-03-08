


requiredEquipmentDep = new Tracker.Dependency();


Meteor.startup(function () {
    Meteor.autosubscribe(function() {
        BattleCollection.find({ party: { $elemMatch: { _id: Meteor.userId() }}}).observe({
            added: function(item){
                Session.set("userStatus", "combat");
                Meteor.setTimeout(function () { Meteor.call("BattleAIAction"); }, 1000);

            },
            removed: function () {
                Session.set("userStatus", "navigation");
            }
        });
        BattleCollection.find({ party: { $elemMatch: { _id: Meteor.userId() }}}).observeChanges({
            changed: function(id, fields){
                console.log("Changed", fields)
                if ("turn" in fields) {
                    Meteor.setTimeout(function () { Meteor.call("BattleAIAction"); }, 1000);
                }
            },
        });
    });
    Session.set("battleActive", false);
    Session.set("combatCategory", "none");
    Session.set("combatAction", "none");
    Session.set("combatTarget", "none");
});


Template.combat.helpers({
    combat: function () {
        return Battle.getActive();
    },

    combatLog: function () {
        Meteor.setTimeout(function () {
            $(".combat-log").scrollTop(999999999);
        }, 100);
        $(".combat-log").scrollTop(999999999);

        return Battle.getActive().log;
    },
});

Template.combat.events({

});

Template.combatNav.helpers({
    combat: function () {
        return Battle.getActive();
    },

    noAction: function () { return Session.get("combatCategory") === "none"; },
    physicalAction: function () { return Session.get("combatCategory") === "physical"; },
    magicalAction: function () { return Session.get("combatCategory") === "magical"; },
    itemsAction: function () { return Session.get("combatCategory") === "items"; },
    targetAction: function () { return Session.get("combatCategory") === "target"; },

    physicalActions: function () {
        requiredEquipmentDep.depend();
        console.log(Battle.me().physicalSpells)
        return _.filter(Battle.me().spells, function (id) {

            var spell = Spell.get(id);
            return spell.statType === "physical" && Spell.hasRequired(spell);
        });
    },

    magicalActions: function () {
        requiredEquipmentDep.depend();
        return _.filter(Battle.me().spells, function (id) {
            var spell = Spell.get(id);
            return spell.statType === "magical";
        });
    },

    itemsActions: function () {
        return Storage.getCategory("consumable");
    },

    playersTurn: function () {
        var battle = Battle.getActive();
        return battle.turnList[battle.turn].id === Meteor.userId();
    },
});

Template.combatNav.events({
    "click .combat-category": function (e, t) {
        var action = e.currentTarget.getAttribute("action");
        if (action === "flee") {
            Meteor.call("BattleTakeAction", {
                category: "flee",
                action: "flee",
                target: Meteor.userId(),
            });
        } else if (action === "leave") {
            Meteor.call("BattleEnd", Battle.getActive()._id);
            if (Meteor.user().location.split("|").length > 1) {
                Meteor.call("PartyStatus", "town");
                Session.set("userStatus", "town");
            } else {
                Meteor.call("PartyStatus", "navigation");
                Session.set("userStatus", "navigation");
            }
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
})