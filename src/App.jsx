import React from 'react';
import IntroPage from './IntroPage';
import QuizPage from './QuizPage';

export default function App() {
    
  const [quizStarted, setQuizStarted] = React.useState(false)
  
  const [allCategories, setAllCategories] = React.useState([])
  const allDifficulties = ["Any Difficulty", "Easy", "Medium", "Hard"] 
  const [formData, setFormData] = React.useState({category: "0", difficulty: allDifficulties[0], questionsNr: 5, playerName: ""})

  React.useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
    .then(res => res.json())
    .then(data => setAllCategories(data.trivia_categories))
  }, [] ) 

  function toggleQuizStarted() {
    setQuizStarted(prev => !prev)
  }

  return (
      quizStarted
      ?
      <QuizPage
      quizStarted={quizStarted}
      toggleQuizStarted={toggleQuizStarted}
      formData={formData}
      allCategories={allCategories}
      />
      :
      <IntroPage
      quizStarted={quizStarted}
      toggleQuizStarted={toggleQuizStarted}
      allCategories={allCategories}
      allDifficulties={allDifficulties}
      formData={formData}
      setFormData={setFormData}
      />
    )
  }