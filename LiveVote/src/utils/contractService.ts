import { BrowserProvider, Contract, parseEther, formatEther, Signer } from "ethers";
import VotingRoomsABI from "../smart_contract/VotingRoomsAbi.json";
const VOTING_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// 为 window.ethereum 添加类型声明
declare global {
  interface Window {
    ethereum: any; // 可以替换为 `Ethereum` 类型来更精确
  }
}

// 定义模块级变量来存储 provider、signer 和 contract
let provider: BrowserProvider;
let signer: Signer;
let contract: Contract;

// 初始化 provider、signer 和 contract 的函数
const initialize = async (): Promise<void> => {
  if (typeof window.ethereum !== "undefined") {
    provider = new BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new Contract(VOTING_CONTRACT_ADDRESS, VotingRoomsABI, signer);
  } else {
    console.error("Please install MetaMask!");
  }
};

// 初始化函数在模块加载时调用一次
initialize();

// 请求用户账户地址的函数
export const requestAccount = async (): Promise<string | null> => {
  try {
    // 直接通过 window.ethereum 请求账户
    const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0] || null; // 返回第一个账户地址
  } catch (error) {
    console.error("Error requesting account:", (error as Error).message);
    return null;
  }
};

// 为候选人投票的函数
export const voteForCandidate = async (roomId: string, candidateId: string): Promise<void> => {
  try {
    const tx = await contract.vote(roomId, candidateId);
    await tx.wait(); // 等待交易被确认
    console.log("Vote successfully cast!");
  } catch (error) {
    console.error("Error casting vote:", (error as Error).message);
    throw error; // 重新抛出错误，方便前端进行处理
  }
};