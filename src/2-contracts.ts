import { Hex, createPublicClient, createWalletClient, formatEther, getContract, http, parseAbi, publicActions, toHex } from "viem";
import { privateKeyToAccount } from "viem/accounts"
import { bscTestnet } from "viem/chains";
import dotenv from "dotenv";
import fs from 'fs';
import path from "path";

// Read the ABI and Bytecode files
const abi = JSON.parse(fs.readFileSync(path.join(__dirname, '../output/contracts_Fun_sol_Fun.abi'), 'utf8'));
const bytecode = fs.readFileSync(path.join(__dirname, '../output/contracts_Fun_sol_Fun.bin'), 'utf8').trim();

dotenv.config();

const privateKey = process.env.PRIVATE_KEY as Hex;

const account = privateKeyToAccount(privateKey);

// console.log(account);

(async () => {
    const client = createWalletClient({
        account: account,
        chain: bscTestnet,
        transport: http('https://data-seed-prebsc-1-s1.binance.org:8545/')
    }).extend(publicActions)

    // const hash =await client.deployContract({
    //     // abi:abi,
    //     // bytecode:`0x${bytecode}`,
    // })

    const hash = await client.deployContract({
        abi: abi,
        bytecode: `0x${bytecode}`,
        args: [34]
    })
    console.log("🚀 ~ hash:", hash)

    await new Promise(resolve => setTimeout(resolve, 3000)); // wait 3 second

    const { contractAddress } = await client.getTransactionReceipt({
        hash
    })
    console.log("🚀 ~ contractAddress:", contractAddress)

    if (contractAddress) {

        const contract = getContract({
            address: contractAddress,
            abi,
            client
        })

        // const x = await contract.read.x();
        // console.log("🚀 ~ x:", x)

        // await contract.write.changeX([345])
        // console.log("🚀 ~ x:", x)

        // const x=await client.readContract({
        //     address:contractAddress,
        //     abi,
        //     functionName:'x',
        //     args:[]
        // })
        // console.log("🚀 ~ x:", x)

        // const x=await client.getStorageAt({
        //     address:contractAddress,
        //     slot:toHex(0)
        // })
        // console.log("🚀 ~ x:", x)


    }



})()