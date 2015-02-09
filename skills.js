Spell = {};

Spell.spells = {

    // Physical skills
    punch: {
        damage: 2,
        accuracy: 0.8,
        target: "enemy",
        type: "physical",
        name: "Punch",
        scaling: {
            strength: { affects: "damage", val: 0.2 }
        }
    },

    kick: {
        damage: 3,
        accuracy: 0.7,
        target: "enemy",
        type: "physical",
        name: "Kick",
        scaling: {
            strength: { affects: "damage", val: 0.2 }
        }
    },

    charge: {
        damage: 2,
        accuracy: 0.8,
        target: "enemy",
        type: "physical",
        name: "Charge",
        effects: [{ id: "daze", chance: 0.3 }]
    },

    // Magical skills
    windPush: {
        damage: 2,
        accuracy: 0.8,
        target: "enemy",
        type: "magical",
        name: "Wind Push"
    },

};

Spell.get = function (id, player) {
    if (player == undefined) {
        return Spell.spells[id];
    }

    var spell = Spell.spells[id],
        scale, playerSkill;

    spell.id = id;

    for (var skill in spell.scaling) {
        scale = spell.scaling[skill];
        if (spell.type === "physical") {
            playerSkill = player.physicalSkills[skill];
        } else if (spell.type === "magical") {
            playerSkill = player.mentalSkills[skill];
        }
        console.log("scale", scale);
        console.log("playerSkill", playerSkill);
        console.log("affects", scale.affects);
        spell[scale.affects] += spell[scale.affects] * scale.val * playerSkill
    }
    console.log(spell)
    return spell;
};