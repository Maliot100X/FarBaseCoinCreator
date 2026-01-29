import { deployERC20Contract } from "thirdweb/deploys";
import { useActiveAccount } from "thirdweb/react";
import { client, chain } from "@/lib/thirdweb";
import { BASE_CHAIN_ID } from "@/utils/constants";
import { getContract, prepareContractCall, sendTransaction } from "thirdweb";
import { parseUnits } from "viem";

export function useDeployToken() {
  const account = useActiveAccount();

  const deploy = async (name: string, symbol: string, initialSupply: string) => {
    if (!account) throw new Error("No account connected");
    
    // Verify Chain ID (Client side check, wallet will also prompt switch)
    if (chain.id !== BASE_CHAIN_ID) {
       throw new Error(`Must be on Base Mainnet (Chain ID ${BASE_CHAIN_ID})`);
    }

    try {
      console.log("Deploying ERC20...", { name, symbol });
      const contractAddress = await deployERC20Contract({
        client,
        chain,
        account,
        type: "TokenERC20", 
        params: {
          name,
          symbol,
        }
      });
      console.log("Deployed at:", contractAddress);

      if (initialSupply && initialSupply !== "0") {
          console.log("Minting initial supply...", initialSupply);
          const contract = getContract({
              client,
              chain,
              address: contractAddress,
          });

          // Mint to self
          // Note: The ABI for TokenERC20 includes 'mintTo'
          // We assume standard thirdweb TokenERC20
          const transaction = prepareContractCall({
            contract,
            method: "function mintTo(address to, uint256 amount)",
            params: [account.address, parseUnits(initialSupply, 18)],
          });

          await sendTransaction({
              transaction,
              account,
          });
          console.log("Minted initial supply");
      }
      
      return contractAddress;
    } catch (error) {
      console.error("Deployment failed:", error);
      throw error;
    }
  };

  return { deploy };
}
