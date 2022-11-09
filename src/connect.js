import abi from "./abi/abi.json" assert {type:"json"};


const connect = new Promise((ress,rej)=>
{
    if (typeof window.ethereum =="undefined")
    {
        rej("Install Metmask");
    }
    window.ethereum.request({method : "eth_requestAccounts"});

    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi,"0xE6D443aeB3F03Aad3b24F087779b6796358FA668") ;
    
web3.eth.getAccounts().then((accounts)=>
{
    contract.methods.totalSupply().call({from:accounts[0]}).then((supply)=>
    {
        contract.methods.getBuildings().call({from:accounts[0]}).then((data)=>
            {
                rej({supply:supply,buildings:data});
            });
    });
    });
});

export default connect;