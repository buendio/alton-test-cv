
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Card, Button, Alert } from 'react-bootstrap';

const Web3Integration = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [balance, setBalance] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        setError('');
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        setAddress(userAddress);

        const userBalance = await provider.getBalance(userAddress);
        setBalance(ethers.formatEther(userBalance));
        setWalletConnected(true);
      } catch (error) {
        setError('Wallet connection error: ' + error.message);
      }
    } else {
      setError('Please install Metamask!');
    }
  };

  return (
    <Card className="text-center w-100">
      <Card.Header as="h5">Web 3.0</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {walletConnected ? (
          <div>
            <Card.Text>
              <strong>Address:</strong> {address}
            </Card.Text>
            <Card.Text>
              <strong>Balance:</strong> {balance} ETH
            </Card.Text>
          </div>
        ) : (
          <Button variant="primary" onClick={connectWallet}>
            Connect Metamask
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Web3Integration;
