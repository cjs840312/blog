import React, { Component } from 'react';
import styles from './App.css'

class App extends Component {

	constructor(props) {
	    super(props);
        this.state = {"create":false,"read":false,"browse":true,"article":null};
	}

	toCreate(){
		this.setState({"create":true,"browse":false})
	}

	toBrowse(){
		this.setState({"browse":true,"create":false,"read":false})
	}

	toRead(e){
		console.log(e)
		this.setState({"browse":false,"read":true,"article":e})
	}

	render() {
		return(
			<div className={styles.App}>
                <h1> Blog </h1>
				{this.state.create?<Create toBrowse={this.toBrowse.bind(this)}/>:null}
				{this.state.read?<Read info={this.state.article} toBrowse={this.toBrowse.bind(this)}/>:null}
				{this.state.browse?<Browse toCreate={this.toCreate.bind(this)} 
										   toRead={this.toRead.bind(this)}/>:null}
			</div>
		);
	
	};
};

class Browse extends Component {

	constructor(props) {
	    super(props);
        this.state = {"articles":[]};
	}

	componentDidMount(){
		fetch('/getArticle', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}})
		.then(function(res){return res.json()})
      	.then(json=>{
			 json.map((x)=>{x.time=new Date(x.time) })
			 console.log(json);
        	 this.setState({"articles":json})
      	})
		
	}
	handleRead(e){
		this.props.toRead(this.state.articles[e])
	}

	render() {
		return(
			<div className={styles.Browse}>
				<input type="button" onClick={ this.props.toCreate} value="+" /><br/><br/>
				{
					this.state.articles.map((item,idx)=>{
						return <ArticleItem key={idx} info={item} onClick={this.handleRead.bind(this,idx)} />
					})
				}
			</div>
		);
	
	};
};

class Create extends Component {

	constructor(props) {
	    super(props);
        this.state = {"title":"","content":""};
	}

	getTitle(e){
		this.setState({"title":e.target.value})
	}

	getContent(e){
		this.setState({"content":e.target.value})
	}

	handleSubmit(){
		if (this.state.title && this.state.content){
			fetch('/postArticle', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"title":this.state.title,
					"content": this.state.content,
				})
			})
			this.props.toBrowse();
		}
		else{
			alert("content can not be blank!")
		}
	}

	render() {
		return(
			<div className={styles.Create}>
                <label>Title</label> 

				<input type="button" onClick={ this.props.toBrowse} value="back" 
						style={{position: 'absolute',right:'25%'}}/><br/>

				<input type="text" onChange={ this.getTitle.bind(this) } 
					style={{width:'50%',margin:'5 auto'}}/><br/>

				<textarea onChange={this.getContent.bind(this)}
					style={{width:'100%',height:'500px',resize:'none'}}/><br/>

				<input type="button" onClick={ this.handleSubmit.bind(this)} value="submit"
						style={{position: 'absolute',right:'25%'}} />
			</div>
		);
	
	};
};

class ArticleItem extends Component {

	constructor(props) {
	    super(props);
        this.state = {"style":{backgroundColor: 'linen',overflow:'hidden',textOverflow:'ellipsis'}};
	}


	render() {
		var originColor = {"style":{backgroundColor: '#CCCCCC',overflow:'hidden',textOverflow:'ellipsis'}}
		var newColor = {"style":{backgroundColor: 'linen',overflow:'hidden',textOverflow:'ellipsis'}}
		return(
			
			<div className={styles.ArticleItem} style={this.state.style} 
				onMouseEnter={()=>{this.setState(originColor)}}
				onMouseLeave={()=>{this.setState(newColor)}}
				onClick={this.props.onClick}
			>
				<div style={
					{
						textOverflow: "ellipsis"
					}}>
					{this.props.info.title}
				</div>
				<div style={
					{
						textAlign:"right",
						marginTop: "15px",

					}
				}>
					{this.props.info.time.toString().substring(0,24)}
				</div>
			</div>
		);
	
	};
};

class Read extends Component {

	constructor(props) {
	    super(props);
        this.state = {};
	}


	render() {
		return(
			<div className={styles.Read}>
				<h2>{this.props.info.title}</h2><br/>
				<div id={styles.contentArea}>
					{
						this.props.info.content.split('\n').map(function(item,idx){
							return(
								<span key={idx}>
									{item}
									<br/>
								</span>
							)
						})
					}
				</div>
				<input type="button" onClick={ this.props.toBrowse} value="back" 
						style={{position: 'absolute',right:'25%'}}/>
			</div>
		);
	
	};
};





export default App;
