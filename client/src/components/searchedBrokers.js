import axios from 'axios';
import { useCookies } from "react-cookie";
import { useState } from 'react';
import styles from './searchedProperties.module.css';


const userID = window.localStorage.getItem("userID");

function SearchedBrokers({ brokers }) {

const [cookies, _] = useCookies(["access_token"]);


return (
    <div className={styles.container}>
      {brokers.map((brokers, index) => (
        <div key={brokers._id} className={styles.propertyCard} id={brokers._id}>
           {/* {modalPropertyId === property._id && <OfferModal propertyId={property._id} brokerId={property.userOwner} show={modalPropertyId !== null} close={closeModal} />} */}
          <div className={styles.propertyVisuals}>
          {/* <img className={styles.propertyImg} src={property.imageUrl} alt="Property Image" /> */}
          {/* {localStorage.getItem('userID') != null && userID != property.userOwner ? <button className={styles.requestVisitBtn} onClick={handleRequestVisit}>Request Visit</button> : null}
          {localStorage.getItem('userID') != null && userID != property.userOwner ? <button className={styles.requestVisitBtn} onClick={handleMakeOffer}>Make Offer</button> : null} */}
          </div>
          <div className={styles.propertyInfo}>
              <p><strong>Surname:</strong> {brokers.surname}</p>
              <p><strong>Name:</strong> ${brokers.name}</p>
              <p><strong>E-mail:</strong> {brokers.email}</p>
              <p><strong>Phone Number:</strong> {brokers.phoneNumber}</p>
              <p><strong>Company Name:</strong> {brokers.companyName}</p>
              <p><strong>Office Address:</strong> {brokers.officeAddress}</p>
              <p><strong>Years of Experience:</strong> {brokers.yearsOfExperience}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchedBrokers;