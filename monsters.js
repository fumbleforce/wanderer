


Monster = {},

Monster.monsters = {

    boar: {
        name: "Boar",
        health: {
            head: 10,
            body: 10,
        },
        danger: 0,
        habitat: ["forest"],
        skills: [
            { id: "charge", damage: 2, accuracy: 0.8 },
        ]
    },













};


Monster.find = function (opts) {
    var filtered = _.filter(Monster.monsters, function (el) { return el.danger == opts.danger; });
    filtered = _.filter(Monster.monsters, function (el) { return el.habitat.indexOf(opts.habitat) != -1; });
    return filtered;
};