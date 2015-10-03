Util = {};


Util.randomString = function (length, opts) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    opts = opts || {};
    length = length || 10;
    
    var lowerCase = opts.lowerCase || false;

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    if (lowerCase) {
        text = text.toLowerCase();
    }
    
    return text;
};