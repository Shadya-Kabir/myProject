class App extends React.Component{
	constructor(){
		super();
		this.state = {
			value: "",
			filter: "all",
			todos:[
	            {text: 'learn angular', done: false, id: 1},
	            {text: 'write the content for the next module', done: false, id: 2},
	            {text: 'buy cheese', done: true, id: 3},
	            {text: 'buy milk', done: true, id: 4}
	        ],
			displayList : todos
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleClearButton = this.handleClearButton.bind(this);
		this.handleUndoButton = this.handleUndoButton.bind(this);
		this.handleSelector = this.handleSelector.bind(this);
	}

handleClick(event, key) {
	let tempArray = this.state.todos;
	tempArray[key].done = (!tempArray[key].done);
	this.setState({todos: tempArray});
    
  }

handleClearButton(event) {
	let tempArray = [];
	let allTodos = [];
    this.setState({
		tempTodo: this.state.todos,
		todos: tempArray,
		});
	console.log("tempArray is: ", tempArray);
  }

  handleUndoButton(event) {
    this.setState({todos: this.state.tempTodo});
	
  }

 handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
	  	let tempArray = this.state.todos;
	  	tempArray.push({text:this.state.value, done: false, id: this.state.todos.length+1});
    	this.setState({todos: tempArray});
		console.log(this.state.todos);
  }
	handleSelector(event) {
		this.setState({filter: event.target.value});
	
		let displayArray = [];
	if (this.state.filter==='active'){
		console.log("im in the active loop");
        displayArray = this.state.todos.map((item, count)=>{
			if(item.done!=true){
				return item;
			}
		}
		)
    }
    else if (this.state.filter==='complete'){
		console.log("im in the complete loop");
            displayArray = this.state.todos.map((item, count)=>{
			if(item.done===true){
				return item;
			}
		}
		)
	}
	else if (this.state.filter==='all'){
		console.log("im in the all loop");
            displayArray = this.state.todos;
    }
this.setState({displayList: displayArray});
	}

	render(){
		return(
			
			<div className="container">
			{this.state.filter}
    			<h1 className="text-center">todos</h1>
    			<form>
        			<div className="input-group">
            			<span className="input-group-btn">
               			<button onClick={this.handleSubmit} className="btn btn-primary" type="button">Add</button>
            			</span>
            		<input className="form-control" placeholder="add a todo" 
					 value={this.state.value}
          			onChange={this.handleChange} />
        			</div>
    			</form>

			<div className="container">
			<ul className="list-group">

			<ListItems value ={this.state.value} filter={this.state.filter} todos={this.state.todos} handleClick={this.handleClick} displayList={this.state.displayList}/>

			</ul>  
			</div>
			 	<select onChange={e=>this.handleSelector(e)}> {/* {function(e){this.handleSelector(e)}} */}
        			<option value="all">all</option>
        			<option value="active">active</option>
        			<option value="complete">complete</option>
    			</select>
				{this.state.filter}
				{/*<button className="pull-right btn btn-default" onClick={this.handleUndoButton}>Undo Clear</button>*/}
    			<button className="pull-right btn btn-default" onClick={this.handleClearButton}>Clear Complete</button>
			</div>
		)
	}
}

class ListItems extends React.Component {
	constructor(props){
		super(props);
		console.log("the props are",this.props);
		this.state = {
			value: this.props.value,
			todos: this.props.todos,
			filter: this.props.filter,
			displayList: this.props.todos
		}
	}
    render() {


		return (
		
			<div>
				{this.state.filter}
			{this.state.displayList.map((content,key)=>{
			return (	
			<li className="list-group-item">	
            <input type="checkbox" value="on" checked={content.done === true ? true:false} onClick={e=>this.props.handleClick(e, key)}/>
            <label className={content.done === true ? "done":null}>{content.text}</label>
        	</li>
			)
				})
			}
			</div>
				          
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));