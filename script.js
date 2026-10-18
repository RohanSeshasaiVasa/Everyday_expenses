const input = document.querySelector('#amount');
const button = document.querySelector('#amount-btn');
const output = document.querySelector('.output');
const category = document.querySelector('#category');
const totalPagereload = document.querySelector('#totals')
const reset = document.querySelector('#reset-btn');
const log = document.querySelector('#log');
const descriptionInput = document.querySelector('#description');
const themeBtn = document.querySelector('#theme-btn');
const filter = document.querySelector('#filter');
const search = document.querySelector('#search');
const logTitle = document.querySelector('#log-title');

const storedUserData = localStorage.getItem('myExpenses');
let expenditure;
if (storedUserData){
    expenditure = JSON.parse(storedUserData);
} else {
    expenditure = [];
}

function showTotals() {
    let totalamount = 0;
    const categoryTotals = {
        food: 0,
        travel: 0,
        purchases: 0,
        others: 0
    }

    log.innerHTML = '';

    for (let i = 0; i < expenditure.length; i++) {
        totalamount += expenditure[i].amount;
        categoryTotals[expenditure[i].category] += expenditure[i].amount;

        if (filter.value !== 'all' && expenditure[i].category !== filter.value) {
            continue;
        }

        const searchText = search.value.toLowerCase();
        const desc = (expenditure[i].description || '').toLowerCase();

        if (!desc.includes(searchText)) {
            continue;
        }

        const entry = document.createElement('li');
        let message = 'Added ₹' + expenditure[i].amount + ' into the category ' + expenditure[i].category + ' for todays expenses'
        if (expenditure[i].description) {
            message += ' - ' + expenditure[i].description;
        }
        entry.textContent = message;
        if (expenditure[i].pinned) {
            entry.classList.add('pinned');
            log.prepend(entry);
        } else {
            log.appendChild(entry);
        }
        
        const del = document.createElement('button');
        del.textContent = "\u{1F5D1}";
        entry.appendChild(del);
        del.addEventListener('click', function() {
            if (confirm('Do you want to delete this expense ?')) {
                expenditure.splice(i,1);
                localStorage.setItem('myExpenses', JSON.stringify(expenditure));
                showTotals();
            }
        });

        const edit = document.createElement('button');
        edit.textContent = "\u270F";
        entry.appendChild(edit);
        edit.addEventListener('click', function() {
            while (true) {
                const typedAmount = prompt('What is the amount ?');
                if (typedAmount === null){
                    break;
                }

                const changedAmount = Number(typedAmount);
                if (typedAmount > 0) {
                    expenditure[i].amount = changedAmount;
                    break;
                }
                alert('Please enter a valid amount');
            }
            const allowedCategories = ['food', 'travel', 'purchases', 'others'];
            
            while(true) {
                const typedCategory = prompt('Which category? (food, travel, purchases, others)', expenditure[i].category);
                if (typedCategory === null){
                    break;
                }
                if (allowedCategories.includes(typedCategory)){
                    expenditure[i].category = typedCategory;
                    break;
                }
                alert('Please type food, travel, purchases or others')
            }

            const typedDescription = prompt('What is your description on this log', expenditure[i].description);
            if(typedDescription !== null) {
                expenditure[i].description = typedDescription;
            }
            
            localStorage.setItem('myExpenses', JSON.stringify(expenditure));
            showTotals();
        });
        const pin = document.createElement('button');
        pin.textContent = "📌";
        pin.className = 'pin-btn';
        pin.title = 'Pin to top';
        entry.appendChild(pin);
        pin.addEventListener('click', function() {
            expenditure[i].pinned = !expenditure[i].pinned;
            localStorage.setItem('myExpenses', JSON.stringify(expenditure));
            showTotals();
        });
    }
    console.log(totalamount);
    console.log(categoryTotals);
    totalPagereload.innerText = 'Total money spent ₹' + totalamount + '\nMoney spent on food is ₹' + categoryTotals.food + '\nMoney spent on travelling is ₹' + categoryTotals.travel + '\nMoney spent on purchases is ₹' + categoryTotals.purchases + '\nMoney spent on other things is ₹' + categoryTotals.others;
    logTitle.textContent = 'Log (' + expenditure.length + ' expenses)';
}

showTotals();

button.addEventListener('click', function() {
    let numericamount = Number(input.value);

    if (input.value == 0 || input.value <= 0) {
        output.textContent = 'Please enter a valid amount';
        input.classList.add('shake');
        setTimeout(function() {
            input.classList.remove('shake');
        }, 400);
    } else {
        const expense = {
            amount: numericamount,
            category: category.value,
            description: descriptionInput.value
        }
        expenditure.push(expense);
        console.log(expenditure);
        localStorage.setItem('myExpenses', JSON.stringify(expenditure));
        showTotals();
        coinBurst();
        output.innerText = 'Added ₹' + input.value + ' into the category ' + category.value + ' for todays expenses';
        input.value = '';
        descriptionInput.value = '';       
    }
});

reset.addEventListener('click', function() {
    if (confirm('Do you really want to delete all the expenses ? This cannot be undone !')) {
        blackHole();
        
        setTimeout(function() {
            expenditure = [];
            localStorage.removeItem('myExpenses');
            showTotals();
            output.textContent = 'All expenses cleared';
        });
    }
});

themeBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark');
});

filter.addEventListener('change', function() {
    showTotals();
});

search.addEventListener('input', function() {
    showTotals();
});


const keypadButtons = document.querySelectorAll('#keypad button');

for (const key of keypadButtons) {
    key.addEventListener('click', function() {
        if (key.classList.contains('backspace')) {
            input.value = input.value.slice(0, -1);
        } else {
            input.value += key.textContent;
        }
    });
}

function coinBurst() {
    const rect = button.getBoundingClientRect();
    const startX = rect.left + rect.width/2;
    const startY = rect.top + rect.height/2;

    for (let n=0; n<10; n++) {
        const coin = document.createElement('div');
        coin.className = 'coin';
        coin.textContent = '₹';
        coin.style.left = startX + 'px';
        coin.style.top = startY + 'px';
        const dx = (Math.random() - 0.5) * 240;
        const up = -(60 + Math.random() * 100);
        const spin = (Math.random() - 0.5) * 720;

        coin.style.setProperty('--dx', dx + 'px');
        coin.style.setProperty('--up', up + 'px');
        coin.style.setProperty('--spin', spin + 'deg');
        document.body.appendChild(coin);
        setTimeout(function() {
            coin.remove();
        }, 1000);
    }
}

function blackHole() {
    const target = reset.getBoundingClientRect();
    const targetX = target.left + target.width /2;
    const targetY = target.top + target.height/2;

    const vortex = document.createElement('div');
    vortex.className = 'vortex';
    vortex.style.left = targetX + 'px';
    vortex.style.top = targetY + 'px';
    document.body.appendChild(vortex);
    setTimeout(function() {
        vortex.remove;
    }, 1400);

    const entries = log.querySelectorAll('li');
    for (let n=0; n <entries.length; n++) {
        const rect = entries[n] = entries[n].getBoundingClientRect();
        const copy = entries[n].cloneNode(true);

        copy.className = 'flying';
        copy.style.left = rect.left + 'px';
        copy.style.top = rect.top + 'px';
        copy.style.width = rect.width + 'px';

        const dx = targetX - (rect.left + rect.width /2);
        const dy = targetY - (rect.top + rect.height/2);
        copy.style.setProperty('--dx', dx +'px');
        copy.style.setProperty('--dy', dy + 'px');
        copy.style.animationDelay = Math.min(n* 0.05, 0.5) + 's';
        document.body.appendChild(copy);
        entries[n].style.visibility = 'hidden';
        setTimeout(function() {
            copy.remove();
        }, 1300);
    }
}