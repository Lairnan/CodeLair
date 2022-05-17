
const submit = document.querySelector('input[type="submit"]');
submit.addEventListener("click",(e)=>{
    e.preventDefault();
    alert("Not working now!");
});

const leftBar = document.querySelectorAll('.profile__left__bar>*');
leftBar.forEach((btn,i)=>btn.addEventListener("click",(e)=>{
    e.preventDefault();
    let url = new URLSearchParams(document.location.search);
    switch(btn.attributes.href.textContent){
        case('?set=prof'):
            window.history.pushState("New location","Change location",document.location.pathname + "?set=prof");
            prof();
            break;
        case('?set=acc'):
            window.history.pushState("New location","Change location",document.location.pathname + "?set=acc");
            acc();
            break;
        default:
            console.log("Ошибка");
            break;
    }
}));

document.addEventListener("DOMContentLoaded",()=>{
    let url = new URLSearchParams(document.location.search);
    console.log(url);
    console.log(url.get('set'));
    switch(url.get('set')){
        case('prof'):
            prof();
            break;
        case('acc'):
            acc();
            break;
    }
});

const rightBar = document.querySelector('.profile__right__bar>form');
let button = '<div class="profile__block">\n' +
                '<input type="submit" id="submit" name="submit" value="Сохранить"/>\n' +
            '</div>';
const prof = () => {
    rightBar.innerHTML = '<div class="profile__block">\n' +
                            '<input type="text" id="login" name="login" required="">\n' +
                            '<label for="login">Логин</label>\n' +
                        '</div>' +
                        '<div class="profile__block">\n' +
                            '<input type="text" id="name" name="name" required="">\n' +
                            '<label for="name">Имя</label>\n' +
                        '</div>' +
                        '<div class="profile__block">\n' +
                            '<input type="text" id="surname" name="surname" required="">\n' +
                            '<label for="surname">Фамилия</label>\n' +
                        '</div>' +
                        '<div class="profile__block">\n' +
                            '<input type="mail" id="email" name="email" required="">\n' +
                            '<label for="email">Почта</label>\n' +
                        '</div>'
                        + button;
};

const acc = () => {
    rightBar.innerHTML = '<div class="profile__block">\n' +
                            '<input type="text" id="password" name="password" required="">\n' +
                            '<label for="password">Пароль</label>\n' +
                        '</div>' +
                        '<div class="profile__block">\n' +
                            '<input type="text" id="password_confirm" name="password_confirm" required="">\n' +
                            '<label for="password_confirm">Повторите пароль</label>\n' +
                        '</div>'
                        + button;
};