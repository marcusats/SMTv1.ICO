import logo from './logo.svg';
import Web3 from 'web3';
import React, {useEffect, useState} from 'react';
import SMTokenSale from './SMTokenSale.json'
import SMToken from './SMToken.json'
import './App.css';


let web3;
let saleContract;
let tokenContract;

function App() {



  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function Account() {
      web3 = new Web3(window.ethereum);
      const _accounts1 = await web3.eth.getAccounts();
      setAccounts(_accounts1[0]);
      console.log(_accounts1[0])

      const networkId = await web3.eth.net.getId();

      saleContract = new web3.eth.Contract(
        SMTokenSale.abi, 
        SMTokenSale.networks[networkId].address 
        )

        tokenContract = new web3.eth.Contract(
          SMToken.abi, 
          SMToken.networks[networkId].address 
          );
        console.log(SMToken.networks[networkId].address)


    }
    Account();


  }, []);




  return (
    <div className="App">
      <header className="App-header">
      <h1 class="text-center">SM TOKEN ICO V.1</h1>
      </header>
    </div>
  );
}

export default App;
