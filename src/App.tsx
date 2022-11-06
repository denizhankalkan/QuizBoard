import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import QuestionCard from './components/QuestionCard';
import { fetchQuizQuestions } from './API';
import { QuestionState, Difficulty } from './API';
import { GlobalStyle } from './App.style';

export type AnswerObject = {
  question: string,
  answer: string,
  correct: boolean,
  correctAnswer: string;
}

const totalQuestion = 10;
const  App = () =>  {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);



  console.log("result?",questions)
    
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      totalQuestion,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      const answer= e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if(correct) 
       setScore(prev => prev + 1);

       const answerObject = {
        question : questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
       };
       setUserAnswers((prev) => [...prev, answerObject]);
    }

  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if(nextQuestion === totalQuestion){
    setGameOver(true);
    }else{
      setNumber(nextQuestion);
    }
  }
  
  return (
    <>
    <GlobalStyle/>
    <div className="App">
      <h1>React Quiz</h1>
      {gameOver || userAnswers.length === totalQuestion ? (
            <button className='start' onClick={startTrivia}>
            Start
           </button>
      ) : null}
      
     {!gameOver ?   <p className='score'>Score:</p>: null}
   
     {loading && <p>Loading Questions ...</p>}
      {!loading && !gameOver && (
     <QuestionCard
        questionNr={number + 1}
        totalQuestions={totalQuestion}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number]: undefined}
        callback={checkAnswer}
       /> 
      )}
       {!gameOver && !loading && userAnswers.length ===  + 1 && number !== totalQuestion -1 ? (
          <button className="next" onClick={nextQuestion}>
          Next Question
          </button>
       ): null}
      
    </div>
    </>
  );
}

export default App;
