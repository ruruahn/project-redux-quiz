import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { quiz } from '../reducers/quiz'
import { useHistory } from 'react-router-dom'
import { StyledButton } from 'components/StyledButton'

const Summary = () => {
  const answers = useSelector((state) => state.quiz.answers)
  console.log(answers)
  const dispatch = useDispatch()

  const history = useHistory()

  const handleRestart = () => {
    dispatch(quiz.actions.restart())
    history.push('/')
  }
  const correctAnswers = answers.filter((answers) => answers.isCorrect)
  const numberOfCorrectAnswers = correctAnswers.length

  const numberOfQuestions = answers.length

  return (
    <section className='main-container'>
      <h1> Great work you managed to answer all the questions in our quiz! </h1>
      {answers.map((item) => {
        const questionNumber = item.question.id
        const questionText = item.question.questionText
        const usersAnswer = item.question.options[item.answerIndex].answer
        const correctAnswer =
          item.question.options[item.question.correctAnswerIndex].answer

        return (
          <div key={questionNumber}>
            <p>
              {questionNumber}. {questionText}
            </p>
            <p>Your answer was {usersAnswer}</p>
            <p>
              The correct answer is:
              {correctAnswer}
            </p>
          </div>
        )
      })}
      <p>
        You got {numberOfCorrectAnswers} / {numberOfQuestions} correct answers
      </p>

      <StyledButton onClick={handleRestart}>
        Would you like to give it a go again?
      </StyledButton>
    </section>
  )
}

export default Summary