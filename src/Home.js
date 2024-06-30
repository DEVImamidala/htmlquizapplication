import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import submit from './Submit'
import { useNavigate } from 'react-router-dom';



import './App.css';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/questiondisplay');
        const gettingresponse = response.data.formattedOptions;
        sessionStorage.setItem('questions', JSON.stringify(gettingresponse));

        if (response.data && response.data.formattedOptions) {
          const initialSelectedAnswers = response.data.formattedOptions.map((question) => ({
            question_text: question.question_text,
            selected_option: "", // Store the selected option
            is_correct: question.is_correct, // Store correct answer for internal validation
          }));
          setSelectedAnswers(initialSelectedAnswers);
          setQuestions(response.data.formattedOptions);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleOptionChange = (questionText, selectedOption) => {
    setSelectedAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.question_text === questionText
          ? { ...answer, selected_option: selectedOption }
          : answer
      )
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let correctCount = 0;

    selectedAnswers.forEach(selected => {
      const question = questions.find(q => q.question_text === selected.question_text);
      if (question) {
        const selectedIndex = question.options.findIndex(opt => opt === selected.selected_option);
        if (selectedIndex === -1) {
          return;
        }
        if (question.is_correct[selectedIndex]) {
          correctCount++;
        }
      } else {
        console.warn(`Question not found for selected answer: ${selected.question_text}`);
      }
    });

    // let count=correctCount;
    sessionStorage.setItem('count',correctCount);
    navigate('/submit');



    // alert(`total number of correct answers: ${correctCount} out of ${selectedAnswers.length}`);
  };

  return (
    <div className='hello'>
      <form onSubmit={submitHandler}>
        <h2 className='head'>Html Quiz Questions</h2>
        <div className='mainpart'>
          {questions.map((question, index) => (
            <div key={index}>
              <p className='questions'>Question {index + 1}: {question.question_text}</p>
              {question.options.map((option, optIndex) => (
                <p className='options' key={optIndex}>
                  <label>
                    <input
                      type="radio"
                      name={`question_${index}`}
                      value={option}
                      checked={selectedAnswers[index]?.selected_option === option}
                      onChange={() => handleOptionChange(question.question_text, option)}
                    />
                    <span style={{ marginLeft: '5px' }}>{option}</span>
                  </label>
                </p>
              ))}
            </div>
          ))}
        </div>
        <Button  style={{ backgroundColor: 'darkmagenta',marginTop:'5px' }} type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default App;
