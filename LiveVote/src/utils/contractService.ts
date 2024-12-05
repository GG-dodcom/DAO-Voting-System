import { BrowserProvider, Contract, parseEther, formatEther, Signer } from "ethers";
import VotingRoomsABI from "../smart_contract/VotingRoomsAbi.json";
const VOTING_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

declare global {
  interface Window {
    ethereum: any; 
  }
}

let provider: BrowserProvider;
let signer: Signer;
let contract: Contract;

const initialize = async (): Promise<void> => {
  if (typeof window.ethereum !== "undefined") {
    provider = new BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new Contract(VOTING_CONTRACT_ADDRESS, VotingRoomsABI, signer);
  } else {
    console.error("Please install MetaMask!");
  }
};

initialize();

export const requestAccount = async (): Promise<string | null> => {
  try {
    const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0] || null; 
  } catch (error) {
    console.error("Error requesting account:", (error as Error).message);
    return null;
  }
};

export const voteForCandidate = async (roomId: string, candidateId: string): Promise<void> => {
  try {
    const tx = await contract.vote(roomId, candidateId);
    await tx.wait(); 
    console.log("Vote successfully cast!");
  } catch (error) {
    console.error("Error casting vote:", (error as Error).message);
    throw error; 
  }
};
