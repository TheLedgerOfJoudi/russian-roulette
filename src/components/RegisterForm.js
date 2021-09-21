import React from "react";
import Web3 from "web3";
import { ABI, ADDRESS } from "../config";
class RegisterForm extends React.Component{
constructor(){
    super()
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
}

handleSubmit(event){
event.preventDefault()
const web3 = new Web3(Web3.givenProvider)
web3.eth.getAccounts().then((accounts) => {
    const Roulette = new web3.eth.Contract(ABI, ADDRESS)
    Roulette.methods.register().send({from : accounts[0], value : 0.5 * 10 ** 18 }).then(() =>{
     
    })
})
}

render(){
    return(
        <form onSubmit = {this.handleSubmit}>
            <button type = "submit">Register!</button>
        </form>
    )
    }
}

export default RegisterForm