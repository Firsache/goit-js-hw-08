import throttle from "lodash.throttle";

const refs = {
    form: document.querySelector('.feedback-form'),
    messageTextArea: document.querySelector('.feedback-form textarea')
}
const LOCALSTORAGE_KEY = "feedback-form-state";

populateFormInput();
let formInfo = {email:'',message:''};
function onFormInput(evt) {
    
    let form = evt.target;
    
    if (form.name === 'email') {
        formInfo.email = form.value;
    } else if (form.name === 'message') {
        formInfo.message = form.value;
    }
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formInfo));
}
function onFormSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);

    // form.elements.message.value
    // localStorage.getItem(LOCALSTORAGE_KEY) || "";
}
function populateFormInput() {
    const savedUserInfo = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    
    if (savedUserInfo.email) {
        refs.form[0].value = savedUserInfo.email;
    }
    if (savedUserInfo.message) {
        refs.form[1].value = savedUserInfo.message;
    }
}
refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);