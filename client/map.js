

Template.map.helpers({
    rows: function () {
        return Locations.asMap;
    },

    location: function () {
        var scale = 1000/6624;
        var tile = 32 * scale;
        var width = 32 * scale;
        var height = 32 * scale;
        var y = Meteor.user().location.split("|")[1] * tile;
        var x = Meteor.user().location.split("|")[0] * tile;

        Meteor.setTimeout(function () {
            $(".map-img .player").css({
                left: x+"px",
                top: y+"px",
                width: width+"px",
                height: height+"px"
            });
        }, 100);

        return Meteor.user().location;
    }
});

