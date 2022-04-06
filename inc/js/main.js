//import {questLang} from "./questLang.js";

const blockBtn = document.querySelectorAll(".monBlock");
const block = document.querySelectorAll(".block");
const navMon = document.querySelectorAll(".navMon");
const menu = document.querySelectorAll(".menu2");
const nameQuest = document.querySelector(".NameQuest");
const textQuest = document.querySelector(".TextQuest");
const codeQuest = document.querySelector(".CodeQuest");
const monitor = document.querySelector("#monitor");
const blockMon = document.querySelector(".blockMon");
const sel = document.querySelector("#sel");
const nextBut = document.querySelector("#nextBut");
const codeBlock = document.querySelector(".CodeBlock");
const subCode = document.querySelector(".SubCode");
const nextBtn = document.querySelector("#NextBtn");

const deactivation = () => {
	monitor.classList.remove('open');
	blockMon.classList.remove('hidden');
	codeBlock.classList.remove('hidden');
	subCode.classList.remove('hidden');
	navMon.forEach(item => item.classList.remove('open'));
	menu.forEach(item => item.classList.remove('open'));
	nextBut.style.display = 'flex';
	nextBtn.style.display = 'block';
	codeQuest.textContent = '';
	codeBlock.textContent = '';
}

blockBtn.forEach((btn,i)=>btn.addEventListener('click', () => {
	deactivation();
	nameQuest.textContent = block[i].textContent;
	let quest = questLang(block[i].textContent);
	textQuest.textContent = quest[0];
	if(quest[1] === '')
		blockMon.classList.add('hidden');
	else
		codeQuest.textContent = quest[1];
	monitor.style.display = 'none';
	sel.value = block[i].textContent;
}));

subCode.addEventListener('click', (e) => {
	e.preventDefault();
	codeBlock.textContent = "Проверяй сам себя!";
});

function select() {
	deactivation();
	nameQuest.textContent = sel.value;
	let quest = questLang(sel.value);
	textQuest.textContent = quest[0];
	if(quest[1] === '')
		blockMon.classList.add('hidden');
	else
		codeQuest.textContent = quest[1];
}

sel.addEventListener("change", () => {
	select();
	monitor.style.display = 'none';
});

nextBtn.addEventListener("click", (e) => {
	e.preventDefault();
	select();
});