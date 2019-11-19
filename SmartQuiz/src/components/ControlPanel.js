import React from 'react';
import QandAPanel from '../components/QandAPanel';
//import QCreator from '../components/QCreator';

function Quiz(props) {
  var button="Show Answer";
if(props.shown)
{
  button="Hide Answer";
}
  return (
      <div key={props.questionId} className="quiz-story">

        <div className="bottom-footer" >
      <button onClick={props.setNextQuestion} >Forward</button>
        <button onClick={props.setPreviousQuestion} >Back</button>
        <button onClick={props.showQC}>Show Question Creator</button>
        {props.shown ?  <button onClick={props.toggleHidden}>Hide Answer</button>: <button onClick={props.toggleDisplay}>Show Answer</button>}

      <button className="Previous-btn" onClick={props.removeQuestion} >Remove Question</button>
          </div>
          <QandAPanel
            counter={props.questionId}
            total={props.questionTotal}
           content={props.question} answer={props.answer} shown={props.shown}/>


           </div>

  );
}


export default Quiz;
