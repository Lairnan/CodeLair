const form = document.querySelector(".formBox_inp");


form.innerHTML = 
'<div class="inp">'+
    '<img src="src/img/icon_login.svg">'+
    '<input type="text" name="login" id="login" required="">'+
    '<label for="login">Логин</label>'+
'</div>'+
'<div class="inp">'+
    '<img src="src/img/icon_email.svg">'+
    '<input type="mail" name="email" id="email" required="">'+
    '<label for="email">example@mail.ru</label>'+
'</div>'+
'<div class="inp">'+
    '<img src="src/img/icon_lock.svg">'+
    '<input type="password" name="password" id="password" class="password" required="" value="">'+
    '<label for="password">Пароль</label>'+
    '<img src="src/img/icon_eye.svg" class="eye"/>'+
'</div>'+
'<div class="inp">'+
    '<img src="src/img/icon_lock.svg">'+
    '<input type="password" name="password_confirm" id="password_confirm" class="password" required="" value="">'+
    '<label for="password_confirm">Повтор пароля</label>'+
    '<img src="src/img/icon_eye.svg" class="eye"/>'+
'</div>'+
'<p class="generator">Сгенерировать пароль</p>';

var eye = document.querySelectorAll(".eye");
var password = document.querySelectorAll(".password");
var pass = document.querySelector("#password");
var pass_conf = document.querySelector("#password_confirm");
var test = document.querySelector("#test");
var test2 = document.querySelector("#test2");
var sub = document.querySelector("#auth");
var email = document.querySelector("#email");
var login = document.querySelector("#login");
var mess = document.querySelector("#mess");
var gen = document.querySelector('.generator');

var log;
var pas;




test.addEventListener("click",()=>{
    if(document.location.hash === "#reg"){
        test.attributes[0].textContent = '#auth';
        auth();
        main_auth();
    } else {
        test.attributes[0].textContent = '#reg';
        reg();
        main_reg();
    }
});

document.addEventListener("DOMContentLoaded",()=>{
    if (document.location.hash === "#reg") {
        reg();
        main_reg();
    } else {
        auth();
        main_auth();
    }
});

function main_reg(){
    pass_conf.addEventListener("keyup",()=>{
        pass_conf.classList.remove("Valid");
        pass_conf.classList.remove("Invalid");
        if(pass_conf.value === ""){
            pass_conf.classList.remove("Invalid");
            pass_conf.classList.remove("Valid");
        }
        else if(pass_conf.value === pass.value) pass_conf.classList.add("Valid");
        else pass_conf.classList.add("Invalid");
    });
    pass.addEventListener("keyup",()=>{
        if(pass.value === ""){
            pass.style.borderBottomColor = "#D1D1D4";
            return;
        }
        let val = passwordCheck(pass.value);
        if(val === 1) pass.style.borderBottomColor = "#ff0000";
        else if(val === 2) pass.style.borderBottomColor = "#ffa200";
        else if(val === 3) pass.style.borderBottomColor = "#00ff00";
        pass_conf.classList.remove("Valid");
        pass_conf.classList.remove("Invalid");
        if(pass_conf.value === ""){
            pass_conf.classList.remove("Invalid");
            pass_conf.classList.remove("Valid");
        }
        else if(pass_conf.value === pass.value) pass_conf.classList.add("Valid");
        else pass_conf.classList.add("Invalid");
    });
    email.addEventListener("keyup",()=>{
        if(email.value === ""){
            email.style.borderBottomColor = "#D1D1D4";
            return;
        }
        email.style.borderBottomColor = "#D1D1D4";
        if(isEmailValid(email.value)){
            email.style.borderBottomColor = "#00ff00";
        } else {
            email.style.borderBottomColor = "#ff0000";
        }
    });
    login.addEventListener("keyup",()=>{
        if(login.value === ""){
            login.style.borderBottomColor = "#D1D1D4";
            return;
        }
        if(login.value.length > 4) login.style.borderBottomColor = "#00ff00";
        else login.style.borderBottomColor = "#ff0000";
    });
    gen.addEventListener("click",()=> {
        do{
            var password = generate();
            var val = passwordCheck(password);
        } while(val != 3);
        pass.value = password;
        pass_conf.value = password;
        pass.style.borderBottomColor = "#00ff00";
        pass_conf.classList.remove("Invalid");
        pass_conf.classList.remove("Valid");
        pass_conf.classList.add("Valid");
    });

    sub.addEventListener("click",(e)=>{
        e.preventDefault();
        mess.classList.add("hidden");
        let val = passwordCheck(pass.value);
        if(isEmailValid(email.value) && login.value.length>4 && (val === 2 || val === 3) && pass_conf.value === pass.value) {
            log = login.value;
            pas = pass.value;
            auth();
            main_auth();
        }
        else {
            if(pass_conf.value.length === 0){
                pass_conf.classList.remove("Invalid");
                pass_conf.classList.remove("Valid");
                mess.classList.remove("hidden");
                mess.textContent = "Поле не может быть пустым";
                pass_conf.classList.add("Invalid");
            } else if(pass_conf.value != pass.value) {
                pass_conf.classList.remove("Invalid");
                pass_conf.classList.remove("Valid");
                mess.classList.remove("hidden");
                mess.textContent = "Пароли не совпадают";
                pass_conf.classList.add("Invalid");
            }
            if(pass.value.length === 0){
                mess.classList.remove("hidden");
                mess.textContent = "Проверьте правильность полей";
                pass.style.borderBottomColor = "#ff0000";
            } else if(val === 1){
                mess.classList.remove("hidden");
                mess.textContent = "Пароль слабого уровня";
                pass.style.borderBottomColor = "#ff0000";
            }
            if(email.value.length === 0){
                mess.classList.remove("hidden");
                mess.textContent = "Проверьте правильность полей";
                email.style.borderBottomColor = "#ff0000";
            } else if(!isEmailValid(email.value)){
                mess.classList.remove("hidden");
                mess.textContent = "Не правильно введён Email";
                email.style.borderBottomColor = "#ff0000";
            }
            if(login.value.length === 0){
                mess.classList.remove("hidden");
                mess.textContent = "Проверьте правильность полей";
                login.style.borderBottomColor = "#ff0000";
            } else if(login.value.length < 5){
                mess.classList.remove("hidden");
                mess.textContent = "Логин не может быть меньше 5 символов";
                login.style.borderBottomColor = "#ff0000";
            }
        }
    });
}

function main_auth(){
    sub.addEventListener("click",(e)=>{
        e.preventDefault();
        if(login.value.length != 0 && pass.value.length != 0){
            if(login.value === log && pass.value === pas){
                alert("Вы авторизировались!");
                document.location.href = "../index.html";
            } else {
                if(login.value === "tester" && pass.value === "test123"){
                    alert("Вы авторизировались как тестер!");
                    document.location.href = "../index.html";
                }
                else if(pass.value != pas){
                    mess.classList.remove("hidden");
                    mess.textContent = "Не верно введён пароль";
                    pass.style.borderBottomColor = "#ff0000";
                }
                else if(login.value != log){
                    mess.classList.remove("hidden");
                    mess.textContent = "Не верно введён логин";
                    login.style.borderBottomColor = "#ff0000";
                }
            }
        } else {
            if(pass.value.length === 0){
                mess.classList.remove("hidden");
                mess.textContent = "Проверьте правильность полей";
                pass.style.borderBottomColor = "#ff0000";
            }
            if(login.value.length === 0){
                mess.classList.remove("hidden");
                mess.textContent = "Проверьте правильность полей";
                login.style.borderBottomColor = "#ff0000";
            }
        }
    });
}

function reg(){
    mess.classList.add("hidden");
    sub.value = "Зарегистрироваться";
    test2.textContent = 'Уже есть аккаунт? ';
    test.textContent = 'авторизуйтесь';
    form.innerHTML = 
    '<div class="inp">'+
        '<img src="src/img/icon_login.svg">'+
        '<input type="text" name="login" id="login" required="">'+
        '<label for="login">Логин</label>'+
    '</div>'+
    '<div class="inp">'+
        '<img src="src/img/icon_email.svg">'+
        '<input type="mail" name="email" id="email" required="">'+
        '<label for="email">example@mail.ru</label>'+
    '</div>'+
    '<div class="inp">'+
        '<img src="src/img/icon_lock.svg">'+
        '<input type="password" name="password" id="password" class="password" required="" value="">'+
        '<label for="password">Пароль</label>'+
        '<img src="src/img/icon_eye.svg" class="eye"/>'+
    '</div>'+
    '<div class="inp">'+
        '<img src="src/img/icon_lock.svg">'+
        '<input type="password" name="password_confirm" id="password_confirm" class="password" required="" value="">'+
        '<label for="password_confirm">Повтор пароля</label>'+
        '<img src="src/img/icon_eye.svg" class="eye"/>'+
    '</div>'+
    '<p class="generator">Сгенерировать пароль</p>';
    load();
}

function load(){
    let inp = document.querySelectorAll(".inp");
    let i = 0;
    setTimeout(function rem(){
        inp[i].classList.add('open');
        i++;
        if(inp[i] === undefined)
            return;
        else
            setTimeout(rem,250);
    },50);
    eye = document.querySelectorAll(".eye");
    password = document.querySelectorAll(".password");
    pass = document.querySelector("#password");
    pass_conf = document.querySelector("#password_confirm");
    test = document.querySelector("#test");
    test2 = document.querySelector("#test2");
    sub = document.querySelector("#auth");
    email = document.querySelector("#email");
    login = document.querySelector("#login");
    gen = document.querySelector('.generator');
    eye.forEach(btn=>btn.addEventListener("mousedown", () => {
        eye.forEach(btn=>btn.classList.toggle('cross'))
        password.forEach(btn=>btn.type = btn.type === 'password' ? 'text' : 'password')
    }));
    eye.forEach(btn=>btn.ondragstart = ()=>{return false});
}

const icon = document.querySelector(".icon");
icon.addEventListener("click",()=>document.location.href='../index.html');

function auth(){
    mess.classList.add("hidden");
    sub.value = "Войти";
    test2.textContent = 'Если вы ещё не зарегистрированы, то ';
    test.textContent = 'зарегистрируйтесь';
    form.innerHTML = 
    '<div class="inp">'+
        '<img src="src/img/icon_login.svg">'+
        '<input type="text" name="login" id="login" required="">'+
        '<label for="login">Логин</label>'+
    '</div>'+
    '<div class="inp">'+
        '<img src="src/img/icon_lock.svg">'+
        '<input type="password" name="password" id="password" class="password" required="" value="">'+
        '<label for="password">Пароль</label>'+
        '<img src="src/img/icon_eye.svg" class="eye"/>'+
    '</div>';
    load();
}

function passwordCheck(input)
{
    let expressions = [/[a-z]/, /[A-Z]/, /[0-9]/, /[!@#$%^&*()_+=\|/\.,:;\[\]{}-]/];
    let difficulty = 0;

    let diff = 0;

    for (var i = 0; i < expressions.length; i++)
        if (expressions[i].test(input))
            difficulty++;

    // Затем происходит анализ длины пароля и вычисленного ранее параметра сложности, на основании которых пользователь получает текстовую оценку сложности пароля
    if (input.length < 6 && difficulty < 3) diff = 1;
    if (input.length >= 6 && difficulty == 1) diff = 1;
    if (input.length >= 8 && difficulty >= 3) diff = 3;
    if (input.length >= 8 && difficulty < 3) diff = 2;
    if (input.length >= 6 && difficulty > 1 && difficulty < 4) diff = 2;
    if (input.length >= 6 && difficulty == 4) diff = 3;

    return diff;
}

function isEmailValid(email) {
    const emailRegexp = new RegExp(
        /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
    )

    return emailRegexp.test(email)
}