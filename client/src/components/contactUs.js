import React from 'react';
import classes from './contactUs.module.css';

function ContactUs() {
  return (
    <div className={classes.wrapper}>
      <div>
        <h1 className={classes.title}>CONTACT US</h1>
        <div className={classes.descriptionContainer}>
          <p className={classes.description}>
            Feel free to reach out to us using the following contact information:
          </p>
        </div>

        <div className={classes.contactInfo}>
          <p>Email: your-email@example.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Main Street, City, Country</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;