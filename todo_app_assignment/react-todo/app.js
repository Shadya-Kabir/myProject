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
	        ]
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleClearButton = this.handleClearButton.bind(this);
		this.handleSelector = this.handleSelector.bind(this);

	}

handleClick(event, key) {
	let tempArray = this.state.todos;
	tempArray[key].done = (!tempArray[key].done);
	this.setState({todos: tempArray});
    
  }

handleClearButton(event) {
	let tempArray = [];
	tempArray = this.state.todos.filter((item, count)=>{
				return item.done===false;
		}
	)
    this.setState({todos: tempArray});
	//console.log("tempArray is: ", tempArray);
  }

handleClearDisable(){
	let disable = this.state.todos.filter((item)=>{
		return (!(item.done===false));
		}
	)
	console.log("value of disable is:",disable);
		if(disable.length === 0){
			return true;
		}

		else {
			return false;
		}
			
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
		//console.log(event.target.value);
	}

	render(){
		return(
			
			<div className="container">
			
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
			
			
			<ListItems value ={this.state.value} filter={this.state.filter} todos={this.state.todos} handleClick={this.handleClick}/>

			  
			</div>
			 	<select value={this.state.filter} onChange={this.handleSelector}> {/*{e=>this.handleSelector(e)}  {function(e){this.handleSelector(e)}} */}
        			<option value="all">all</option>
        			<option value="active">active</option>
        			<option value="complete">complete</option>
    			</select>
				
				{/*<button className="pull-right btn btn-default" onClick={this.handleUndoButton}>Undo Clear</button>*/}
				
				{console.log("handle clear value is: ",this.handleClearDisable())}
    			<button disabled ={this.handleClearDisable() ===true ? true:false}className="pull-right btn btn-default" onClick={this.handleClearButton}>Clear Complete</button>
			</div>
		)
	}
}

class ListItems extends React.Component {
	// constructor(props){
	// 	super(props);
	// 	console.log(this.props);
	// 	this.state = {
	// 		value: this.props.value,
	// 		todos: this.props.todos,
	// 		filter: this.props.filter
	// 	}
	// }
    render() {
let displayArray = [];	
let tempArray = [];

	if (this.props.filter==='active'){
		
		console.log("im in the active loop");
        displayArray = this.props.todos.filter((item)=>{
			return (item.done===false);
		}
		) 
    } 
    else if (this.props.filter==='complete'){
		console.log(this.props.filter);
		console.log("im in the complete loop");
            displayArray = this.props.todos.filter((item, count)=>{
				return item.done===true;
		}
		)
	} 
	else if (this.props.filter==='all'){
            displayArray = this.props.todos;
			console.log(displayArray);
    }

		return (
		
			<ul className="list-group">
				
			{displayArray.map((content,key)=>{
			return (	
			<li className="list-group-item">	
            <input type="checkbox" value="on" checked={content.done === true ? true:false} onClick={e=>this.props.handleClick(e, key)}/>
            <label className={content.done === true ? "done":null}>{content.text}</label>
        	</li>
			)
				})
			}
			</ul>
				          
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));