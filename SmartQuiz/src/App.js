import React, { Component } from 'react';
import quizQuestions from './components/qAndAs';
import ControlPanel from './components/ControlPanel';
import Qcreator from './components/Qcreator';
import logo from './svg/logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answer: '',
     shown: true

    };
    this.setNextQuestion = this.setNextQuestion.bind(this);
    this.setPreviousQuestion = this.setPreviousQuestion.bind(this);
    this.removeQuestion = this.removeQuestion.bind(this);
    this.toggleHidden = this.toggleHidden.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.showQC = this.showQC.bind(this);
}
  componentWillMount() {
    this.setState({
      question: quizQuestions[0].question,
      answer: quizQuestions[0].answer,
      shown: true

    });
  }


  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answer: quizQuestions[counter].answer
    });
  }

  setPreviousQuestion() {

    const counter = this.state.counter - 1;
    const questionId = this.state.questionId - 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answer: quizQuestions[counter].answer
    });
  }
  toggleHidden() {
      this.setState({
      shown: false
      })
  }
  toggleDisplay() {
          this.setState({
          shown: true
          })
  }
  showQC() {

              this.setState({
              shown: true
              })
  }
removeQuestion() {
          const counter = this.state.counter;
          const questionId = this.state.questionId;
          let index=this.state.questionId;
          quizQuestions.splice(quizQuestions.length-1,1);
            this.setState({
              counter: counter,
              questionId: this.state.questionId,
              question: quizQuestions[counter].question,
              answer: quizQuestions[counter].answer
            });
          if(quizQuestions.length==1){
              quizQuestions.splice(index-1,1);
             this.setState({
               counter: 0,
               questionId: 0,
               question:"No questions to display",
               answer:"No answers to display"
             });
           }

      }


showQC(){
var qc=document.getElementById('display');
  qc.className="showStuff"
}
hideQCreator(){
  var qc=document.getElementById('display');
  qc.className="hideStuff";
}
  renderQuiz() {
    return (
      <ControlPanel viewreults={this.viewreults}
        setNextQuestion={this.setNextQuestion}
        counter={this.state.counter}
        setPreviousQuestion={this.setPreviousQuestion}
        removeQuestion = {this.removeQuestion}
        toggleHidden = {this.toggleHidden}
        toggleDisplay = {this.toggleDisplay}
        shown ={this.state.shown}
        questionId={this.state.questionId}
        question={this.state.question}
        answer={this.state.answer}
        questionTotal={quizQuestions.length}
        showQC = {this.showQC}

      />
    );
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Quiz Assignment</h2>
        </div>
       {this.renderQuiz()}
<Qcreator/>
      </div>

    );
  }

}

export default App;
