# ReviewMe
Blockchain based peer review system for conference papers

# Creating a Private Single Geth Node
- `mkdir datadir`
- `geth --datadir ./datadir init init.json`
- `geth --datadir ./datadir --networkid 2019 --rpc --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --rpcapi "eth,net,web3,personal,miner"`

# Attaching to Geth IPC
- `geth attach ./datadir/geth.ipc

# References
- [C# Corner](https://www.c-sharpcorner.com/article/building-web-application-using-node-js/)
- [Mongodb NPM](https://www.npmjs.com/package/mongodb)
- [Passport NPM](https://www.npmjs.com/package/passport)
- [Passport](http://www.passportjs.org/)
- [Web3js NPM](https://www.npmjs.com/package/web3)
- [Hackernoon](https://hackernoon.com/set-up-a-private-ethereum-blockchain-and-deploy-your-first-solidity-smart-contract-on-the-caa8334c343d)
