import React from 'react';
import ContactUs from '../components/contactUs';
import AboutUs from '../components/aboutUs';
import styles from './founders.module.css';

function Founders() {

  return (
    
      
      <div className={styles.main}>
     <div> 
        <AboutUs/>
        </div> 
        <div>
        <ContactUs />
      </div>
      </div>
    
  );
}

export default Founders;