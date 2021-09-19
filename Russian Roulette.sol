pragma solidity  >=0.4.22 <0.8.0; 

contract RussianRoulette {
    
    address payable [2] players;
    uint index = 0;
    uint turn = 0;
    uint nonce = 0;
    uint killed = 0;
    constructor () {
        turn = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players, block.number))) % 2;
        killed = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players, block.number))) % 6;
        nonce = turn;
        
    }
    
    function register() public payable {
        require (index < 2);
        require (msg.value >= 0.5 ether);
        players[index] = msg.sender;
        index++;
    }
    
    event CheekiBreekiVDamke (address loser);
    modifier isSenderTurn () {
        require(msg.sender == players[turn]);
        _;
    }
    
    function shoot() public isSenderTurn{
        
        nonce++;
        uint shot = uint(keccak256(abi.encodePacked(nonce, block.difficulty, block.timestamp, players, block.number))) % 6;
        if (shot == killed) {
            emit CheekiBreekiVDamke(players[turn]);
            players[ (turn + 1) % 2].transfer(address(this).balance);
            players[0] = players [1] = address(0);
            index = 0;            
        }
        
        turn = (turn + 1) % 2;
    }
}

