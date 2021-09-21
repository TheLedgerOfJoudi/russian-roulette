pragma solidity  >=0.4.22 <0.8.0; 

contract RussianRoulette {
    
    address payable [2] players;
    uint index = 0;
    uint turn = 0;
    uint nonce = 0;
    uint killed = 0;
    bool finished = false;
    
    constructor () {
        turn = uint(keccak256(abi.encodePacked(nonce,block.difficulty, block.timestamp, players, block.number))) % 2;
        nonce = turn;
        killed = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players, block.number,nonce))) % 2;
    }
    
    function register() public payable {
        require (index < 2);
        require (msg.value >= 0.5 ether);
        players[index] = msg.sender;
        index++;
        if(index == 2){
            finished = false;
        }
    }
    
    event GameOver (address loser);
    modifier isSenderTurn () {
        require(msg.sender == players[turn]);
        _;
    }
    
    modifier gameNotFinished(){
        require(finished == false);
        _;
    }
    
    function shoot() public gameNotFinished isSenderTurn{
        if(!finished){
        nonce++;
        uint shot = uint(keccak256(abi.encodePacked(nonce, block.difficulty, block.timestamp, players, block.number))) % 2;
        if (shot == killed) {
            emit GameOver(players[turn]);
            players[ (turn + 1) % 2].transfer(address(this).balance);
            players[0] = players [1] = address(0);
            index = 0;
            finished = true;
        }
        turn = (turn + 1) % 2;
        }
    }
    
    function getTurn () public view returns (address) {
        return players[turn];
    }
    
    function isFinished () public view returns (bool) {
        return finished;
    }
}

