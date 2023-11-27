import React from 'react';
import classes from './aboutUs.module.css';

function AboutUs() {
  return (
    <div className={classes.wrapper}>
      <div>
        <h1 className={classes.title}>ABOUT US</h1>
        <div className={classes.descriptionContainer}>
          <p className={classes.description}>
          At EstateElite, we are more than just a real estate business; we are a team of passionate individuals dedicated to transforming your homeownership dreams into reality. With years of collective experience, our team of professionals strives to deliver innovative solutions, ensuring that your property transactions are smooth and successful. Whether you're buying, renting,  or selling, EstateElite is your trusted partner in every step of the real estate journey. 
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;