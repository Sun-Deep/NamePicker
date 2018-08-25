let participants = [];
let selectedParticipant;
let fileUpload = false;
let allParticipants = [];
let m;

let questions = ["'Do no evil' is tagline of ......?",
"Which one is the first search engine in internet?",
"Which one is the first web browser invented in 1990?",
"1024 bit is equal to how many byte?",
"Full form of YAHOO?",
"First computer virus is known as?",
"Which IT company's nickname is 'The Big Blue'?",
"What is the full form of IEEE?",
"Citizen who use internet are called...?",
"What is Scareware?",
"Along with whom did Bill Gates found Microsoft?",
"When was the first smart phone launched?",
"Which day is celebrated as world Computer Literacy Day?",
"What is the full form of png?",
"Which key combination is known as 'Three finger salute' in computer?",
"Where is the headquater of Microsoft office located?",
"Who is known as 'Father of Internet'?",
"What is the full form of 'SMS'?",
"What is the full form of 'Li-Fi' Network?",
"The world's first $1 trillion tech company is...?",
"What is the full form of 'B.Sc.CSIT'?"];

let answer = [
"Google",
"Archie",
"Nexus",
"128 byte",
"Yet Another Hierarchial Officious Oracle",
"Creeper",
"IBM",
"Institute of Electric and Electronic Engineers",
"Netizen",
"Fake Antivirus Software",
"Paul Allen",
"1992 (IBM Simon)",
"December 2",
"Portable Network Graphics",
"Ctrl + Alt + Del",
"Washington",
"Vinton Gray Cerf",
"Short Message Service",
"Light Fidelity",
"Apple",
"Bachelor of Science in Computer Science and Information Technology"
];


function closeModal(id) {
  let modal = document.getElementById(id);
  modal.style.display = "none";
}

function openModal(id) {
  let modal = document.getElementById(id);
  modal.style.display = "block";
}

//function to convert into text
function getAsText(fileToRead){
	let reader = new FileReader();
	reader.readAsText(fileToRead);
	reader.onload = loadHandler;
	reader.onerror = errorHandler;
}


// function to get file
function getFile(files){
	console.log(1);
	if(window.FileReader){
		getAsText(files[0]);
		fileUpload = true;
	}else{
		alert('File not supported');
	}
}

function loadHandler(event){
	let csv = event.target.result;
	processData(csv);
}

function processData(csv){
	let allTextLines = csv.split(/\r\n|\n/);
	for(let i = 0; i < allTextLines.length; i++){
		let row = allTextLines[i].split(';');
		// let col = [];
		// col.push(row[0]);
		participants.push(row[0]);
	}
	console.log(participants);
	// participants.push(col);
}

function errorHandler(event){
	if(event.target.error.name == "NotReadableError"){
		alert('Cannot read file');
	}
}

function randomParticipant(){
	if(!fileUpload){
		alert('File is not uploaded');
	}else if(participants.length === 0){
		alert('File is empty');
	}else{
		let min = 0;
		let max = participants.length-1;
		let selectIndex = Math.floor(Math.random() * (max - min + 1)) + min;
		console.log(selectIndex);
		selectedParticipant = participants[selectIndex];
		// console.log(selectedParticipant.split(','));
		let name = selectedParticipant.split(',');
		displaySelected(name[0]);
		allParticipants.push(name[0]);
		showAllParticipants();
		if( selectIndex > -1){
			participants.splice(selectIndex , 1);
		}
	}
}

function displaySelected(name){
	$('#display-participant').html(name);

}

function showAllParticipants() {
    let content = "<h4>Selected Participants</h4>";
    content += "<ul>";
    for (let i = 0; i < allParticipants.length; i++) {
      content += "<li>";
      content += allParticipants[i];
      content += "</li>";
    }
    content += "</ul>";
    content += "<p><a onClick=\"location.reload()\" class=\"btn btn-info\" href=\"#\" role=\"button\">Reset</a></p>";

    $("#all-participants").html(content);
}

function displayQuestion(n){
	m = n - 1;
	$('#ans').html('');
	$('#display-question').html('');
	$('#display-question').html("Question: "+questions[n-1]);

}

function displayAns(){
	$('#ans').html("("+answer[m]+")");
}