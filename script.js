let address = '';

async function connectMetamask() {
    if (!window.ethereum) {
        alert('Please install Metamask first.');
        return;
    } else {
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            address = accounts[0];

            document.getElementById('address').innerHTML = `<p>Wallet conectada</p> <p>${
                address.slice(0, 6) + '.....' + address.slice(-6)
            }</p> `;
            document.getElementById('connect_button').style.display = 'none';
        } catch (err) {
            console.log(err);
        }
    }
}

const getBalance = async () => {
    try {
        const params = [address, 'latest'];
        const balance = await window.ethereum.request({ method: 'eth_getBalance', params });
        const ethBalance = parseInt(balance) / 1e18;
        document.getElementsByClassName('show_balance')[0].innerHTML = `<p>${ethBalance}</p>`;
    } catch (error) {
        console.error('Error:', error);
    }
};

// const contract_address = '0xd587327fDB7d9Bc1Dad875A5d31109eCe22F4F6d';
// let contract_instance;

// const main = async () => {
//     try {
// const response = await fetch('contract.json');
// const data = await response.json();
// contract_instance = await new web3.eth.Contract(
//     data,
//     '0xd587327fDB7d9Bc1Dad875A5d31109eCe22F4F6d'
// );
// await getBalance();

//         const web3 = new Web3(window.ethereum);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };
//window.onload = main();
