import { setGlobal, getGlobal } from 'reactn';
import { saveData, fetchData } from './data';
const uuid = require('uuidv4');
const axios = require('axios');
let price;

export async function loadTransactions() {
    let params = {
        name: "transactions.json", 
        decrypt: true
    }
    let data = await fetchData(params);
    console.log(data);
}

export async function saveTransaction(props) {
    await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then((response) => {
            price = response.data.bpi.USD.rate
        })
    let date = props.date.getDate();
    let month = props.date.getMonth() + 1;
    let year = props.date.getFullYear();
    let fullDate = `${month}/${date}/${year}`
    let name = document.getElementById('transaction-name').value;
    let amount = document.getElementById('transaction-amount').value;
    let id = uuid();
    let balance = await getGlobal().balance;
    setGlobal({ transactionModalOpen: false });
    if(props.value === "credit") {
        console.log("credit transaction");
        balance = (balance + parseFloat(amount));
    } else {
        console.log("debit transaction")
        balance = (balance - parseFloat(amount));
    }
    setGlobal({ balance });
    let transaction = {
        date: fullDate, 
        name, 
        amount,
        type: props.type,
        balance,
        id, 
        btcPrice: parseInt(price), 
        btcEquivalent: props.type === "credit" ? (parseInt(amount)/parseInt(price)) : 0.00
    }

    await setGlobal({
        transactions: [...getGlobal().transactions, transaction ], balance: transaction.balance
    });
    let params = {
        name: "transactions.json", 
        body: JSON.stringify(getGlobal().transactions),
        encrypt: true
    }
    let data = await saveData(params);
    console.log(data);
}

export async function deleteTransaction(transaction) {
    let transactions = getGlobal().transactions;
    let index = await transactions.map((x) => {return x.id }).indexOf(transaction.id);
    transactions.splice(index, 1);
    await setGlobal({transactions});
    if(transactions.map(a => a.amount)) {
        let amounts = transaction.map(a => a.amount);
        let balance = amounts.reduce(function(a, b) { return a + b; }, 0);
        setGlobal({ balance });
    } else {
        setGlobal({ balance: 0.00 })
    }
    let params = {
        name: "transactions.json", 
        body: JSON.stringify(getGlobal().transactions),
        encrypt: true
    }
    let data = await saveData(params);
    console.log(data);
}