import React from 'react';
import Question from './Question';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';
import blobQuizTop from "./assets/quiz-page-blob-top.png";
import blobQuizBottom from "./assets/quiz-page-blob-bottom.png";
import expand_less_icon from "./assets/expand_less_icon.svg";
import expand_more_icon from "./assets/expand_more_icon.svg";
import { scoresCollection } from './firebase';
import { addDoc, getDocs } from 'firebase/firestore';

export default function QuizPage(props) {

    const {category, difficulty, questionsNr, playerName} = props.formData
    const {allCategories} = props

    const [isRevealed, setIsRevealed] = React.useState(false)
    const [allQuestions, setAllQuestions] = React.useState([])    

    const correctQuestions = allQuestions.map(qst => {
        if (qst.answers[qst.selected] === qst.correct) {
            return true    
        } else {
            return false
        }
        }
    )
    const categoryName =  category !== "0" ? allCategories.find(cat => cat.id == category).name : "All Categories"

    const [showHighScores, setShowHighScores] = React.useState(false)

    function toggleShowHighScores() {
        setShowHighScores(prev => !prev)
    }

    function getMultiplier(difficulty) {
        if (difficulty === "Easy") {
            return 1
        } else if (difficulty === "Medium") {
            return 2
        } else if (difficulty === "Hard") {
            return 4
        } else {
            return 3
        }
    }

    const currentScore = {
        playerName: playerName,
        totalQuestions: allQuestions.length,
        correct: correctQuestions.filter(Boolean).length,
        totalScore: correctQuestions.filter(Boolean).length * getMultiplier(difficulty),
        category: categoryName,
        difficulty: difficulty
    }

    const [highScores, setHighScores] = React.useState([])
    
    const fetchScores = async () => {
        await getDocs(scoresCollection)
        .then(snapshot => {
            const newScores = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}) )
            setHighScores(newScores)
        })
        }
    
    React.useEffect(() => {
        fetchScores()
    }, [isRevealed]
    )

    const highScoreLines = 
        highScores.sort((a,b) => b.totalScore - a.totalScore).slice(0,10).map(el => {
            return (
                <tr key={el.id}>
                    <td>{el.playerName}</td>
                    <td>{el.correct} / {el.totalQuestions}</td>
                    <td>{el.totalScore}</td>
                    <td>{el.category}</td>
                    <td>{el.difficulty}</td>
                </tr>
            )
        }
    )

    const highScoreTable = (
        <table className="high-score-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Questions</th>
                    <th>Score</th>
                    <th>Category</th>
                    <th>Difficulty</th>
                </tr>
            </thead>
            <tbody>
                {highScoreLines}
            </tbody>
        </table>
    )

    const highScoreElement = (
        <div className="high-score-wrapper">
            <div className="high-score-header">
                <h4 className="high-score-title">High Scores</h4>
                <img src={showHighScores ? expand_less_icon : expand_more_icon} onClick={toggleShowHighScores} className="high-score-expand" />
            </div>
        {showHighScores && highScoreTable}
        </div>
    )
    

    const allQuestionElements = allQuestions.map(el => {
        return (
            <Question question={el} selectElement={(qstC, ansC) => changeSelected(qstC, ansC)} key={el.id} isRevealed={isRevealed}/>
        )
    })

    const fullQuestionSection = (
        <span>
            {isRevealed && highScoreElement}
            <div className="quiz-page-form-data">
                <p>Category: {categoryName}</p>
                <p>Difficulty: {difficulty}</p>
            </div>
            {allQuestionElements}
            <div className="button-section--quiz-page">
                {isRevealed && <p className="p--score">You scored {currentScore.correct}/{currentScore.totalQuestions} correct answers</p>}
                <button
                className="button--quiz-page"
                onClick={isRevealed ? props.toggleQuizStarted : toggleIsRevealed}
                >{isRevealed ? "Play again" : "Check answers"}</button>
            </div>
        </span>
    )

    const loaderElement = (
        <span className="loader"></span>
    )

    const addCurrentScore = async () => {
        if (playerName !== "") {
        const newScoreRef = await addDoc(scoresCollection, currentScore)
        }}

    function toggleIsRevealed() {
        
        if (!isRevealed) {
            addCurrentScore()
        }

        setIsRevealed(prev => !prev)
    }

    function mapData(questionData) {
        if (questionData) {
        setAllQuestions(
            questionData.map(qst => {
                const allAnswers = []
                qst?.incorrect_answers.map(ans => {
                    allAnswers.push(decode(ans))
                })
                allAnswers.splice((allAnswers.length+1) * Math.random() | 0, 0,  decode(qst?.correct_answer))
        
                return {
                    id: nanoid(),
                    question: decode(qst?.question),
                    correct: decode(qst?.correct_answer),
                    answers: allAnswers,
                    selected: false
                }
        }))}
    }

    const categoryUrlParam = category !== "0" ? "&category=" + category : ""
    const difficultyParam = difficulty !== "Any Difficulty" ? "&difficulty=" + difficulty.toLowerCase() : ""

    React.useEffect(() => {
        if (props.quizStarted) {
        fetch(`https://opentdb.com/api.php?amount=${questionsNr + categoryUrlParam + difficultyParam}&type=multiple`)
        .then(res => res.json())
        .then(data => mapData(data.results))
        }
    }, [props.quizStarted] )

    function changeSelected(qstC, ansC) {
        
        setAllQuestions(prevAllQuestions => {
            
            return (
                prevAllQuestions.map(qst => {
                    if (qstC === qst.id) {
                        return {
                            ...qst,
                            selected: ansC
                        }
                    } else {
                        return {
                        ...qst
                        }
                    }
                }))
        })
    }

    return (
        <main className="main--quiz-page">
            <img className="blob-top" src={blobQuizTop} />
            <img className="blob-bottom" src={blobQuizBottom} />
            {!allQuestions.length ? loaderElement : fullQuestionSection}
        </main>
    )
}