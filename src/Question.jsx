import React from 'react';

export default function Question(props) {
    const { id, question, correct, selected, answers } = props.question
    const { selectElement, isRevealed } = props
    
    const answerElements = answers.map(ans => {
        const aIndex = answers.indexOf(ans)
        
        let buttonClass = ""
        if (isRevealed) {
            if (correct === ans) {
                buttonClass = "button--revealed-answer-correct"
            } else if (correct !== ans && selected === aIndex) {
                buttonClass = "button--revealed-answer-wrong"
            } else {
                buttonClass = "button--revealed"
            }
        } else {
            if (aIndex === selected) {
                buttonClass = "button--answer-selected"
            } else {
                buttonClass = "button--answer-deselected"
            }
        }
            
        
        
        return (    
            <button
            className={buttonClass}
            onClick={() => selectElement(id, aIndex)}
            key={`${id}-${aIndex}`}
            >{ans}</button>
        )
    })

    return (
        <section className="section--question">
        <p className="question">{question}</p>
        <div className="answer-elements">
        {answerElements}
        </div>
        </section>
    )
}