
/* Transaction

    time
    description
    amount
    sender
    receiver
    itemId
    quantity
    type

*/
TransactionCollection = new Meteor.Collection("transaction");



Meteor.methods({
    WalletSpend: function (opts) {
        var amount = +opts.amount;

        if (isNaN(amount))
            throw new Meteor.Error("Amount is Nan: ", opts.amount);

        opts.user = Meteor.userId();
        opts.time = new Date();

        if (amount > Meteor.user().coins)
            throw new Meteor.Error(413, "Not enough cash");

        if (amount < 0.1) return;

        opts.amount = -Math.abs(opts.amount);
        TransactionCollection.insert(opts);

        Meteor.users.update(Meteor.userId(),
            { $inc: { "coins": -amount } });

    },

    WalletEarn: function (opts) {
        var amount = opts.amount;

        opts.user = Meteor.userId();
        opts.time = new Date();

        if (amount < 0.1) return;

        TransactionCollection.insert(opts);

        Meteor.users.update(Meteor.userId(),
            { $inc: { "coins": amount } });
    }
});