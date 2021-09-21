import React from "react";
import Web3 from "web3";
import { ABI, ADDRESS } from "../config";

class ShootButton extends React.Component{
constructor(){
    super()
    this.state = {

    }
    this.handleSubmit = this.handleSubmit.bind(this)
}

handleSubmit(event) {
event.preventDefault()
const web3 = new Web3(Web3.givenProvider)
web3.eth.getAccounts().then((accounts) => {
    const Roulette = new web3.eth.Contract(ABI, ADDRESS)
    Roulette.methods.shoot().send({from : accounts[0]}).then(() => {}).catch((error) => {window.alert("An error happened, please shoot again")})
})
}

render(){
    return(
        <form onSubmit = {this.handleSubmit}>
            <button type = "submit">Shoot!</button>
        </form>
    )
}
}
export default ShootButton