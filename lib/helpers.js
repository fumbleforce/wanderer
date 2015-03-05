asArray = function (obj) {
    var res = [];
    for (var k in obj) {
        var el = obj[k];
        el.id = k;
        res.push(el);
    }
    return res;
};

labelify = function (str) {
    if (str == undefined) return "[undefined]";
    var parts = str.replace(/([a-z])([A-Z])/g, '$1 $2')
    return parts[0].toUpperCase() + parts.slice(1);
};