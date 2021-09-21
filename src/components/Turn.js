import React from "react";
import Web3 from "web3";
import { ABI, ADDRESS } from "../config";

class Turn extends React.Component{
constructor(){
    super()
    this.state = {
        turn : ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
}

checkTurn(){
    const web3 = new Web3(Web3.givenProvider)
    web3.eth.getAccounts().then ((accounts) => {
        const Roulette = new web3.eth.Contract(ABI, ADDRESS)
        Roulette.methods.getTurn().call({from : accounts[0]}).then((result) => {
            this.setState({
                turn : result
            })
        })
    })
}

handleSubmit(event){
event.preventDefault()
this.checkTurn()

}

render(){
    //this.checkTurn()
    return (
        <div>
        <form onSubmit = {this.handleSubmit}>
            <button type = "submit">
                Check turn
            </button>
        </form>    
        <div>it is player {this.state.turn}'s Turn</div>
        </div>
    )
}
}
export default Turn