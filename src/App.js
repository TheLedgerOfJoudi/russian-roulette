import React from 'react';
import './App.css';
import Web3 from 'web3';
import RegisterForm from './components/RegisterForm';
import GameStatus from './components/GameStatus';
import Turn from './components/Turn';
import ShootButton from './components/ShootButton';

class App extends React.Component {
  constructor (){
    super()
    this.state = {
      network : ""
    }
  }

  componentDidMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData(){
    const web3 = new Web3(Web3.givenProvider)
    let net;
    await web3.eth.net.getNetworkType().then((result) => {
      net = result;
    })
    this.setState({
      network : net 
    })
  }

  render(){
  return (
    <div className="App">
    <h1>Welcome to your possibly last game!</h1>
    <h2>You are on network : {this.state.network}</h2>
    <RegisterForm/>
    <br/>
    <br/>
    <GameStatus/>
    <br/>
    <Turn/>
    <br/>
    <ShootButton/>
    </div>
  );
  }
}

export default App;
