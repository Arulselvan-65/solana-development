require('dotenv').config()
import * as web3 from '@solana/web3.js';
import {getKeypairFromEnvironment} from "@solana-developers/helpers";

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
if(connection){
    console.log("✅ Connected to the Network !!!!\n");
}
else{
    console.log("Failed to connect to the Network!!");
}

const payer = getKeypairFromEnvironment("SECRET_KEY");

const PROGRAM_ADDRESS = new web3.PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa");
const PROGRAM_DATA_ADDRESS = new web3.PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod");

const transaction = new web3.Transaction();

const programId = new web3.PublicKey(PROGRAM_ADDRESS);
const programDataId = new web3.PublicKey(PROGRAM_DATA_ADDRESS);

const instructions = new web3.TransactionInstruction({
    keys: [
        {
            pubkey: programDataId,
            isSigner: false,
            isWritable: true
        }
    ],
    programId
});

transaction.add(instructions);

const transactionSignature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [payer]
);

console.log("Transaction Signature is : "+ transactionSignature);

console.log(`View Transaction on the web : ${'\x1b[34m'} https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet ${'\x1b[0m'}`);
