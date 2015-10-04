

OnlineMessage = Astro.Class({
    name: "OnlineMessage",
    collection: new Mongo.Collection("message"),
    
    fields: {
        message: {
            type: "string",
        },
        client: {
            type: "string"
        },
        room: {
            type: "string"   
        },
        createdAt: {
            type: "date",
            immutable: true,
        }
    },
    
    methods: {
        timeAgo: function () {
            return moment(this.createdAt).fromNow(true);
        }
    },
    
    events: {
        beforeInsert: function () {
            this.createdAt = new Date();
        }
    }
});