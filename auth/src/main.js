const eye = document.querySelector(".eye");
const pass = document.querySelector("#password");
const test = document.querySelector("#test");
const test2 = document.querySelector("#test2");
const sub = document.querySelector("#auth");

function auth(){
    sub.value = "Зарегистрироваться";
    test2.textContent = 'Уже есть аккаунт? ';
    test.textContent = 'авторизуйтесь';
}

function reg(){
    sub.value = "Войти";
    test2.textContent = 'Если вы ещё не зарегистрированы, то ';
    test.textContent = 'зарегистрируйтесь';
}

eye.addEventListener("click", () => {
    eye.classList.toggle('cross');
    pass.type = pass.type === 'password' ? 'text' : 'password';
});
test.addEventListener("click",()=>{
    if(test.attributes[0].textContent === '#reg'){
        test.attributes[0].textContent = '#auth';
        reg();
    } else {
        test.attributes[0].textContent = '#reg';
        auth();
    }
});

document.addEventListener("DOMContentLoaded",()=>{
    if (document.location.hash === "#reg") {
        auth();
    } else {
        reg();
    }
});