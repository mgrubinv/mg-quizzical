import React from 'react';
import blobIntroTop from "./assets/intro-page-blob-top.png"
import blobIntroBottom from "./assets/intro-page-blob-bottom.png"


export default function IntroPage(props) {
  
  const {toggleQuizStarted, allCategories, allDifficulties, formData, setFormData} = props

  function handleFormChange(event) {
    const {name, value} = event.target
    setFormData(prevFormData => ({...prevFormData, [name]: value}))
  }

  const categoryOptionElements = allCategories.map(cat => {
    return <option key={`category-option-${cat.id}`} value={cat.id}>{cat.name}</option>
  })
  categoryOptionElements.unshift(<option key={`category-option-0`} value="0">All Categories</option>)

  const categoryElement = (
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleFormChange}
        >
          {categoryOptionElements}
        </select>
  )

  const difficultyInputFields = allDifficulties.map(dif => {
    return (
      <span className="difficulties-select" key={`difficulty-${dif}`}>
        <input
          type="radio"
          id={dif.replace(" ", "-").toLowerCase()}
          name="difficulty"
          value={dif}
          checked={formData.difficulty === dif}
          onChange={handleFormChange}
        />
        <label
          htmlFor={dif.replace(" ", "-").toLowerCase()}>{dif}</label>
      </span>
    )
  })

  const difficultyElement = (
    <fieldset>
      <legend>Select Difficulty:</legend>
      {difficultyInputFields}
    </fieldset>
  )

  const formElement = (
    <form className="form--intro-page">
      <label htmlFor="playerName">Player Name (optional):</label>
      <input 
        type="text"
        maxLength="20"
        id="playerName"
        name="playerName"
        value={formData.playerName}
        onChange={handleFormChange}
      />
      <label htmlFor="questionsNr">Number of Questions:</label>
      <input 
        type="number"
        min="3"
        max="10"
        step="1"
        id="questionsNr"
        name="questionsNr"
        value={formData.questionsNr}
        onChange={handleFormChange}
      />
      {categoryElement}
      {difficultyElement}
    </form>
  ) 

  return (
      <main className="main--intro-page">
        <h1>Quizzical</h1>
        <h3>Test your knowledge 🤔🥉</h3>
        {formElement}
        <button className="button--intro-page" onClick={toggleQuizStarted}>Start quiz</button>
        <img className="blob-top" src={blobIntroTop} />
        <img className="blob-bottom" src={blobIntroBottom} />
      </main>
    )
  }
