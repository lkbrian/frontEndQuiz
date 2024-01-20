# The FrontEndQuiz

## Introduction

This is the FrontEndQuiz i started off with project planning and managent
i used trello to plan and manage my project here is my board
https://trello.com/b/MC4PghV5/quiz-app-project. i started building my
project by creating the basic layout and structure of my page using html
and css i then futher proceeded to ad functionalies using my js.
The data used is stored in a json file that acts as a database

## How it works

In the `script.js` file, the functionality begins by attaching an
event listener to the entire document, ensuring that the JavaScript
code waits for the HTML and CSS components to load. Subsequently,
various HTML elements are targeted and assigned to variables withi
n the global scope.
Additionally, an empty array named `data storage`,variables named
`userscore` & `question index`is established to
serve as a container for storing all the data fetched. Another
event listener is then added to the `select` element, allowing
the script to respond to changes. When a change occurs, the selected
option's value is utilized to retrieve data from the database.json file
using the JSON server.

### `function fetchData()`

Following this, the script fetches the specified data relative to the
selected option, utilizing the server's endpoint to streamline the
retrieval process.if the selected option is html it will retrieve html
questions and so on there are three options to pick from js,css and html
the function takes one argument which is the language selected which i achieved
by calling this function inside the select's event listener and passing in the
selected value

### `function loadQuiz()`

Utilizing DOM manipulation, this function is responsible for presenting questions
and multiple-choice options to the user. A loop is employed to iterate over the
options,considering they are stored in an array. Each option is displayed by dynamically
creatingradio button inputs through inner HTML, and the data is appended to the appropriate
container. This function is initially invoked within the data-fetching section to gain
access to the quiz data.

### `function submitAnswer()`

checks if the selected answer is the corret and display the corresponding feed
which includes updating userscores
it has a set timeout inbuilt function that is uded to move to the next question
after 1 second
it futher checks if the questions are finished if not loads the next & if so
completes the quiz
otherwise if no option was selected alerts you to select an answer

### `function getRemarks()`

Based on the totatal score you get your total scoe and a remark of
your performance

### `submit eventlistener`

this is to perform all the actions on the submit utton once it gets clicked

### `function restartQuiz()`

it is the last function decleared outside the DOM event listener because its called on the
html form to restart the quiz by reloading the page to its original state

## Conlusion

In alignment with my objectives, the development of this quiz application is driven by the goal of crafting an enriching and educational experience. The emphasis extends beyond mere assessment of users' proficiency in HTML, CSS, and JavaScript, aiming to offer a delightful and interactive journey through the realm of web development.

Key priorities include fostering seamless navigation throughout the quiz, delivering concise and constructive feedback to enhance learning, and presenting a visually captivating design.
am looking to host this application hope it willbe hosted by then if so the link willbe provided and
Happy quizzing! 🚀
