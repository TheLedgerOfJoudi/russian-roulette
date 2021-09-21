import React from "react";
import Web3 from "web3";
import {ABI , ADDRESS} from "../config" 
class GameStatus extends React.Component{
constructor(){
    super()
    this.state = {
        finished : false 
    }
    this.handleSubmit = this.handleSubmit.bind(this)
}

checkStatus(){
    const web3 = new Web3(Web3.givenProvider)
    web3.eth.getAccounts().then((accounts) => {
        const Roulette = new web3.eth.Contract(ABI, ADDRESS)
        Roulette.methods.isFinished().call({from : accounts[0]}).then((res) => {
            this.setState (
                {
                    finished : res
                }
            )
        })
    })
}

isItOver(){
    const web3 = new Web3(Web3.givenProvider)
    const Roulette = new web3.eth.Contract(ABI, ADDRESS)
    Roulette.events.GameOver().on('data', event => {
        window.alert("game is over," + event.returnValues.loser + " has lost")})
}
handleSubmit(event){
    event.preventDefault()
    this.checkStatus()
}

render(){
    this.isItOver()
    if(this.state.finished){

    return (
     <div>Game is over!, refresh and register to start a new one</div>   
    )
    }
    else {
        return (
            <div>
            <form onSubmit = {this.handleSubmit}> 
                <button type = "submit">
                    Check game status
                </button>
            </form>
            <div>Game is still on</div>
            </div>
        )
    }
}
}

export default GameStatus