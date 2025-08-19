let des = document.getElementById("des")
let num = document.getElementById("num")
let res = document.getElementById("result")
let balance = document.getElementById("balance-amt")
let income_var = document.getElementById("income-amt")
let expense = document.getElementById("exp-amt")

let array = JSON.parse(localStorage.getItem("total")) || [];

// Using one array
// function add(){
//     let value=parseInt(num.value)
//     array.push({descript:des.value,amount:value})
//     localStorage.setItem("total", JSON.stringify(array));
//     show()
// }

// function show(){
//     let bal=0
//     let inc=0
//     let exp=0


//      res.innerHTML=""
//      array.forEach((e,i)=>{
//         bal+=e.amount
//         if(e.amount>=0){
//             inc+=e.amount
//         }
//         else{
//             exp+=e.amount
//         }



//         let div=document.createElement("div")
//         let sp1=document.createElement("span")
//         let sp2=document.createElement("span")
//         let btn=document.createElement("button")
//         btn.textContent="click"
//         sp1.textContent=e.descript
//         sp2.textContent=e.amount

//         div.append(sp1)
//         div.append(sp2)
//         div.append(btn)
//         res.append(div)

//         btn.addEventListener("click",(()=>{
//             btn.parentElement.style.display="none"
//             array.splice(i,1)
//             localStorage.setItem("total",JSON.stringify(array))
//             show()
//         }))


//         balance.textContent=bal
//         income_var.textContent=inc
//         expense.textContent=Math.abs(exp)
//     })
// }

// window.onload=function(){
//     show()
// }
// Using one array

let income = JSON.parse(localStorage.getItem("income")) || [];
let expe = JSON.parse(localStorage.getItem("expense")) || [];
let details = JSON.parse(localStorage.getItem("detail")) || [];

// Add Transaction btn used to:
// to do add values in income or expense and balance 
// to show des and amount
// Adds everything in local storage

function add() {
    let value = parseInt(num.value)
    let des_value=des.value
    // Validation
    if (des.value.trim() === "") {
        alert("Enter Description")
    }
    else if (isNaN(value)) {
        alert("Enter Valid Amount")
    }
    else {
        num.value=""
        des.value=""
        // Total Balance
        array.push(value)
        localStorage.setItem("total", JSON.stringify(array))
        // Details
        details.push({ description: des_value, amount: value })
        localStorage.setItem("detail", JSON.stringify(details))
        // Income
        if (value >= 0) {
            income.push(value)
            localStorage.setItem("income", JSON.stringify(income))
        }
        // Expense
        else {
            expe.push(value)
            localStorage.setItem("expense", JSON.stringify(expe))
        }
        show()
    }
}


function show() {
    let total = array.reduce((a, b) => a + b, 0)
    let inc = income.reduce((a, b) => a + b, 0)
    let exp = expe.reduce((a, b) => a + b, 0)

    balance.textContent = total
    income_var.textContent = inc
    expense.textContent = Math.abs(exp)

    res.innerHTML = ""
    details.forEach((e, i) => {
        let div = document.createElement("div")
        let span_des = document.createElement("span")
        span_des.classList.add("spand")
        let span_amt = document.createElement("span")
        span_amt.classList.add("spana")
        let btn = document.createElement("span")
        btn.classList.add("button")
        btn.innerHTML = `<i class="fa-solid fa-xmark"></i>`
        span_des.textContent = e.description+" - "
        span_amt.textContent = e.amount
        div.append(span_des)
        div.append(span_amt)
        div.append(btn)
        res.append(div)
        if (e.amount >= 0) {
            div.classList.add("inc")
            div.classList.remove("exp")
        }
        else {
            div.classList.add("exp")
            div.classList.remove("inc")
        }

        // the btn is used to
        // remove  values from income or expense and total balance from local storage,arr
        // to remove the description and details from local storage,array and displey
        // Update the new text content in all sections

        btn.addEventListener("click", (() => {
            // Details
            details.splice(i, 1)
            localStorage.setItem("detail", JSON.stringify(details))
            btn.parentElement.style.display = "none"

            // Total 
            array.splice(i, 1)

            // Income
            let ind = income.indexOf(e.amount)
            if (ind >= 0) {
                income.splice(ind, 1)
            }
            // Expense
            let indi = expe.indexOf(e.amount)
            if (indi >= 0) {
                expe.splice(indi, 1)
            }
            localStorage.setItem("total", JSON.stringify(array));
            localStorage.setItem("income", JSON.stringify(income));
            localStorage.setItem("expense", JSON.stringify(expe));
            show()
        }))
    })
}

window.onload = function () {
    show()
}




