


Meteor.methods({
    TravelArea: function (areaTo) {
        var loc = Meteor.user().location.split("|"),
            area = loc[0],
            town = loc[1];

        console.log("Travelling to", areaTo);

        var party = PartyCollection.findOne({ members: Meteor.user().name });
        if (party == null) {
            console.log("No party");
            User.update({
                $set: {
                    location: areaTo
                }
            });
        } else {
            console.log("Party travelling", party.members)

            Meteor.users.update(
                { name: { $in: party.members } },
                { $set: { location: areaTo } },
                { multi: true }
            );
        }


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

        var party = PartyCollection.findOne({ members: Meteor.user().name });
        if (party == null) {
            console.log("No party");
            User.update({
                $set: {
                    location: area + "|" + townTo
                }
            });
        } else {
            console.log("Party travelling", party.members)

            Meteor.users.update(
                { name: { $in: party.members } },
                { $set: { location: area + "|" + townTo } },
                { multi: true }
            );
        }
    },
});


