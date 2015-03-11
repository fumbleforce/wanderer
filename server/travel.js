


Meteor.methods({

    TravelStart: function (opts) {
         var locTo = opts.loc,
            onPath = opts.onPath,
            look = opts.look,
            loc = Meteor.user().location.split("|"),
            area = loc[0],
            town = loc[1],
            travelTime = 0,
            areaTo, localTo;

        if (locTo in Locations.towns) {
            locTo = Locations.getTown(locTo).area + "|" + locTo;
        } else if (locTo in Locations.dungeons) {
            locTo = Locations.getDungeon(locTo).area + "|" + locTo;
        }

        if (locTo != undefined) {
            areaTo = locTo.split("|")[0],
            localTo = locTo.split("|")[1];
        } else {
            locTo = Meteor.user().location;
        }

        if (localTo != undefined) {
            // Travelling to a town
            travelTime = 30;
        } else if (areaTo != undefined) {
            // Travelling to an area
            travelTime = 60;
        } else {
            travelTime = 9999999;
        }

        console.log("Loc to:", locTo)

        var baseTime = travelTime;

        if (!onPath) {
            travelTime += baseTime;
        }

        _.each(look, function (val, look) {
            if (val) {
                travelTime += baseTime * 0.5;
            }
        });

        var arrival = (new Date()).setSeconds((new Date()).getSeconds() + travelTime);

        var party = PartyCollection.findOne({ members: Meteor.user().name });
        if (party == null) {
            console.log("No party");
            User.update({
                $set: {
                    travel: {
                        active: true,
                        locTo: locTo,
                        start: new Date(),
                        arrival: arrival,
                        onPath: onPath,
                        look: look,
                    }
                }
            });
        } else {
            console.log("Party travelling", party.members)

            Meteor.users.update(
                { name: { $in: party.members } },
                { $set: {
                    travel: {
                        active: true,
                        locTo: locTo,
                        start: new Date(),
                        arrival: arrival,
                        onPath: opts.onPath,
                        look: look,
                    }
                }},
                { multi: true }
            );
        }
    },

    TravelCancel: function () {
        var party = PartyCollection.findOne({ members: Meteor.user().name });
        if (party == null) {
            console.log("No party");
            User.update({
                $set: {
                    "travel.active": false
                }
            });
        } else {
            console.log("Party travelling", party.members)

            Meteor.users.update(
                { name: { $in: party.members } },
                { $set: {
                    "travel.active": false
                } },
                { multi: true }
            );
        }
    },

    TravelComplete: function () {
        if (!Meteor.user().travel.active) {
            throw new Meteor.Error("Not travelling")
        }

        var travel = Meteor.user().travel;

        if (travel.arrival > new Date()) {
            throw new Meteor.Error("Have not arrived yet")
        }

        var party = PartyCollection.findOne({ members: Meteor.user().name });
        if (party == null) {
            console.log("No party");
            User.update({
                $set: {
                    location: travel.locTo,
                    "travel.active": false
                }
            });
        } else {
            console.log("Party travelling", party.members)

            Meteor.users.update(
                { name: { $in: party.members } },
                { $set: {
                    location: travel.locTo,
                    "travel.active": false
                } },
                { multi: true }
            );
        }
    },


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


