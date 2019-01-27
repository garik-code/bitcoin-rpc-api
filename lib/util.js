const http = require('http');
const https = require('https');

const Client = function (options = {}) {
    let serv;
    let agent;

    const conf = {
        host: options.host || '127.0.0.1',
        path: options.path || '/',

        hash: options.pass || null,
        login: options.user || null,
    };

    if (options.ssl) {
        conf.ssl = {
            sniName: options.ssl.sniName || 'RPC-Server',
            protocol: options.ssl.protocol || 'SSLv3_client_method',
        };

        if (options.ssl.pfx) {
            conf.ssl.pfx = options.ssl.pfx;
            conf.ssl.strict = options.ssl.strict || true;
        }
        else {
            if (options.ssl.ca) {
                conf.ssl.ca = options.ssl.ca;
                conf.ssl.strict = options.ssl.strict || true;
            }
            if (options.ssl.key && options.ssl.cert) {
                conf.ssl.key = options.ssl.key;
                conf.ssl.cert = options.ssl.certs;
            }
        }
        if (options.ssl.passphrase) {
            conf.ssl.passphrase = options.ssl.passphrase;
        }
    }

    if (conf.ssl) {
        serv = https;
        agent = new https.Agent();
        conf.port = options.port || 5433;
    }
    else {
        serv = http;
        agent = new http.Agent();
        conf.port = options.port || 5080;
    }

    /* Private: Returns options object for http request */
    const buildOptions = (opts) => {
        const options = {
            agent,
            method: opts.method,

            host: conf.host,
            port: conf.port,
            path: opts.path,

            headers: {
                host: `${conf.host}:${conf.port}`,
                'content-type': 'application/json',
                'content-length': opts.length,
            },
        };

        if (opts.login && opts.hash) { options.auth = `${opts.login}:${opts.hash}`; }

        if (conf.ssl) {
            options.servername = conf.ssl.sniName || 'RPC-Server';
            options.secureProtocol = conf.ssl.protocol || 'SSLv3_client_method';

            if (conf.ssl.pfx) {
                options.pfx = conf.ssl.pfx;
                options.rejectUnauthorized = conf.ssl.strict || true;
            }
            else {
                if (conf.ssl.key && conf.ssl.cert) {
                    options.key = conf.ssl.key;
                    options.cert = conf.ssl.cert;

                }
                if (conf.ssl.ca) {
                    options.ca = conf.ssl.ca;
                    options.rejectUnauthorized = conf.ssl.strict || true;
                }
            }
            if (conf.ssl.passphrase) { options.passphrase = conf.ssl.passphrase; }
        }

        return options;
    };


    this.call = (data, opts = {}) => new Promise((resolve, reject) => {

        const body = JSON.stringify(data);
        let options = buildOptions({
            length: body.length,
            method: opts.method || 'POST',
            path: opts.path || conf.path,

            login: opts.login || conf.login,
            hash: opts.hash || conf.hash,
        });

        const request = serv.request(options);

        request.on('error', (error) => {
            reject({ message: "Server couldn't get data !" });
        });

        request.on('response', (response) => {
            let data = '';
            response.on('data', (bytes) => {
                data += bytes;
            });

            response.on('end', () => {
                let error;
                let result;

                // TODO Deal with 401 and other codes
                if (response.statusCode === 200 || response.statusCode === 304) {
                    if (data.length > 0) {
                        try {
                            result = JSON.parse(data);
                            resolve(result);
                        }
                        catch (err) {
                            error = err;
                            error.message = 'Client error: failed to parse response from server.';
                            reject(error);
                        }
                    }
                }
                else reject(response.statusCode);
            });
        });

        request.end(body);


        options = null;

    });
};

module.exports = Client;
