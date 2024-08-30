import "dotenv/config";
import output from "./output.json" assert {type: 'json'};
import { ethers, Wallet } from "ethers";

const { abi, bytecode } = output;
const provider = new ethers.providers.JsonRpcProvider("https://public-en-kairos.node.kaia.io");
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

const factory = new ethers.ContractFactory(abi, bytecode, wallet);
const contract = await factory.deploy();

console.log(contract.address);
await contract.deployed();
console.log(contract.deployTransaction)
