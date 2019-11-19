import React, { Component } from 'react';
import quizQuestions from './qAndAs';
class Qcreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: '',
      answers:'',
      counter: 0,
      questionId: 1,
      question: '',
      answer: '',
    };
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.addQandA=this.addQandA.bind(this);
  }

  handleChange1(event) {
    this.setState({questions: event.target.value});
  }
  handleChange2(event) {
    this.setState({answers: event.target.value});
  }
  componentWillMount() {
    this.setState({
      question: quizQuestions[0].question,
      answer: quizQuestions[0].answer,
    });
  }

addQandA(e){
e.preventDefault();
var que= new Array();
let q=this.state.questions;
let a=this.state.answers;
que["question"]=q;
que["answer"]=a;
if(q!=""){
quizQuestions.push(que)
console.log(quizQuestions.length);
this.setState({counter:quizQuestions.length});
  }
}
hideQCreator(){
  var qc=document.getElementById('display');
  qc.className="hideStuff";
}
render(){
  return (
    <div>
      <form id="display" onSubmit={this.addQandA}>
      <button type="submit">AddQ&A</button>
      <button onClick={this.hideQCreator} >hideQCreator</button> <br/>
          Q:<textarea name="questions" value={this.state.questions} onChange={this.handleChange1} />
         <br/>
          A:<textarea name="answers" value={this.state.answers} onChange={this.handleChange2} />
      </form>
      </div>
    );
  }
};
export default Qcreator;
