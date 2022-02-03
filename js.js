const Modal = {
    open(){
        //abrir modal
        //adicionar a classe active ao modal
        document.querySelector('.modal-overlay').classList.add('active');
    },
    close(){
        //fechar o modal
        //remover a classe active do modal
        document.querySelector('.modal-overlay').classList.remove('active');

    }
}

const transactions = [
    {
        id: 1,
        description: 'luz',
        amount: -50000,
        date: '23/01/2022'
    },

    {
        id: 2,
        description: 'Freela',
        amount: 70000,
        date: '23/01/2022'
    },

    {
        id: 3,
        description: 'Cartao de Credito',
        amount: -30000,
        date: '23/01/2022'
    },
]


const transaction = {
    incomes(){

        let income = 0

        transactions.forEach(transaction => {
            if(transaction.amount > 0){
                income += transaction.amount
            }
        })

        return income

    },
    expenses(){
        let expense = 0

        transactions.forEach(transaction => {
            if(transaction.amount < 0){
                expense += transaction.amount
            }
        })
        
        return expense

    },
    total(){
        return transaction.incomes() + transaction.expenses()

    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addtransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction){

        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="remover transação">
        </td>`

        return html
    },

    updateBalance(){
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(transaction.incomes())
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(transaction.expenses())
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(transaction.total())


    }
}

const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g,"")
        
        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}


transactions.forEach(function(transaction){
    DOM.addtransaction(transaction)
})

DOM.updateBalance()