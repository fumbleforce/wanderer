Message = new Mongo.Collection("message", {
    transform: function(entry) {
        entry.timestamp = function() {
            var diffMs = (new Date() - entry.time); // milliseconds between now & Christmas
            var diffDays = Math.round(diffMs / 86400000); // days
            var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
            var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
            if (diffDays >= 1)
                return diffDays + " days";
            else if (diffHrs > 1)
                return diffHrs + " hours";
            else
                return diffMins + " min";
        };
        return entry;
    }
});