import React, { Component } from 'react';
import styles from './App.css'

class App extends Component {

	constructor(props) {
	    super(props);
        this.state = {};
	}

	render() {
		return(
			<div className={styles.App}>
                <h1> Blog </h1>
			</div>
		);
	
	};
};

export default App;
