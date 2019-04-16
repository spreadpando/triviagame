function quizSet() {
	// make ajax call return quiz set as array of objects
	$.ajax({
		url: 'https://opentdb.com/api.php?amount=10&type=multiple',
		method: 'GET'
	}).then(function (a) {
		let quiz = [];
		let shuffle = (array) => {
			array.sort(() => Math.random() - 0.5);
		}
		for (var i in a.results) {
			let options = a.results[i].incorrect_answers;
			options.push(a.results[i].correct_answer);
			shuffle(options);





			let level = {
				"question": a.results[i].question,
				"correct": a.results[i].correct_answer,
				"choices": options,
			}
			quiz.push(level);
		}
		init(quiz);
	});

}

function questionSet(a, b) {
	$('#game').html('');
	question = "<h1 class='question'>" + a[b]["question"] + "</h1>";
	responses = a[b]["choices"];
	$('#game').append(question);
	for (var i in responses) {
		let div = $('<div>');
		div.html(responses[i]);
		div.attr('class', 'response');
		div.attr('id', responses[i]);
		$('#game').append(div);
	}


}

function checkResponse(answer, solution) {
	let correct = 0;
	let incorrect = 0;
	if (answer == solution) {
		$('#' + solution).css('background-color', 'green');
		correct++;
		$('#correct').html("correct: " + correct)
	}
	if (answer !== solution) {
		$('#' + solution).css('background-color', 'green');
		incorrect++;
		$('#incorrect').html("incorrect: " + incorrect)
	}
}

function init(quiz) {
	let quizIndex = 0;
	let i = 10;
	questionSet(quiz, quizIndex);
	const timer = () => {
		$('#clock').text(i);
		i--;
		if (i < 0) {
			clearInterval(stopWatch);
			checkResponse("x", quiz[quizIndex]['correct']);
			console.log("here");
			i = 10;
			quizIndex++;
			if (quizIndex < 10) {
				endTimer = setTimeout(function () {
					stopWatch = setInterval(timer, 1000);
					questionSet(quiz, quizIndex);
				}, 2000);
			} else {
				finish();
			}
		}
	}
	stopWatch = setInterval(timer, 1000);
	$(document).on('click', '.response', function () {
		clearInterval(stopWatch);
		checkResponse($(this).text(), quiz[quizIndex]['correct']);
		i = 10;
		quizIndex++;
		if (quizIndex < 10) {
			endTimer = setTimeout(function () {
				stopWatch = setInterval(timer, 1000);
				questionSet(quiz, quizIndex);
			}, 2000);
		} else {
			finish();
		}
	})
}


function finish() {


	quizSet();
}
quizSet();








// f{
// 	set up a question
// }

// f{
// 	init first question and counter to measure game progress
// }















// let response;
// let quizIndex;
// let quizSet = () => {
// 	$.ajax({
// 		url: 'https://opentdb.com/api.php?amount=10&type=multiple',
// 		method: 'GET'
// 	}).then(function (a) {
// 		response = a;
// 		quizIndex = 0
// 		init();
// 	});
// }
// quizSet();


// function init() {
// 	$('.level').html('');
// 	let level = $('<div>');
// 	level.attr('class', "level");
// 	let question = response.results[quizIndex]['question'];
// 	let choices = response.results[quizIndex]['incorrect_answers'];
// 	choices.push(response.results[quizIndex]['correct_answer']);
// 	let header = $('<h1>').html(question);
// 	for (var i in choices) {
// 		let choice = $('<div>');
// 		choice.attr('id', i);
// 		let label = $('<span>').html(choices[i]).attr('class', 'label');
// 		choice.on('click', function handleChoice() {
// 			if (correct === $(this).attr('id')) {
// 				$("#" + correct).css('background-color', 'green');

// 			} else {
// 				$("#" + correct).css('background-color', 'green');
// 			}
// 			quizIndex++;
// 			if (quizIndex <= 9) {
// 				init();
// 			} else {
// 				quizSet();
// 			}
// 		});
// 		choice.append(label);
// 		level.append(choice);
// 	}
// 	level.prepend(header);
// 	$('#game').append(level);
// }