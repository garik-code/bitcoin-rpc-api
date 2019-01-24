# bitcoin-rpc-api
A modern full-featured Bitcoin Core REST and RPC Express middleware to execute administrative tasks, [multiwallet](https://bitcoincore.org/en/2017/09/01/release-0.15.0/#multiwallet) operations and queries about network and the blockchain using URL structure exposed for easy interfacing with a bitcoind Bitcoin wallet..

## Status
[![NPM Package](https://img.shields.io/badge/npm-0.1.0-orange.svg)](https://www.npmjs.org/package/dibyanshu)
[![Build Status](https://img.shields.io/badge/build-failed-red.svg)](https://github.com/dibyanshusinha/)

## Installation

Install the package via `yarn`:

```sh
yarn add bitcoin-rpc-api
```

or via `npm`:

Install the package via `npm`:

```sh
npm install bitcoin-rpc-api --save
```


## Usage
### Client(...args)
#### Params
1. `[host=localhost]` _(string)_: The host to connect to.


### Examples
#### Using Node.js
The `network` will automatically determine the port to connect to, just like the `bitcoind` and `bitcoin-cli` commands.

NB: The middleware is experimental at present. Certain JSON-RPC methods are not supported yet and/or experimental. These are methods with more complex parameters that do not fit easily into a query string:

- addmultisigaddress
- createmultisig
- getaddednodeinfo
- sendmany

These methods will be added in the future. If there any other problems with the other methods, please report the bugs.

##### Example of a setup

```javascript
var bitcoinapi = require('bitcoin-rpc-api');
var express = require('express');
var app = express();

//Username and password relate to those set in the bitcoin.conf file

var wallet = {
  protocol: 'http',
  host: 'localhost',
  port: 8332,
  user: 'username',
  pass: 'password'
};

bitcoinapi.setWalletDetails(wallet);
bitcoinapi.setAccess('default-safe'); //Access control
app.use('/bitcoin', bitcoinapi.app); //Bind the middleware to any chosen url

app.listen(3000);
```

### Client/Browser

Just add the method name after the binded url.

* http://localhost:5000/URL/METHOD

For example:

* http://localhost:5000/bitcoin/api/getblockchaininfo

This returns data exactly as would be expected from the JSON-RPC api.

```javascript
{
  "chain": "main",
  "blocks": 559438,
  "headers": 559438,
  "bestblockhash": "",
  "difficulty": 5883988430955.408,
  "mediantime": 1548061269,
  "verificationprogress": 0.9999991510791459,
  "initialblockdownload": false,
  "chainwork": "",
  "size_on_disk": 548902880,
  "pruned": true,
  "pruneheight": 558925,
  "automatic_pruning": true,
  "prune_target_size": 576716800,
  "softforks": [
    {
      "id": "bip34",
      "version": 2,
      "reject": {
        "status": true
      }
    }
  ],
  "bip9_softforks": {
    "csv": {
      "status": "active",
      "startTime": 1462060800,
      "timeout": 1493596800,
      "since": 419328
    },
    "segwit": {
      "status": "active",
      "startTime": 1479168000,
      "timeout": 1510704000,
      "since": 481824
    }
  },
  "warnings": ""
}


```

Parameters should be sent via a query string:

Consult the [API list](https://bitcoin.org/en/developer-reference#remote-procedure-calls-rpcs) for parameter information.


## Access Control

### .setWalletPassphrase(passphrase);

If you have encrypted your wallet.dat you need to set the passphrase before attaching the middleware.
```javascript
bitcoinapi.setWalletDetails(wallet);
bitcoinapi.setWalletPassphrase(passphrase);
app.use('/bitcoin/api', bitcoinapi.app);
```

### .setAccces(type, accesslist);

The .setAccess method controls the access to the urls. By default all commands are accessible. The method takes two parameters: type (string) and accesslist (array). To restrict access there are two ways to do this:

#### 'allow'

The 'allow' type only exposes the methods given by an array of methods as the accesslist parameter.

```javascript
//Allow only the getblockchaininfo method
bitcoinapi.setAccess('allow', ['getblockchaininfo']);
```

#### 'restrict'

The 'restrict' type prevents methods from being accessed.

```javascript
bitcoinapi.setAccess('restrict', ['dumpprivkey', 'sendmany']);
```

### Access Profiles

Bitcoin-RPC-Api has predefined access profiles to make it easy to set up.

#### 'default-safe'

It prevents 'dumpprivkey' and 'walletpassphrasechange' being accessed. This prevents potential theft. Also removes the 'stop' command to prevent someone from stopping the server.

```javascript
bitcoinapi.setAccess('default-safe');
```

#### 'read-only'

This profile only exposes methods that show information. No methods that can send/alter the wallet are exposed.

```javascript
bitcoinapi.setAccess('read-only');
```

## Projects

Bitcoin-RPC-Api is used in the following projects:

* [Confidential](http://link)

If you use Bitcoin-RPC-Api in your projects submit a pull request to the readme with a link or send me an email: dibyanshu.sunny@gmail.com

# Licence

**Code released under [the MIT license](https://github.com/dibyanshusinha/bitcoin-rpc-api/blob/master/LICENSE).**

Copyright (C) 2019 Dibyanshu

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
