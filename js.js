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




const Transaction = {
    all: [
        {
            description: 'luz',
            amount: -50000,
            date: '23/01/2022'
        },
    
        {
            description: 'Freela',
            amount: 70000,
            date: '23/01/2022'
        },
    
        {
            description: 'Cartao de Credito',
            amount: -30000,
            date: '23/01/2022'
        },
    ],

    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
        
    },

    remove(index){
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes(){

        let income = 0

        Transaction.all.forEach(transaction => {
            if(transaction.amount > 0){
                income += transaction.amount
            }
        })

        return income

    },
    expenses(){
        let expense = 0

        Transaction.all.forEach(transaction => {
            if(transaction.amount < 0){
                expense += transaction.amount
            }
        })
        
        return expense

    },
    total(){
        return Transaction.incomes() + Transaction.expenses()

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
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions(){
        DOM.transactionsContainer.innerHTML  = ""
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

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues(){
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
    },


    formatData(){

    },

    validateFilds(){
        const { description, amount, date} = Form.getValues()

        if(description.trim() === "" || amount.trim() === "" || date.trim() === ""){
            throw new Error("Por favor preencha todos os campos!")
        }
    },

    submit(event){
        event.preventDefault()

        try {
            Form.validateFilds()

        } catch (error){
            alert(error.message)
        }
        Form.formatData()
    }
}

const App = {
    init(){

        Transaction.all.forEach(transaction => {
            DOM.addtransaction(transaction)
        })
        
        DOM.updateBalance()
        
    },

    reload(){
        DOM.clearTransactions()
        App.init()
    },
}

App.init()
