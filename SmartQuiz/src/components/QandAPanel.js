import React from 'react';

function Question(props) {
  return (
    <div>
    <p className="question">
      Question <span>{props.counter}</span> of <span>{props.total}</span>

    </p>
    <h1>Test Yourself</h1>
    <h2>Question</h2>
    <h2 className="question">{props.content}</h2>
    <h2>Answer</h2>
    <h2 style={{ display: (props.shown ? 'block' : 'none') }} className="question">{props.answer}</h2>

</div>

  );
}

Question.propTypes = {
  content: React.PropTypes.string.isRequired,
  answer: React.PropTypes.string.isRequired,
  counter: React.PropTypes.number.isRequired,
  total: React.PropTypes.number.isRequired

};

export default Question;
