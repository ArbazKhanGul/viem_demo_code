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

const contractAddress="0x59bb82c3e1095b4474c99b01f515426d79871ca5";

(async ()=>{
    const client = createWalletClient({
        account: account,
        chain: bscTestnet,
        transport: http('https://data-seed-prebsc-1-s1.binance.org:8545/')
    }).extend(publicActions)

    const contract = getContract({
     address:contractAddress,
     abi,
     client})

     const events=await contract.getEvents.xWasChanged({
        fromBlock:0n,
     })

    contract.watchEvent.xWasChanged({
        onLogs:(logs)=>console.log(logs)
     })

     console.log(events)
    
})()