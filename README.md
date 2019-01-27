# bitcoin-rpc-api
A modern full-featured Bitcoin Core REST and RPC Express middleware to execute administrative tasks, [multiwallet](https://bitcoincore.org/en/2017/09/01/release-0.15.0/#multiwallet) operations and queries about network and the blockchain using URL structure exposed for easy interfacing with a bitcoind Bitcoin wallet..

## Status
[![NPM Package](https://img.shields.io/badge/npm-0.0.5-green.svg)](https://www.npmjs.org/package/dibyanshu)
[![Build Status](https://img.shields.io/badge/build-passing-green.svg)](https://github.com/dibyanshusinha/)

## Installation

Install the package via `npm`:

```sh
npm install bitcoin-rpc-api --save
```


## Usage

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

This will return data as expected from bitcoin-cli


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
  "prune_target_size": 576716800,
  "softforks": [ ... ],
  "bip9_softforks": {
    "csv": { ... },
    "segwit": { ... }
  },
  "warnings": ""
}


```

Parameters should be sent via a query string:

### Client(...args)
#### Params

The command ```sh  bitcoin-cli validateaddress "1PSSGeFHDnKNxiEyFrD1wcEaHr9hrQDDWc"  ```
can be converted as 

* http://localhost:5000/bitcoin/validateaddress?address=addresseBL2HJWttdztptRvf1wm

This will return in similar faishon. 

```javascript
  { 
    "result": {
      "isvalid": true,
      "address": "1N2xxpqDDPb1wm",
      "scriptPubKey": "76a914e6b9c5ba5d75088ac",
      "ismine": false,
      "iswatchonly": false,
      "isscript": false,
      "iswitness": false
    },
    "error": null,
    "id": null
  }
  
```

Consult the [API list](https://bitcoin.org/en/developer-reference#remote-procedure-calls-rpcs) for parameter information.


## More APIs with complex params coming soon...


### .walletPass(passphrase);

If your wallet is encrypted set that before using middleware. Ex:
```javascript
bitcoin.setup(wallet);
bitcoin.walletPass("passwordorpassphrase");
app.use('/bitcoin/api', bitcoin.api);
```


## Projects

Bitcoin-RPC-Api is used in the following projects:

* [Confidential](http://link)

If you use Bitcoin-RPC-Api in your projects submit a pull request to the readme with a link or send me an email: dibyanshu.sunny@gmail.com

# Licence

**Code released under [the MIT license](https://github.com/dibyanshusinha/bitcoin-rpc-api/blob/master/LICENSE).**

Copyright (C) 2019 Dibyanshu