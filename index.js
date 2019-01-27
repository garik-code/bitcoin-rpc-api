const Client = require('./lib/util');


const accesslist = ['getblockchaininfo'];
let client;

api = async (req, res) => {
    const method = req.path.substring(1, req.path.length);
    try {
        const response = await client.call({ method: method });
        res.status(200).send(response);
    } catch (e) {
        res.status(500).send(e);
    }
}

setup = (wallet) => {
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


module.exports = { api, setup }

