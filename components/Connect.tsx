import {useState} from 'react';
import { ConnectButton } from './ConnectButton';
import { useMoralis } from 'react-moralis';
import Moralis from 'moralis-v1';



export const Connect = () => {

  const { authenticate, enableWeb3 } = useMoralis();
  const [authError, setAuthError] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleAuth = async () => {
    try {

      setAuthError(null);
      setIsAuthenticating(true);

      // Enable web3 to get user address and chain
      await enableWeb3({ throwOnError: true, provider: "metamask" });
      const { account, chainId } = Moralis;

      if (!account) {
        throw new Error('Connecting to chain failed, as no connected account was found');
      }
      if (!chainId) {
        throw new Error('Connecting to chain failed, as no connected chain was found');
      }

      // Get message to sign from the auth api
      const { message } = await Moralis.Cloud.run('requestMessage', {
        address: account,
        chain: parseInt(chainId, 16),
        network: 'evm',
      });

      console.log(message)

      // Authenticate and login via parse
      await authenticate({
        signingMessage: message,
        throwOnError: true,
      });
    } catch (error) {
      console.log(error);
      Moralis.User.logOut();
      setAuthError(error);
    } finally {
      setIsAuthenticating(false);
    }
  };


  return (
    <>
      <ConnectButton onClick={() => handleAuth()} />
    </>
  );
};
