const popup_trigger = document.querySelector('.buy-tickets-form-button button');
const popup = document.querySelector('.tickets-popup');
const overlay = document.querySelector('.overlay');
const overlay_x = document.querySelector('.tickets-popup-form-x');

popup_trigger.onclick = () => {
    popup.style.left = '50%'
    popup.style.transform = 'translateX(-50%)'
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
    overlay.style.zIndex = '25'
}

[overlay, overlay_x].map(el => {
    el.onclick = () => {
        popup.style.left = '-5000px'
        popup.style.transform = 'none'
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.0)'
        overlay.style.zIndex = '-5'
    }
})

const ticketsType = document.querySelectorAll('.tickets-type-input');
const ticketsTotal = document.querySelector('.buy-tickets-form-amount-total span');
const basicInput = document.querySelector('#basic-input');
const seniorInput = document.querySelector('#senior-input');
const inputButtons = document.querySelectorAll('.input-btn');
const entryButtons = document.querySelectorAll('.entry-btn');
const entryBasicInput = document.querySelector('#entry-basic-input');
const entrySeniorInput = document.querySelector('#entry-senior-input');
const entryTicketType = document.querySelector('#ticket-type');
const entryTicketTypeOptions = document.querySelectorAll('.ticket-type-option');
const ticketsBuyButton = document.querySelector('.buy-tickets-form-button button');
const ticketInfoType = document.querySelector('.ticket-info-type');
const ticketInfoBasicPrices = document.querySelectorAll('.ticket-info-basic-price');
const ticketInfoSeniorPrices = document.querySelectorAll('.ticket-info-senior-price');
const ticketInfoBasicAmount = document.querySelector('.ticket-info-basic-amount');
const ticketInfoSeniorAmount = document.querySelector('.ticket-info-senior-amount');
const ticketInfoBasicTotal = document.querySelector('.ticket-info-basic-total');
const ticketInfoSeniorTotal = document.querySelector('.ticket-info-senior-total');
const ticketInfoTotal = document.querySelector('.ticket-info-total');
const formDate = document.querySelector('#date');
const formTime = document.querySelector('#time');

let typeValue = 20;
let discount = 0.5;
let params = {};

if (localStorage.getItem('tickets')) {
    params = JSON.parse(localStorage.getItem('tickets'));
    basicInput.value = params.basic;
    seniorInput.value = params.senior;
    entryBasicInput.value = params.basic;
    entrySeniorInput.value = params.senior;
    typeValue = params.type;
    setCurrentParams();
}

document.addEventListener('DOMContentLoaded', () => {
    ticketsBuyButton.addEventListener('click', blockPastDate);
    formDate.addEventListener('change', onDateChange);
    formTime.addEventListener('change', onTimeChange);
    entryTicketType.addEventListener('change', onSelectChange);
    ticketsBuyButton.addEventListener('click', setCurrentParams);
    ticketsType.forEach(el => el.addEventListener('click', setTypeValue));
    inputButtons.forEach(el => el.addEventListener('click', getTotalPrice));
    entryButtons.forEach(el => el.addEventListener('click', onEntryBtns));
});

function onDateChange() {
    let date = new Date(formDate.value);
    let dateFormat = date.toLocaleDateString('en-US', { month: 'long', day: '2-digit', weekday: 'long', }).split(' ');
    document.querySelector('.ticket-info-date').innerHTML = `${dateFormat[0]} ${dateFormat[1]} ${dateFormat[2]}`

    if (formDate.value.length) {
        document.querySelector('.hide-date').style.display = 'none';
        formDate.style.color = '#000000'
    }
}

function onTimeChange() {
    document.querySelector('.hide-time').style.display = 'none';
    document.querySelector('.ticket-info-time').innerHTML = formTime.value;
    formTime.style.color = '#000000';
}

function blockPastDate() {
    let currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let year = currentDate.getFullYear();
    if (month < 10) month = '0' + month.toString();
    if (day < 10) day = '0' + day.toString();
    let maxDate = year + '-' + month + '-' + day;
    formDate.setAttribute('min', maxDate)
}

function setTypeValue() {
    ticketsType.forEach(el => {
        if (el.checked) typeValue = +el.dataset.price;
        getTotalPrice();
        saveParams(typeValue, basicInput.value, seniorInput.value);
    })
}

function getTotalPrice() {
    ticketsTotal.innerHTML = typeValue * +basicInput.value + typeValue * discount * +seniorInput.value;
    saveParams(typeValue, basicInput.value, seniorInput.value);
}

function saveParams(type, basicVal, seniorVal) {
    params = {
        basic: basicVal,
        senior: seniorVal,
        type: type,
    }
    localStorage.setItem("tickets", JSON.stringify(params));
}

function setCurrentParams() {
    ticketsType.forEach(el => el.removeAttribute('checked'));
    entryTicketTypeOptions.forEach(el => el.removeAttribute('selected'));
    ticketsType.forEach(el => {
        if (+el.dataset.price === params.type) el.setAttribute('checked', 'checked');
    })
    entryTicketTypeOptions.forEach(el => {
        if (+el.dataset.price === params.type) el.setAttribute('selected', 'selected');
    })
    ticketInfoType.innerHTML = params.type === 20 ? 'Permanent exhibition' : params.type === 25 ? 'Temporary exhibition' : 'Combined Admission'
    ticketInfoBasicPrices.forEach(el => el.innerHTML = params.type);
    ticketInfoSeniorPrices.forEach(el => el.innerHTML = params.type * discount);
    entryBasicInput.value = params.basic;
    entrySeniorInput.value = params.senior;
    ticketInfoBasicAmount.innerHTML = params.basic;
    ticketInfoSeniorAmount.innerHTML = params.senior;
    ticketInfoBasicTotal.innerHTML = +params.basic * params.type + '€';
    ticketInfoSeniorTotal.innerHTML = +params.senior * params.type * discount + '€';
    ticketInfoTotal.innerHTML = params.type * params.basic + params.type * params.senior * discount + '€';
}

function onSelectChange() {
    let currentPrice = +entryTicketType.options[entryTicketType.selectedIndex].dataset.price;
    saveParams(currentPrice, entryBasicInput.value, entrySeniorInput.value);
    setCurrentParams();
}

function onEntryBtns() {
    saveParams(typeValue, entryBasicInput.value, entrySeniorInput.value);
    setCurrentParams();
}

function onCloseForm() {
    setCurrentParams();
    basicInput.value = params.basic;
    seniorInput.value = params.senior;
    ticketsTotal.innerHTML = params.type * params.basic + params.type * params.senior * discount;
}

getTotalPrice();


const ticketForm = document.forms['ticketsPopupForm'];
const validateInputs = document.querySelectorAll('.input-validation');

const validationSchema = {
    name: {
        regexp: /^[a-zA-Zа-яА-Я \s]{3,15}$/gi,
        message: 'Incorrect name or field is empty!',
    },
    email: {
        regexp: /^[A-za-z0-9\-\_]{3,15}@\w+([\.-]?[a-zA-Z]{3,})(\.[a-zA-Z]{2,})+$/ig,
        message: 'Incorrect email or field is empty!'
    },
    tel: {
        regexp: /^[ -]*([0-9][ -]*){1,10}$/,
        message: 'Incorrect phone number or field is empty!'
    }
}

validateInputs.forEach((item) => {
    item.addEventListener('blur', validateForm)
});

function validateForm(event) {
    const input = event.target || event;
    const error = validationSchema[input.name].message;
    const regExp = validationSchema[input.name].regexp;

    const isValid = input.value.match(regExp);
    if (!input.required) return;

    if (!isValid) {
        input.nextElementSibling.innerHTML = error;
        input.parentNode.classList.add('error');
        return false;
    } else {
        input.nextElementSibling.innerHTML = '';
        input.parentNode.classList.remove('error');
        return true;
    }
};

ticketForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();
    const inputErrors = [];
    const inputValues = {};

    validateInputs.forEach((input) => {
        const isValid = validateForm(input);
        if (!isValid) {
            inputErrors.push(input);
            return;
        }
        inputValues[input.name] = input.value;
        console.log('FORM IS VALIDATED!!!');
    });
}
