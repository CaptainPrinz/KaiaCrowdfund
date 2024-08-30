import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi } from "../../output.json";

export const useProvider = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
}

export const useContract = () => {
    const provider = useProvider();
    if(provider !== null){
        const contractAddress = "0xc6234f77c60D5EC1Bc9CD9377Ac5604B16b7BDb3";
        const contract = new ethers.Contract(contractAddress, abi, provider.getSigner());
        return contract;
    } else {
        return null
    }
}

