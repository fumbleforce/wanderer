Session.set("equpmentChoiceSlot", false);

Template.equipment.helpers({
    equipmentChoices: function () {
        return Storage.getCategory(Session.get("equpmentChoiceSlot"));
    },

    equipmentChoosing: function () {
        return Session.get("equpmentChoiceSlot");
    }
});

Template.equipment.events({
    "click [slot]": function (e) {
        var slot = e.currentTarget.getAttribute("slot");

        console.log("slot:", slot);

        Session.set("equpmentChoiceSlot", slot);
    },

    "click .equipment": function (e) {
        var id = e.currentTarget.getAttribute("itemid");
        console.log("id:", id)
        
        Meteor.call("EquipmentSet", { id: id, slot: Session.get("equpmentChoiceSlot") });
        
        Session.set("equpmentChoiceSlot", false);
    },

})