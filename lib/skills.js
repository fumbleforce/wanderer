Spell = {};

Spell.spells = {

    // Physical skills
    punch: {
        damage: 2,
        accuracy: 0.8,
        target: "enemy",
        statType: "physical",
        damageType: "physical",
        baseSkill: "unarmed",
        name: "Punch",
        scaling: {
            strength: { affects: "damage", val: 0.2 },
            unarmed: { affects: "damage", val: 0.1 },
        }
    },

    kick: {
        damage: 3,
        accuracy: 0.7,
        target: "enemy",
        statType: "physical",
        damageType: "physical",
        baseSkill: "unarmed",
        name: "Kick",
        scaling: {
            strength: { affects: "damage", val: 0.2 },
            unarmed: { affects: "damage", val: 0.1 },
        }
    },

    bite: {
        damage: 3,
        accuracy: 0.7,
        target: "enemy",
        statType: "physical",
        damageType: "physical",
        baseSkill: "unarmed",
        name: "Bite",
        scaling: {
            strength: { affects: "damage", val: 0.2 },
            unarmed: { affects: "damage", val: 0.1 },
        }
    },

    charge: {
        damage: 2,
        accuracy: 0.8,
        target: "enemy",
        statType: "physical",
        damageType: "physical",
        baseSkill: "unarmed",
        name: "Charge",
        effects: [{ id: "daze", chance: 0.3 }]
    },

    // Magical skills
    windPush: {
        damage: 2,
        accuracy: 0.8,
        target: "enemy",
        statType: "physical",
        damageType: "magical",
        baseSkill: "wind",
        name: "Wind Push"
    },

};

Spell.get = function (id, entity) {
    if (entity == undefined) {
        return Spell.spells[id];
    }

    var spell = Spell.spells[id],
        scale, playerStat = 0;

    spell.id = id;

    for (var skill in spell.scaling) {
        scale = spell.scaling[skill];
        
        if ("physicalSkills" in entity && skill in entity.physicalSkills) {
            playerStat = entity.physicalSkills[skill];
        } else if ("mentalSkills" in entity && skill in entity.mentalSkills) {
            playerStat = entity.mentalSkills[skill];
        } else if ("weaponSkills" in entity && skill in entity.weaponSkills) {
            playerStat = entity.weaponSkills[skill]
        } else if ("magicalSkills" in entity && skill in entity.magicalSkills) {
            playerStat = entity.weaponSkills[skill]
        }

        console.log("scale", scale);
        console.log("playerSkill", playerStat);
        console.log("affects", scale.affects);
        spell[scale.affects] += scale.val * playerStat
    }
    console.log(spell)
    return spell;
};