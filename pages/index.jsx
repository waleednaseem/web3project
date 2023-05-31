import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWalletClient } from "wagmi";
import { getContract, waitForTransaction } from "wagmi/actions";
import myAbi from "../assets/abi/myAbi";

const ContractAddress = "0x373b46DA233221509798e99F8e2e1CF550ceE419";
export default function index() {
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

  const callContractWrite = async () => {
    const transactionHash = await contract.write.deposite();
    await waitForTransaction({ hash: transactionHash });
  };

  return (
    <>
      <ConnectButton />
      <button onClick={callContractWrite}>click me</button>
    </>
  );
}
