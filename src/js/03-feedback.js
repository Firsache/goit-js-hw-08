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
    //     formData.email = form.value;
    // } else if (form.name === 'message') {
    //     formData.message = form.value;
    // }
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}
function onFormSubmit(evt) {
    evt.preventDefault();

    evt.currentTarget.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
}
function populateFormInput() {    
    try {
        let formElements = refs.formEL.elements;
        const savedUserInfo = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

        // console.dir(refs.formEL);
        if (savedUserInfo) {
            formElements.email.value = savedUserInfo.email || '';
            formElements.message.value = savedUserInfo.message||'';
        }                
    
        // ====================================================================
        //     my idea form a lecture is below
        // 
        // for (const field in savedUserInfo) {
        //     formElements[field].value = savedUserInfo[field] || '';
        // }
        // ====================================================================
        //     my first idea is below
        // 
        // if (savedUserInfo.email) {
        //     refs.formEL[0].value = savedUserInfo.email;
        // }
        // if (savedUserInfo.message) {
        //     refs.formEL[1].value = savedUserInfo.message;
        // }
    }
    catch (err) {
        console.log(err);
    }
}
refs.formEL.addEventListener('input', throttle(onFormInput, 500));
refs.formEL.addEventListener('submit', onFormSubmit);