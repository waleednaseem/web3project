import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWalletClient } from "wagmi";
import { getContract, waitForTransaction } from "wagmi/actions";
import myAbi from "../assets/abi/myAbi";

export default function index() {
  const ContractAddress = "0x569B2514b94bc003F0394da5125f47274de0a812";
  const { data: walletClient } = useWalletClient();

  const contract = React.useMemo(
    () =>
      getContract({
        address: ContractAddress,
        abi: myAbi,
        walletClient,
      }),

    [walletClient]
  );
console.log(walletClient)
  const deposite = async () => {
    const transactionHash = await contract.write.transferFromUserToOwner(['0x53A3CCDDa2a98596167b5Bf9703A55e4f5116E16',100]);
    await waitForTransaction({ hash: transactionHash });
  };
  const withdraw = async () => {
    const transactionHash = await contract.write.transferFromOwnerToUser(['0x53A3CCDDa2a98596167b5Bf9703A55e4f5116E16',100]);
    await waitForTransaction({ hash: transactionHash });
  };

  return (
    <>
      <ConnectButton />
      <button onClick={deposite}>deposite</button>
      <button onClick={withdraw}>withdraw</button>
    </>
  );
}
