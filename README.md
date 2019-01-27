# bitcoin-rpc-api
A modern full-featured Bitcoin Core REST and RPC Express middleware to execute administrative tasks, [multiwallet](https://bitcoincore.org/en/2017/09/01/release-0.15.0/#multiwallet) operations and queries about network and the blockchain using URL structure exposed for easy interfacing with a bitcoind Bitcoin wallet..

## Status
[![NPM Package](https://img.shields.io/badge/npm-0.0.4-green.svg)](https://www.npmjs.org/package/dibyanshu)
[![Build Status](https://img.shields.io/badge/build-passing-green.svg)](https://github.com/dibyanshusinha/)

## Installation

Install the package via `npm`:

```sh
npm install bitcoin-rpc-api --save
```


## Usage
### Client(...args)
#### Params


### Examples
#### Using Node.js

##### Example of a setup

```javascript
var bitcoin = require('bitcoin-rpc-api');
var express = require('express');
var app = express();

//Username and password relate to those set in the bitcoin.conf file

var node = {
  protocol: 'http',
  host: 'localhost',
  port: 8332,
  user: 'username',
  pass: 'password'
};

bitcoin.setup(node);
app.use('/bitcoin', bitcoin.api); //Bind the middleware to any chosen url

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
bitcoin.setup(wallet);
bitcoin.setWalletPassphrase(passphrase);
app.use('/bitcoin/api', bitcoin.api);
```

### .setAccces(type, accesslist);

The .setAccess method controls the access to the urls. By default all commands are accessible. The method takes two parameters: type (string) and accesslist (array). To restrict access there are two ways to do this:

#### 'allow'

The 'allow' type only exposes the methods given by an array of methods as the accesslist parameter.

```javascript
//Allow only the getblockchaininfo method
bitcoin.setAccess('allow', ['getblockchaininfo']);
```

#### 'restrict'

The 'restrict' type prevents methods from being accessed.

```javascript
bitcoin.setAccess('restrict', ['dumpprivkey', 'sendmany']);
```

### Access Profiles

Bitcoin-RPC-Api has predefined access profiles to make it easy to set up.

#### 'default-safe'

It prevents 'dumpprivkey' and 'walletpassphrasechange' being accessed. This prevents potential theft. Also removes the 'stop' command to prevent someone from stopping the server.

```javascript
bitcoin.setAccess('default-safe');
```

#### 'read-only'

This profile only exposes methods that show information. No methods that can send/alter the wallet are exposed.

```javascript
bitcoin.setAccess('read-only');
```

## Projects

Bitcoin-RPC-Api is used in the following projects:

* [Confidential](http://link)

If you use Bitcoin-RPC-Api in your projects submit a pull request to the readme with a link or send me an email: dibyanshu.sunny@gmail.com

# Licence

**Code released under [the MIT license](https://github.com/dibyanshusinha/bitcoin-rpc-api/blob/master/LICENSE).**

Copyright (C) 2019 Dibyanshu