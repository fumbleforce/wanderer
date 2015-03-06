Spell = {};


/*
damage: Base amount of damage done
accuracy: chance of hit
target: What the spell will target, friend or enemy
damageType: The type of damage done
baseSkill: The skill that will increase on use
scaling: How the spell will scale with different stats

*/
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

    stab: {
        damage: 3,
        accuracy: 0.7,
        target: "enemy",
        statType: "physical",
        damageType: "physical",
        baseSkill: "daggers",
        requires: {
            weapon: { type: "dagger" },
            skill: { id: "daggers", value: 10 }
        },
        scaling: {
            strength: { affects: "damage", val: 0.2 },
            daggers: { affects: "damage", val: 0.1 },
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
        statType: "magical",
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

    if (spell.name == undefined) {
        spell.name = labelify(spell.id);
    }

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

skillType = function (id) {
    var user = Meteor.user();

    if (id in user.physicalSkills) return "physicalSkills";
    if (id in user.mentalSkills) return "mentalSkills";
    if (id in user.craftingSkills) return "craftingSkills";
    if (id in user.spellSkills) return "spellSkills";
    if (id in user.weaponSkills) return "weaponSkills";
};

Spell.hasRequired = function (spell) {
    var user = Meteor.user();

    if (spell.requires == undefined) return true;

    var missingReq = false;

    _.each(spell.requires, function (el, key) {
        if (missingReq) return;
        console.log("Requires", el)
        switch (key) {
            case "weapon":
                console.log("weapon")
                // Check that the required weapon type is equipped
                var type = el.type,
                    leftItem = Item.get(user.equipment.leftHand),
                    rightItem = Item.get(user.equipment.rightHand);
                
                if (leftItem == undefined && rightItem == undefined) {
                    missingReq = true;
                    return;
                }

                var inLeft = leftItem && leftItem.weaponType === type,
                    inRight = rightItem && rightItem.weaponType === type;

                if (!(inRight || inLeft)) {
                    missingReq = true;
                    return
                }
                break;
            case "skill":
                console.log("skill")
                // Check that user has the required skill level
                var skill = el.id,
                    value = el.value,
                    type = skillType(skill);
                if (user[type][skill] < value) {
                    missingReq = true;
                    return;
                }
                break; 
        }
    });


    return !missingReq;
};