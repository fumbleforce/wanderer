

Template.map.helpers({
    rows: function () {
        return Locations.asMap;
    },

    location: function () {
        $(".map [player=true]").html("");
        $(".map [loc='"+Meteor.user().location+"']")
                .html("<span>o</span>")
                .attr("player", true);
        Meteor.setTimeout(function () {
            $(".map [loc='"+Meteor.user().location+"']")
                .html("<span>o</span>")
                .attr("player", true);
        }, 1000);

        return Meteor.user().location;
    }
});

