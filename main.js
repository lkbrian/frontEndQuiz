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

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
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

    answersContainer.innerHTML = ""; // Clear previous options
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
        score.textContent = `Score ${totalScore}`;
      const totalScores = totalScore

        correctFeed.style.display = "block";
        correctFeed.textContent = "Correct!";
        wrongFeed.style.display = "none";

        getRemarks(totalScores, dataStorage);
      } else {
        wrongFeed.style.display = "block";
        wrongFeed.innerHTML = `Incorrect <br>Correct answer:  ${correctAnswer}`;
        correctFeed.style.display = "none";
      }

      // Delay for 2 seconds 
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
      remarksContainer.textContent = `Your score is ${score}.  ${remarks}`;
    } else if (score >= quizData.length / 2 && score < question.length) {
      const remarks2 =
        "Good job! Solid effort. Review, and you'll excel even more next time.";
      remarksContainer.textContent = `Your score is ${score}.  ${remarks2}`;
    } else {
      const remarks3 =
        "Keep going! Learn from errors. Your growth begins with each quiz attempt.";
      remarksContainer.textContent = `Your score is ${score}.  ${remarks3}`;
    }
  }
  function resetQuiz() {
    // Reset quiz-related variables
    userScore = 0;
    questionIndex = 0;

    loadQuiz(dataStorage);
  }
  submit.addEventListener("click", submitAnswer);
}); 


  function restartQuiz(feedbackId,quizcontainerid,selectId) {
    document.querySelector(feedbackId).style.display = "none";
   let quiz = document.querySelector(quizcontainerid)
    document.querySelector(selectId).style.display="block";
  quiz.style.display="flex";
  resetQuiz()
}
