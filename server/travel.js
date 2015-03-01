


Meteor.methods({
    TravelArea: function (areaTo) {
        var loc = Meteor.user().location.split("|"),
            area = loc[0],
            town = loc[1];

        if (area === areaTo) throw new Meteor.Error("Already in this area");

        User.update({
            $set: {
                location: areaTo
            }
        });

        /* Implement delayed travel later
        // Replace with dynamic travel time!!
        var arrival = (new Date()).setSeconds((new Date()).getSeconds() + 5);

        User.update({
            $set: {
                travel: {
                    active: true,
                    area: area,
                    start: new Date(),
                    arrival: arrival,
                }
            }
        });
        */
    },

    TravelTown: function (townTo) {
        var loc = Meteor.user().location.split("|"),
            area = loc[0],
            town = loc[1];

        if (town === townTo) throw new Meteor.Error("Already in this town");

        User.update({
            $set: {
                location: area + "|" + townTo
            }
        });
    },
});


