
Template.registerHelper('toArray',function(obj) {
    result = [];
    for (var k in obj) result.push({key:k, value:obj[k]});
    return result;
});

Template.registerHelper('addIndex', function (all) {
    return _.map(all, function(val, index) {
        val.index = index;
        return val;
    });
});

Template.registerHelper("diff", function (ctx) {
    return ctx["arg1"] - ctx["arg2"];
});

Template.registerHelper("floor", function (num) {
    return Math.floor(num);
});

Template.registerHelper("percent", function (ctx) {
    return Math.floor(100* ctx.hash["arg1"] / ctx.hash["arg2"]);
});

Template.registerHelper("equals", function (ctx) {
    return ctx.hash["arg1"] === ctx.hash["arg2"];
});

Template.registerHelper("labelify", labelify);

Template.registerHelper("itemLink", function (id) {
    var i = Item.get(id);
    return "<span class='itemlink "+Item.quality[i.quality]+"' title='"+i.desc+"' data-toggle='tooltip'>"+labelify(id)+"</span>";
});

Template.registerHelper("spellLink", function (id) {
    return"<span class='spellLink'>"+labelify(id)+"</span>";
});

Template.registerHelper("skillLink", function (id) {
    return "<span class='skillLink'>"+labelify(id)+"</span>";
});

Template.registerHelper('session',function(input) {
    return Session.get(input);
});
