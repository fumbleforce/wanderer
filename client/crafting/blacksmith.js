Session.set("blacksmithSchematic", false);

var forge = new ReactiveDict();
forge.set("addingHeat", false);
forge.set("addingOre", false);
forge.set("temp", 0);
forge.set("smeltProgress", 0);

var heatingInterval, smeltingInterval;

function startHeating () {
    Meteor.clearInterval(heatingInterval);
    heatingInterval = Meteor.setInterval(function () {
        var temp = forge.get("temp");
        if (forge.get("addingHeat") && temp < 2000) {
            forge.set("temp", temp+10);
        } else {
            if (temp > 0) {
                forge.set("temp", temp-5);
            }
        }

        if (Session.get("townStatus") != "facility") {
            Meteor.clearInterval(heatingInterval);
        }
    }, 200);
}

function startSmelting () {
    Meteor.clearInterval(smeltingInterval);
    smeltingInterval = Meteor.setInterval(function () {
        var temp = forge.get("temp"),
            progress = forge.get("smeltProgress");

        //Temporary smelt point
        var smeltPoint = 1000;

        if (!Storage.hasItem(Session.get("blacksmithOre"), 1)) {
            Session.set("blacksmithOre", false);
            forge.set("addingOre", false);
        } else if (forge.get("addingOre")) {
            var off = Math.floor(Math.abs(smeltPoint - temp) / 100);
            if (off < 10) {
                forge.set("smeltProgress", progress+(10-off));
                Meteor.call("BlacksmithSmeltConsume", { ore: Session.get("blacksmithOre") });
            }

            if (forge.get("smeltProgress") >= 100) {
                forge.set("smeltProgress", 0);
                Meteor.call("BlacksmithSmelt", { ore: Session.get("blacksmithOre") });
            }
        }

        if (Session.get("townStatus") != "facility") {
            Meteor.clearInterval(smeltingInterval);
        }
    }, 2000);
}




Template.blacksmith.helpers({
    blacksmith: function () {
        return Locations.getTown(Meteor.user().location).facilities.blacksmith;
    },

    materials: function () {
        return Storage.getCategory("material");
    },

    ores: function () {
        return Storage.getCategory("ore");
    },

    schematics: function () {
        return Storage.getCategory("blacksmithSchematic");
    },

    forgeLit: function () {
        return forge.get("temp") > 0;
    },

    activeSchematic: function () {
        if (!Session.get("blacksmithSchematic")) return;

        var schem = Item.get(Session.get("blacksmithSchematic"));
        return schem;
    },

    temp: function () {
        var temp = forge.get("temp");
        $(".fire").css("background-color", "rgb("+Math.floor(temp*0.25) + "," + Math.floor(temp*0.05) + "," + Math.floor(temp*0.05) + ")");
        return temp;
    },

    smeltProgress: function () {
        return forge.get("smeltProgress");
    },

    activeOre: function () {
        if (!Session.get("blacksmithOre")) return false;
        if (!Storage.hasItem(Session.get("blacksmithOre"), 1)) return false;
        var ore = Item.get(Session.get("blacksmithOre"));
        console.log(ore)
        var bar = Item.get(Crafting.smelting[ore.id]);
        return labelify(ore.id) + " -> " + labelify(bar.id);
    },
});

Template.blacksmith.events({
    "click [schematic]": function (e) {
        var schematic = e.currentTarget.getAttribute("schematic");
        Session.set("blacksmithSchematic", schematic);
    },

    "click [ore]": function (e) {
        var ore = e.currentTarget.getAttribute("ore");
        startSmelting();
        Session.set("blacksmithOre", ore);
    },

    "click .craft": function () {
        var schematic = Session.get("blacksmithSchematic");

        Meteor.call("BlacksmithCraft", schematic);
    },

    "click .ignite": function () {
        startHeating();
        forge.set("temp", 50);
    },

    "mouseenter .smelt": function () {
        forge.set("addingOre", true);
    },

    "mouseleave .smelt": function () {
        forge.set("addingOre", false);
    },

    "mouseenter .heat": function () {
        return forge.set("addingHeat", true);
    },

    "mouseleave .heat": function () {
        return forge.set("addingHeat", false);
    },
});