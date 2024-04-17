import {Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

if(connection){
    console.log("✅ Connected! to Devnet!!")
}

try{
const public_key = new PublicKey("PUBLIC_KEY");

const balance_in_lamports = await connection.getBalance(public_key);

const balance_in_sol = balance_in_lamports/LAMPORTS_PER_SOL;

console.log("Balance in Lamports : "+ balance_in_lamports);
console.log("Balance in SOL : "+ balance_in_sol);
}
catch(err){
    console.log("Invalid Wallet Address!!!")
}

