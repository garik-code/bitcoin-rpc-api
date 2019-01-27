const Client = require('./lib/util');

let client;
let walletPassword = null;

api = async (req, res) => {
    const method = req.path.substring(1, req.path.length);
    const queryParams = req.query;
    const params = [];
    for (const parameter in queryParams) {
        if (queryParams.hasOwnProperty(parameter)) {
            let param = queryParams[parameter];
            if (!isNaN(param)) {
                param = parseFloat(param);
            }
            params.push(param);
        }
    }
    try {
        const response = await client.call({ method, params });
        res.status(200).send(response);
    } catch (e) {
        res.status(500).send({ message: e.message });
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

walletPass = (password) => {
    if ('undefined' == typeof walletPassword) {
        walletPassword = password;
    }
    else {
        walletPassword = walletPassword;
    }
}


module.exports = { api, setup, walletPass }

