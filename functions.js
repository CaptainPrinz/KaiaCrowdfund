import { ethers } from "ethers";
//function for connecting wallet

export const connectWallet = async() => {
    if(windows.ethereum){
        //metamask is installed
        const provider = new ethers.providers.Web3Provider(windows.ethereum);
        //get accounts
        let accounts, currentAccount
        try{
            accounts = await provider.send("eth_requestAccounts");
            provider._getAddress();
        } catch {
            console.log("An Error Occurred!")
        }
    }
    console.log("Install a Wallet");   
}

export const getContractInstance = () {
    //const provider = new ethers.providers.Web3Provider(windows.ethereum);
    const provider = new Web
    const contractAddress = "0x489F2c35815897E595B42B3E041416D16710cfb6";
    const contract = new ethers.Contract(contractAddress, abi, provider)
    
}