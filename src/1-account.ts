import { Hex, createPublicClient, formatEther, http } from "viem";
import { PrivateKeyAccount, privateKeyToAccount } from "viem/accounts"
import {opBNBTestnet} from "viem/chains";
import dotenv from "dotenv";
dotenv.config();

const privateKey=process.env.PRIVATE_KEY as Hex;

const account=privateKeyToAccount(privateKey);

// console.log(account);

(async ()=>{
    const client=createPublicClient({
        chain:opBNBTestnet,
        transport: http('https://data-seed-prebsc-1-s1.binance.org:8545/')
    })

    const balance =await client.getBalance({
        address:account.address
    })
    console.log("🚀 ~ balance:", formatEther(balance))

    const nonce=await client.getTransactionCount({
        address:account.address
    })
    console.log("🚀 ~ nonce:", nonce)
})()