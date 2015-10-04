

Template.map.helpers({
    rows: function () {
        return Locations.asMap;
    },

    location: function () {
        console.log("Location")
        var backgroundSize = $(".map-img").css("background-size");
        if (!backgroundSize) {
            console.log(backgroundSize);
            return Meteor.user().location;
        }
        var imgSizeX = +backgroundSize.split("px ")[0],
            imgPosition = $(".map-img").css("background-position"),
            imgWidth = +$(".map-img").css("width").replace("px",""),
            imgHeight = +$(".map-img").css("height").replace("px","");
        var scale = 6624/imgSizeX;
        var tile = 32 * scale;
        var width = 32 * scale;
        var height = 32 * scale;
        var y = imgHeight - +Meteor.user().location.split("|")[1] * tile;
        var x = imgWidth - +Meteor.user().location.split("|")[0] * tile;
        var posX = x - (imgWidth / 2 +  tile/2);
        var posY = y - (imgWidth / 2 - tile/2);
        console.log("imgSizeX", imgSizeX, "imgPosition", imgPosition, "imgWidth", imgWidth, "imgHeight", imgHeight, "scale", scale, "posX", posX, "posY", posY, "x", x, "y", y);

        Meteor.setTimeout(function () {
            $(".map-img").css({
                "background-position": posX + "px "+posY+"px",
            });
            $(".map-img .player").css({
                left: (imgWidth/2-width/2)+"px",
                top: (imgHeight/2-height/2)+"px",
                width: width+"px",
                height: height+"px"
            });
        }, 100);

        return Meteor.user().location;
    }
});

