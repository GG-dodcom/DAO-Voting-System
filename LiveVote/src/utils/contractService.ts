import { BrowserProvider, Contract, Signer } from "ethers";
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

    window.ethereum.on("accountsChanged", async (accounts: string[]) => {
      if (accounts.length > 0) {
        signer = await provider.getSigner();
        contract = new Contract(VOTING_CONTRACT_ADDRESS, VotingRoomsABI, signer);
        console.log("Wallet address changed:", accounts[0]);
      } else {
        console.log("No account connected");
      }
    });
  } else {
    console.error("Please install MetaMask!");
  }
};

initialize();

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
