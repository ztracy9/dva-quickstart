import React from 'react';
import { Carousel } from 'antd';
import HomeLayout from '../layout/Header/HomeLayout';
import styles from './HomePage.css';

class HomePage extends React.Component {
	render(){
		return(
			<HomeLayout>
				<Carousel autoplay className={styles.antCarousel}  effect="fade" autoplay>
					<div className={styles.setColor}><img src={require('../assets/1.jpg')} alt="" className={styles.img} /></div>
					<div><img src={require('../assets/2.jpg')} alt="" className={styles.img} /></div>
					<div><img src={require('../assets/3.gif')} alt="" className={styles.img} /></div>
					<div><img src={require('../assets/4.jpg')} alt="" className={styles.img} /></div>
				</Carousel>
			</HomeLayout>
		);
	}
}

HomePage.propTypes = {
};

export default HomePage;
