function generate(){
	let genPass = [
		"ABCDEFGHIJKLMNOPQRSTUXYZ",
		"abcdefghijklmnopqrstuxyz",
		"0123456789",
		"~!@#$%^&*()_-+=][}{|\\/'\";.,><",
	];

	let length = Math.round(Math.random()*20)+5;
	let password = "";

	for(let i = 0; i<=length;i++){
		let k = Math.round(Math.random()*(genPass.length-1));
		let j = Math.round(Math.random()*(genPass[k].length-1));
		password += genPass[k][j];
	}
	return password;
}