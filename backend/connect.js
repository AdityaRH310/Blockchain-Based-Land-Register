const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

async function connect() {

    const ccpPath = path.resolve(
        __dirname,
        '../fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json'
    );

    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // 🔥 USE EXISTING ADMIN CERT (NO WALLET NEEDED)
    const wallet = await Wallets.newInMemoryWallet();

    const certPath = path.resolve(
        __dirname,
        '../fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/signcerts/cert.pem'
    );

    const keyDir = path.resolve(
        __dirname,
        '../fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore'
    );

    const keyFile = fs.readdirSync(keyDir)[0];

    const keyPath = path.join(keyDir, keyFile);

    const identity = {
        credentials: {
            certificate: fs.readFileSync(certPath).toString(),
            privateKey: fs.readFileSync(keyPath).toString(),
        },
        mspId: 'Org1MSP',
        type: 'X.509',
    };

    await wallet.put('admin', identity);

    const gateway = new Gateway();

    await gateway.connect(ccp, {
        wallet,
        identity: 'admin',
        discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('basic');

    return { gateway, contract };
}

module.exports = connect;