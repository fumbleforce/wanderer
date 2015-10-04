
ActionLog = Astro.Class({
    name: "ActionLog",
    collection: new Mongo.Collection(null),
    
    fields: {
        message: {
            type: "string",
        },
        sender: {
            type: "string"
        },
        channel: {
            type: "string"   
        },
        createdAt: {
            type: "date",
            immutable: true,
        }
    },
    
    events: {
        beforeInsert: function () {
            this.createdAt = new Date();
        }
    }
});