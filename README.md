# ReviewMe
Blockchain based peer review system for conference papers

# Creating a Private Single Geth Node
1. Create folder for chain data:

   ```mkdir datadir```
2. Initialize Blockchain network and create genesis block:

   ```geth --datadir ./datadir init init.json```
3. Start blockchain network and expose useful RPC APIs:

   ```geth --datadir ./datadir --networkid 2019 --rpc --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --rpcapi "eth,net,web3,personal,miner"```

# Attaching to Geth IPC
```geth attach ./datadir/geth.ipc```

# Creating Private Network Cluster using Geth
Run the following commands on Geth console-

1. Get enode information of nodes by running following command:

   ```admin.nodeInfo.enode```

2. Add peer by running following command:

   ```admin.addPeer(<enode id of the current Node and IP of the Node to connect>)```

3. Check if peers are added by following command:

   ```admin.peers```

# References
- [C# Corner](https://www.c-sharpcorner.com/article/building-web-application-using-node-js/)
- [Mongodb NPM](https://www.npmjs.com/package/mongodb)
- [Passport NPM](https://www.npmjs.com/package/passport)
- [Passport](http://www.passportjs.org/)
- [Web3js NPM](https://www.npmjs.com/package/web3)
- [Hackernoon](https://hackernoon.com/set-up-a-private-ethereum-blockchain-and-deploy-your-first-solidity-smart-contract-on-the-caa8334c343d)
- [Medium Private Network Cluster using Geth](https://medium.com/@yashwanthvenati/setup-private-ethereum-blockchain-network-with-multiple-nodes-in-5-mins-708ab89b1966)
