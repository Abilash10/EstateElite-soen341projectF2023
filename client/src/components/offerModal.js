//Modal the user sees when they click on the make offer button
import React from 'react';
import axios from 'axios';
import styles from './offerModal.module.css';
import { useState } from 'react';

function OfferModal({ propertyId, brokerId, show, close }) {

    const [offerAmt, setOfferAmt] = useState(0);

    const handleOffer = async (event) => {
        event.preventDefault();
        //get key of this offermodal element
        console.log('offerAmt:', offerAmt);
        console.log('propertyid:', propertyId);
        console.log('brokerid:', brokerId);
        console.log('userID:', window.localStorage.getItem('userID'));
        //send post request to server
        try {
            const response = await axios.post(`http://localhost:3001/offers`, { amount: offerAmt, property: propertyId,  propertyBroker: brokerId, offerCreator: window.localStorage.getItem('userID') });
            console.log(response);
            alert("Offer Submitted!");
        }
        catch (err) {
            console.log(err);
        }
    }

    const closeModal = () => {
        close();
    }

    return(
        <div>
            {show ? <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <div>
                    Make Offer
                    <span className={styles.close} onClick={closeModal}>&times;</span>
                    </div>
                    <div>
                        <form onSubmit={handleOffer}>
                            <input
                            placeholder='Enter amount...'
                            type='number'
                            value={offerAmt}
                            onChange={(e) => setOfferAmt(e.target.value)}
                            ></input>
                            <input type='Submit' value='Submit Offer' />
                        </form>
                    </div>
                    </div>
                </div> : null}
        </div>
    );
}

export default OfferModal;