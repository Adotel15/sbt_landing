let address = "";
const contract_address = "0xd587327fDB7d9Bc1Dad875A5d31109eCe22F4F6d";
let contract_instance;

const main = async () => {
  try {
    const web3 = new Web3(window.ethereum);
    const response = await fetch("contract.json");
    const data = await response.json();
    contract_instance = await new web3.eth.Contract(
      data,
      "0xd587327fDB7d9Bc1Dad875A5d31109eCe22F4F6d"
    );
    await getBalance();
  } catch (error) {
    console.error("Error:", error);
  }
};

const connectMetamask = async () => {
  if (!window.ethereum) {
    alert("Please install Metamask first.");
    return;
  } else {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      address = accounts[0];
      document.getElementById(
        "address"
      ).innerHTML = `<p>Wallet conectada</p> <p>${
        address.slice(0, 6) + "....." + address.slice(-6)
      }</p> `;
      document.getElementById("connect_button").style.display = "none";
    } catch (err) {
      console.log(err);
    }
  }
};

const getBalance = async () => {
  const balance = await contract_instance.methods.balanceOf(address).call();
  document.getElementById("balance").innerHTML = `<p>Balance: ${balance}</p>`;
};

window.onload = main();
