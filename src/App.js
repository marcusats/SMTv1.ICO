import logo from './logo.svg';
import Web3 from 'web3';
import React, {useEffect, useState} from 'react';
import SMTokenSale from './SMTokenSale.json'
import SMToken from './SMToken.json'
import './App.css';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";

let web3;
let saleContract;
let tokenContract;
let tokenPrice

function App() {



  const [accounts, setAccounts] = useState([]);
  const [amount, setAmount ] = useState('');

  useEffect(() => {
    async function Account() {
      web3 = new Web3(window.ethereum);
      const _accounts1 = await web3.eth.getAccounts();
      setAccounts(_accounts1[0]);
      console.log(_accounts1[0])

      const networkId = await web3.eth.net.getId();

      tokenContract = new web3.eth.Contract(
        SMToken.abi, 
        SMToken.networks[networkId].address 
      );
      

      saleContract = new web3.eth.Contract(
        SMTokenSale.abi, 
        SMTokenSale.networks[networkId].address 
        )

        
          saleContract.methods.tokenPrice().call(function(err, res){
            //do something with res here
            tokenPrice = res
            console.log(tokenPrice); //for example
        });
        console.log(accounts.toString())

    }
    Account();


  }, []);
  async function Sending(amount) {
    const _accounts1 = await web3.eth.getAccounts();
    console.log(amount * tokenPrice)
    await saleContract.methods.buyTokens(amount).send( {from: _accounts1[0],
     value: amount * tokenPrice,
     gas: 500000}, async function(result){
      console.log("Tokens bought...");
     });
    
  }




  return (
    <div className="App">
      <header className="App-header">
      <h1 class="text-center">SM TOKEN ICO V.1</h1>

      <Grid item xs={12} sm={6}>
      <Input
                variant="outlined"
                fullWidth
                type="text"
                label="SMT to Buy"
                onChange={event => setAmount(event.target.value)}
      />
      </Grid>
      <br/><br/>
      <Button className="connect-btn"
      onClick={ () => {
        Sending(amount)
        console.log(amount)
      }
      }
      >BUY
      </Button>

      </header>
    </div>
  );
}

export default App;
