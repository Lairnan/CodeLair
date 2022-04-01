import {questLang} from "./questLang.js";

const blockBtn = document.querySelectorAll(".monBlock");
const block = document.querySelectorAll(".block");
const navMon = document.querySelectorAll(".navMon");
const menu = document.querySelectorAll(".menu2");
const nameQuest = document.querySelector(".NameQuest");
const textQuest = document.querySelector(".TextQuest");
const codeQuest = document.querySelector(".CodeQuest");
const monitor = document.querySelector("#monitor");
const blockMon = document.querySelector(".blockMon");

const deactivation = () => {
	monitor.classList.remove('open');
	blockMon.classList.remove('hidden');
	navMon.forEach(item => item.classList.remove('open'));
	menu.forEach(item => item.classList.remove('open'));
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
}));