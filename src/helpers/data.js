import { getGlobal, setGlobal } from 'reactn';
export function saveData(params) {
    const { userSession } = getGlobal();
    return userSession.putFile(params.name, params.body, {encrypt: params.encrypt})
        .catch((error) => {
            console.log(error);
        })
}

export async function fetchData(params) {
    const { userSession } = getGlobal();
    return userSession.getFile(params.name, {decrypt: params.decrypt})
        .then(async (res) => {
            console.log(JSON.parse(res).length)
            await setGlobal({
                transactions: JSON.parse(res) || []
            })
            let transactions = getGlobal().transactions;
            if(transactions.map(a => a.amount)) {
                let amounts = transactions.map(a => a.amount);
                let balance = amounts.reduce(function(a, b) { return a + b; }, 0);
                setGlobal({ balance });
            } else {
                setGlobal({ balance: 0.00 })
            }
            return res
        }).catch(error => console.log(error))
}