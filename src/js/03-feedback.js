import throttle from "lodash.throttle";

const refs = {
    formEL: document.querySelector('.feedback-form'),
}
const LOCALSTORAGE_KEY = "feedback-form-state";

populateFormInput();

let formData = {};
function onFormInput(evt) {
    
    let form = evt.target;
    formData[form.name] = form.value;
    // ====================================================================
    //     my first idea is below
    // 
    // if (form.name === 'email') {
    //     formInfo.email = form.value;
    // } else if (form.name === 'message') {
    //     formInfo.message = form.value;
    // }
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}
function onFormSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);

    
    // localStorage.getItem(LOCALSTORAGE_KEY) || "";
}
function populateFormInput() {
    let savedUserInfo;
    let formElement = refs.formEL.elements;

    try {
        savedUserInfo = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    }
    catch (err) {
        console.log(err);
    }
        
    // console.dir(refs.formEL);
    if (savedUserInfo) {
        formElement.email.value = savedUserInfo.email || '';
        formElement.message.value = savedUserInfo.message||'';
    }
    // ====================================================================
    //     my first idea is below
    // 
    // if (savedUserInfo.email) {
    //     refs.form[0].value = savedUserInfo.email;
    // }
    // if (savedUserInfo.message) {
    //     refs.form[1].value = savedUserInfo.message;
    // }
}
refs.formEL.addEventListener('input', throttle(onFormInput, 500));
refs.formEL.addEventListener('submit', onFormSubmit);