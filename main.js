let questionNumber = document.querySelector('.qnumber')
const question = document.querySelector(".question");
let  level = document.querySelector('.level')

let option1 =document.querySelector('#ans1')
let option2 =document.querySelector('#ans2')
let option3 =document.querySelector('#ans3')
let option4 =document.querySelector('#ans4')
const nextBtn = document.querySelector("#submit")


function data() {
 return fetch("http://localhost:3000/questions")
    .then((response) => response.json())
    .then((data) => {
        data
        buildHtml(data)
    });
}
data()
function buildHtml(quiz) {
  const html = quiz.html;
  console.log(html);
  function getAnswers(elem) {
    questionNumber.textContent =`Question ${elem.id} of 15`
    question.textContent = elem.question
    option1.textContent= elem.options[0]
    option2.textContent= elem.options[1]
    option3.textContent= elem.options[2]
    option4.textContent= elem.options[3]
    level.textContent=`Difficulty: ${elem.difficulty}`
}
    html.forEach((element,index) => {
        setTimeout(() => {
        console.log(element.question)
        getAnswers(element)
    },index*10000);
    });

}

function computeScore() {}


