const Client = require('./lib/client');

module.exports = function () {
    const accesslist = ['getblockchaininfo'];
    let client;

    async function app(req, res) {
        const method = req.path.substring(1, req.path.length);
        try {
            const response = await client.call({ method: method });
            res.status(200).send(response);
        } catch (e) {
            res.status(500).send(e);
        }
    };

    function localBtcNode(wallet) {
        if (wallet.strict !== false) {
            wallet.strict = true;
        }
        if ('undefined' == typeof client) {
            client = new Client(wallet);
        }
        else {
            client = client;
        }
    };
    return {
        localBtcNode: localBtcNode,
        app: app
    };
}();