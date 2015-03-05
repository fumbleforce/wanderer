NPC = {};

NPC.npcs = [

    {
        id: "erecusEldor",
        loc: "theMeadows|caldum",
    },

];



NPC.npcDict = {};
NPC.byLocation = {};

_.each(NPC.npcs, function (i, index) {
    if (!(i.loc in NPC.byLocation)) {
        NPC.byLocation[i.loc] = []
    }
    NPC.byLocation[i.loc].push(i);
    NPC.npcDict[i.id] = index;
});


NPC.get = function (id) {
    return NPC.npcs[NPC.npcDict[id]];
};