require('dotenv').config();
import {Connection, PublicKey,Transaction,SystemProgram, sendAndConfirmTransaction,LAMPORTS_PER_SOL } from "@solana/web3.js";
import {getKeypairFromEnvironment} from "@solana-developers/helpers";


//Connection to Devnet
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
if(connection){
    console.log("\n✅ Successfully connected to the Network!!\n")
}


// Address should be given while running the command npx esrun transafer.ts "RECIPIENT_ADDRESS"
const recAddr = process.argv[2];

if(!recAddr){
    console.log("Please give a Public key!!!");
}

const recipientPubkey = new PublicKey(recAddr);

//Retrieving keypairs using the Secret_Key stored in the .env file
const keypair = getKeypairFromEnvironment("SECRET_KEY");
const senderAddress = keypair.publicKey;

console.log("!!!!!!!!!!!!!!!!!!!!!Before Transaction!!!!!!!!!!!!!!!!!!!!!!!\n");

//Getting balance of the Accounts
console.log("Sender Balance : " + await connection.getBalance(senderAddress));
console.log("Recipient Balance : " + await connection.getBalance(recipientPubkey));


//Initialization of Transaction
const transaction = new Transaction();

//Lamports to transfer(Amount) 
// 1 Lamport = 0.000000001 SOL
const LAMPORTS_TO_TRANSFER = LAMPORTS_PER_SOL * 7;


//Instructions to send transfer transaction
const instructionsForTransfer = SystemProgram.transfer({
    fromPubkey: keypair.publicKey,
    toPubkey: recipientPubkey,
    lamports: LAMPORTS_TO_TRANSFER
});

//Adding the instructions to the transaction
transaction.add(instructionsForTransfer);

const transactionSignature = await sendAndConfirmTransaction(connection,transaction,[keypair]);

console.log("Transaction Signature : "+ transactionSignature);

console.log("\n!!!!!!!!!!!!!!!!!!!!!After Transaction!!!!!!!!!!!!!!!!!!!!!!!\n");
console.log("Sender Balance : " + await connection.getBalance(senderAddress));
console.log("Recipient Balance : " + await connection.getBalance(recipientPubkey));


