document.addEventListener("DOMContentLoaded", () => {
  let questionNumber = document.querySelector(".qnumber");
  let level = document.querySelector(".level");
  const question = document.querySelector(".question");
  const submit = document.querySelector("#submit");
  const select = document.getElementById("select");
  const answersContainer = document.getElementById("answer");
  const feedbackSection = document.getElementById("feedback");
  const quizcontainer = document.querySelector(".quizcontainer");
  let dataStorage = [];
  let userScore = 0;
  let questionIndex = 0;

  select.addEventListener("change", handleLanguage);

  function handleLanguage() {
    const selectedLanguage = select.value;

    select.style.display = "none";
    submit.style.display ="block"
    fetchData(selectedLanguage);
  }

  function fetchData(language) {
    const API_URL = `http://localhost:3000/${language}`;
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        dataStorage = data;
        loadQuiz(dataStorage);
      })
      .catch((error) => {
        console.log("Fetch error:", error);
      });
  }



  function loadQuiz(language) {
    // Display a single question based on questionIndex
    const element = language[questionIndex];

    questionNumber.textContent = `Question ${questionIndex + 1} of ${
      language.length
    }`;
    question.innerHTML = element.question;
    level.textContent = `Difficulty: ${element.difficulty}`;

    let options = element.options;

    answersContainer.innerHTML = ""; // Clear previous options when moving on to the next question
    options.forEach((option) => {
      const optionCard = document.createElement("div");
      optionCard.className = "options";
      optionCard.innerHTML = ` <input type="radio" class="input" name="answer" value="${option}"> ${option}`;
      answersContainer.appendChild(optionCard);
    });
  }

  function submitAnswer() {
    const selectedOption = document.querySelector(
      'input[name="answer"]:checked'
    );

    if (selectedOption) {
      const selectedValue = selectedOption.value;
      const correctAnswer = dataStorage[questionIndex].answer;

      //console.log("Your answer: " + selectedValue);
      const score = document.querySelector(".user-score");
      const correctFeed = document.querySelector(".correct-feed");
      const wrongFeed = document.querySelector(".wrong-feed");

      if (selectedValue === correctAnswer) {
        const totalScore = ++userScore;
        // score.textContent = `Score: ${totalScore}`;
      const totalScores = totalScore

        correctFeed.style.display = "block";
        correctFeed.innerHTML = `Correct <i class="fa-solid fa-circle-check wrong"></i>`;
        wrongFeed.style.display = "none";

        getRemarks(totalScores, dataStorage);
      } else {
        wrongFeed.style.display = "block";
        wrongFeed.innerHTML = `<b>INCORRECT</b> <i class="fa-solid fa-circle-xmark wrong"></i> <br>Correct answer:  ${correctAnswer}`;
        correctFeed.style.display = "none";
      }

      // Delay for 1 seconds 
      setTimeout(() => {
        questionIndex++;

        if (questionIndex < dataStorage.length) {
          loadQuiz(dataStorage);
        } else if(questionIndex === dataStorage.length){
          console.log("Quiz completed!");
          
          feedbackSection.style.display = "flex";
          quizcontainer.style.display = "none";

          resetQuiz();
        }
      }, 1000);
    } else {
      alert("Please select an answer.");
    }
  }
 

  function getRemarks(score, quizData) {
    const remarksContainer = document.querySelector("#remark");
  
    if (score === quizData.length) {
      const remarks =
        "Impressive! You aced it. Your knowledge shines. Ready for the next challenge?";
      remarksContainer.innerHTML = `<span class= "final-score">You Scored: ${score}.</span> <br> ${remarks}`;
    } else if (score >= quizData.length / 2 && score < quizData.length) {
      const remarks2 =
        "Good job! Solid effort. Review, and you'll excel even more next time.";
      remarksContainer.innerHTML = `<span class= "final-score">You Scored: ${score}.</span> <br> ${remarks2}`;
    } else if (score < quizData.length / 2){
      const remarks3 =
        "Keep going! Learn from errors. Your growth begins with each quiz attempt.";
      remarksContainer.innerHTML = `<span class= "final-score">You Scored: ${score}.</span> <br> ${remarks3}`;
    }
  }
  function resetQuiz() {
    // Reset quiz-related variables
    userScore = 0;
    questionIndex = 0;
    correctFeed.style.display = "none";
    wrongFeed.style.display = "none";
    loadQuiz(dataStorage);
  }
  submit.addEventListener("click", submitAnswer);
}); 


  function restartQuiz() {
    window.location.reload();
}
