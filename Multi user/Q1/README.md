# Homework 8 CS651

**Krishna Teja Bayaneni**

**Net Id: NV4956**

## Question 1

**a)**
```javascript
let that=this;

let taskList = that.state.tasks.map(function(item,i){  
  return(
    <NavItem key={i}><NavLink className={classnames({ active: that.state.activeTab === i })} onClick={() => { that.toggle(i); }}>
      {item["task-name"]}</NavLink></NavItem>
  );
})
return(
    <Container>
{ taskList && taskList.length > 0 &&
  <Row>
    <Col sm="3"><Nav vertical pills>{taskList}</Nav></Col>
  </Row>
}
</Container>
);
}
```

![Q1a answer](Q1a.png)
**b)**
```javascript
let that=this;
let parser = new Parser()
let renderer = new HtmlRenderer()
let currentIns = renderer.render(parser.parse(that.state.instructions));//add form
let taskDetails = that.state.tasks.map(function(item,i){
  let ins = renderer.render(parser.parse(item.instructions));//displaying page
  <div dangerouslySetInnerHTML={{__html: ins}}></div>
})
  <FormGroup row>
    <Col sm={12}>
      <Input rows={10} value={this.state.instructions} onChange={this.handleChange} type="textarea" name="instructions" id="instructions" required />
    </Col>
  </FormGroup>
  { taskList && taskList.length > 0 &&
    <Row>
      <Col sm="3"><Nav vertical pills>{taskList}</Nav></Col>
      <Col sm="9">{taskDetails}</Col>
    </Row>
  }
```

![Q1b answer](Q1a.png)

**c)**

* I have called a function toggle onClick. So when a user clicked on a particular task the index of the task is been sent to the toggle function and the instruction of the particular index from the tasks1.json has been displayed on the panel. *
![Q1c answer](Q1a.png)

**d)**
```javascript
handleDelete(data) {
  this.setState({
    error: '',
    success:false
  });

  let tasks = this.state.tasks.filter((task) => {
    return data["task-name"] !== task["task-name"];
  });

  this.setState(state => {
      state.tasks = tasks;
      state.deleteSuccess= true;
      state.activeTab = 0;
      return state;
  });
}
```
**e)**
*I am calling the showEditForm function on clicking the update button. It is binding the task name and in the setState updating the values to the new values and after giving commit the values are been saved and displayed.*
![Q1e answer](Q1e.png)
**f)**
*I am calling the showAddForm function on clicking the add button. It is same as the update form but i am not saving any of the task index or name and just adding the values set in the form using the setState and after giving commit the values are been displayed and new task has been added*
![Q1f answer](Q1f.png)
## Question 2
**a)**
![Q2a answer](Q2a.png)

![Q2a answer](Q2a1.png)
**b)**
![Q2b answer](Q2b.png)
*Added "proxy": "http://127.0.0.1:5555",*
**c)**
*Invoked fetch from the function "componentDidMount()"*
**d)**
```javascript
if(this.state.editMode){
  method = 'PUT';
  url = '/tasks/'+this.state.taskName;
}

this.setState({ error: '', success:false });  
fetch(url, {
    method: method,
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      'task-name': this.state.taskName,
      'due': this.state.dueDate+'T'+this.state.dueTime+':00.000Z',
      'status': this.state.status,
      'instructions': this.state.instructions,
    })
})
.then(res => res.json())
.then(json => {
  if(json.error !== undefined && json.error !== ''){
    this.setState({ error: json.error });  
  }
  else if(json._id !== undefined && json._id !== ''){
    let elements = this.state.tasks.slice();
    if(!this.state.editMode){
      elements.push({
        'task-name': this.state.taskName,
        'due': this.state.dueDate+'T'+this.state.dueTime+':00.000Z',
        'status': this.state.status,
        'instructions': this.state.instructions
      });
    }else{
      const nextState = this.state.tasks.map((task,index) => {
        if(this.state.taskName === task["task-name"]){
          return {
            ...task,
            "task-name": this.state.taskName,
            due: this.state.dueDate+'T'+this.state.dueTime+':00.000Z',
            status: this.state.status,
            instructions: this.state.instructions
          }
        }
        return task;
      });
      elements = nextState;
    }  
    this.setState({ success: true, addForm:false, tasks:elements });
  }
  else{
    this.setState({ error: 'Request Error!' });  
  }
}, error =>{
  console.log('err',error);
  this.setState({ error: 'Network error!' });
});
}
```
*When i clicked on the update button it is navigating to the form and i am binding the function with the tasks so the form contains the task information present and when i click on the commit button i am setting the values to the current/edited values in the setState so it updates the task in the server*
**e)**

```javascript
handleSubmit(event) {
  event.preventDefault();  

  let method = 'POST';
  let url = '/tasks/';
  if(this.state.editMode){
    method = 'PUT';
    url = '/tasks/'+this.state.taskName;
  }

  this.setState({ error: '', success:false });  
  fetch(url, {
      method: method,
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        'task-name': this.state.taskName,
        'due': this.state.dueDate+'T'+this.state.dueTime+':00.000Z',
        'status': this.state.status,
        'instructions': this.state.instructions,
      })
  })
  .then(res => res.json())
  .then(json => {
    if(json.error !== undefined && json.error !== ''){
      this.setState({ error: json.error });  
    }
    else if(json._id !== undefined && json._id !== ''){
      let elements = this.state.tasks.slice();
      if(!this.state.editMode){
        elements.push({
          'task-name': this.state.taskName,
          'due': this.state.dueDate+'T'+this.state.dueTime+':00.000Z',
          'status': this.state.status,
          'instructions': this.state.instructions
        });
      }else{
        const nextState = this.state.tasks.map((task,index) => {
          if(this.state.taskName === task["task-name"]){
            return {
              ...task,
              "task-name": this.state.taskName,
              due: this.state.dueDate+'T'+this.state.dueTime+':00.000Z',
              status: this.state.status,
              instructions: this.state.instructions
            }
          }
          return task;
        });
        elements = nextState;
      }  
      this.setState({ success: true, addForm:false, tasks:elements });
    }
    else{
      this.setState({ error: 'Request Error!' });  
    }
  }, error =>{
    console.log('err',error);
    this.setState({ error: 'Network error!' });
  });
}
```
*When i clicked on the add button it is navigating to the form and calling the function with no tasks so the form doesnot contain any task information when i click on the commit button i am setting the values to the current values in the setState so it adds the appropriate values to the fields and the task has been added in the server*

**
**f)**
```javascript
handleDelete(data) {
  this.setState({ error: '', success:false });  
  fetch('/tasks/'+data["task-name"], {
    method: 'DELETE',
    headers: {'Content-Type':'application/json'}
  })
  .then(res => res.json())
  .then(json => {
    if(json.success){
      let tasks = this.state.tasks.filter((task) => {
        return data["task-name"] !== task["task-name"];
      });
      this.setState(state => {
        state.tasks = tasks;
        state.deleteSuccess= true;
        state.activeTab = 0;
        return state;
      });
    }
    else{
      this.setState({ deleteError: 'Request Error!' });  
    }
  }, error =>{
    console.log('err',error);
    this.setState({ deleteError: 'Network error!' });
  });
}
```
*When i click on the delete i am invoking a function handleDelete() onClick. It is taking the taskinformation and if the task data is present it is deleting the task else it is throwing the error*
