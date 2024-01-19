document.addEventListener("DOMContentLoaded", () => {
  let questionNumber = document.querySelector(".qnumber");
  let level = document.querySelector(".level");
  const question = document.querySelector(".question");
  const submit = document.querySelector("#submit");
  const select = document.getElementById("select");
  const answersContainer = document.getElementById("answer");

  let dataStorage = [];
  let userScore = 0;
  let questionIndex = 0;


  select.addEventListener("change", handleLanguage);

  function handleLanguage() {
    const selectedLanguage = select.value;

    select.style.display = 'none'

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
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  function loadQuiz(language) {
    // Display a single question based on questionIndex
    const element = language[questionIndex];

    questionNumber.textContent = `Question ${questionIndex + 1} of ${language.length}`;
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
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (selectedOption) {
      const selectedValue = selectedOption.value;
      const correctAnswer = dataStorage[questionIndex].answer;

      //console.log("Your answer: " + selectedValue);
      const score = document.querySelector('.user-score')    
      const correctFeed = document.querySelector('.correct-feed')      
      const wrongFeed = document.querySelector('.wrong-feed')

      if (selectedValue === correctAnswer) {

        score.textContent= `Score ${++userScore}`;        
        correctFeed.style.display = "block";
        correctFeed.textContent ="Correct!" ;
        wrongFeed.style.display = "none";
      } else {
        wrongFeed.style.display = "block"
        wrongFeed.innerHTML = `Incorrect <br>Correct answer:  ${correctAnswer}`;
        correctFeed.style.display = "none";


    }

      // Delay for 2 seconds before moving to the next question
      setTimeout(() => {
        
        questionIndex++;

        if (questionIndex < dataStorage.length) {
          loadQuiz(dataStorage);
        } else {
          console.log("Quiz completed!");
          // Here, you can display the user's score or perform other actions


        resetQuizState();
        }



      }, 1000);
    } else {
      console.log("Please select an answer.");
    }
  }
  function resetQuizState() {
    // Reset quiz state for the next quiz
    quizStarted = false;
    questionIndex = 0;
    userScore = 0;
  }

  submit.addEventListener("click", submitAnswer);
});

