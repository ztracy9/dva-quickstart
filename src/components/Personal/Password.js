import React from 'react';
import FormPassword from './FormPassword';
import styles from './Setting.css';

class Password extends React.Component{
	render(){
		return(
			<div className={styles.setPos}>
				<FormPassword mail={this.props.mail} getPW={this.props.getPW}/>
			</div>
		);
	}

}
export default Password;