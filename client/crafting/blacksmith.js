Session.set("blacksmithSchematic", false);

var redrawDep = new Tracker.Dependency();
var forge = new ReactiveDict();

forge.set("addingHeat", false);
forge.set("addingOre", false);
forge.set("temp", 0);
forge.set("smeltProgress", 0);
forge.set("alloy", "{}");
forge.set("craftedWidth", 0);
forge.set("craftedHeight", 0);
forge.set("sharpness", 0);
forge.set("hardness", 0);
forge.set("quality", 0);

var heatingInterval, smeltingInterval;
var alloyChart;

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
            var off = Math.floor(Math.abs(smeltPoint - temp) / 100),
                smeltAdd = 10-off,
                ore = Session.get("blacksmithOre"),
                alloy = JSON.parse(forge.get("alloy"));

            if (off < 10) {
                if (!(ore in alloy)) alloy[ore] = 0;
                smeltAdd *= 2;
                alloy[ore] += smeltAdd;
                forge.set("alloy", JSON.stringify(alloy));
                forge.set("smeltProgress", progress+smeltAdd);
                Meteor.call("BlacksmithSmeltConsume", { ore: ore });
                buildAlloyPie();
            }

            if (forge.get("smeltProgress") >= 100) {
                forge.set("smeltProgress", 0);
                forge.set("alloy", "{}");
                Meteor.call("BlacksmithSmelt", {
                    ore: Session.get("blacksmithOre"),
                    alloy: alloy
                });
            }
        }

        if (Session.get("townStatus") != "facility") {
            Meteor.clearInterval(smeltingInterval);
        }
    }, 2000);
}

function buildAlloyPie () {
    var alloy = JSON.parse(forge.get("alloy"));
    var alloyColors = {
        "ironOre": "red",
        "copperOre": "gold",
    };
    var data = _.map(alloy, function (el, key) {
        return [Util.labelify(key), el];
    });
    console.log(data)

    if (alloyChart != undefined) {
        $('#alloy-pie').highcharts().series[0].update({
            type: 'pie',
            name: 'Metal',
            data: data
        });
        return;
    }

    alloyChart = $('#alloy-pie').highcharts({
        chart: {
            chartBackgroundColor: "transparent",
            backgroundColor: "transparent",
            plotBorderWidth: null,
            plotShadow: false
        },

        title: {
            text: ''
        },

        credits: {
            enabled: false
        },

        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },

        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: false
            }
        },

        series: [{
            type: 'pie',
            name: 'Metal',
            data: data
        }]
    });
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

    forge: function (field) {
        return forge.get(field);
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
        var bar = Item.get(Crafting.smelting[ore.id]);
        return Util.labelify(ore.id) + " -> " + Util.labelify(bar.id);
    },

    /* craftedStyle

    Returns the dimensions of the item being crafted.
    */
    craftedStyle: function () {
        return "width:"+forge.get("craftedWidth")+"px; height:"+forge.get("craftedHeight")+"px;";
    }

});

Template.blacksmith.events({

    /* wepType

    Select the type of blade to be created
    */
    "click [weptype]": function (e) {
        var weptype = e.currentTarget.getAttribute("weptype");

        forge.set("craftedWidth", 50);
        forge.set("craftedHeight", 25);

        forge.set("wepType", weptype);
    },

    "click .hammer": function (e) {
        var height = forge.get("craftedHeight"),
            width = forge.get("craftedWidth"),
            sharpness = forge.get("sharpness"),
            hardness = forge.get("hardness"),
            quality = forge.get("quality");

        forge.set("craftedWidth", width*1.02);
        forge.set("craftedHeight", height*0.98);

        forge.set("sharpness", sharpness+0.01);
        forge.set("hardness", hardness+0.5);
        forge.set("quality", (sharpness+0.01)*(hardness+0.5));
    },

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