import { Button } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useMoralis } from 'react-moralis';
import Moralis from 'moralis-v1';

const styles = {
  button: `bg-[#6188FF] px-5 py-2 rounded-lg`,
}

interface ConnectButtonProps {
  onClick: () => void;
}

export const ConnectButton = ({ onClick }: ConnectButtonProps) => {
  const { chainId, account, isWeb3Enabled, deactivateWeb3 } = useMoralis();

  const connectString = useMemo(() => {
    let output = '';
    if (account) {
      output += `${account.substring(0, 5)}...${account.substring(account.length - 3)}`;
    }
    if (chainId) {
      output += ` (${chainId})`;
    }
    return output;
  }, [account, chainId]);

  const handleLogOut = () => {
    Moralis.User.logOut();
    deactivateWeb3;
  }

  return (
    <Button className={styles.button} onClick={isWeb3Enabled ? handleLogOut : onClick}>
      {isWeb3Enabled ? connectString : 'Connect Wallet'}
    </Button>
  );
};
