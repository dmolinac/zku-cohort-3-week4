import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import styles from "../styles/Home.module.css"

import { useState, useEffect} from "react";
import { ethers } from "ethers"
import Greeter_abi from "artifacts/contracts/Greeters.sol/Greeters.json"

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const contract = new ethers.Contract("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", Greeter_abi.abi, provider);

export default function App() {
  const [txs, setTxs] = useState([]); //txs: events, setTxs where new events are stored

  const handleEvent = (greeting) => {
    let greet = ethers.utils.toUtf8String(greeting)
    console.log(greet);
    setTxs((prev) => [greet,...prev]);
  }

  useEffect(() => {
    contract.on("NewGreeting", handleEvent)
      
    return () => {
      contract.removeAllListeners("NewGreeting");
    }
  }, []);

  return (
    //Create a textbox that listens for the NewGreeting event and displays it to the users
    <div className={styles.main}>
      <Box sx={{
        width: 500,
        height: 200,
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Greeters Event Listener
        </Typography>
          Events received: <b>{txs}</b><br></br>     
      </Box>
      <Link href="/form" color="secondary">
        Go to the form page
      </Link>
    </div>
  );
};