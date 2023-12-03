import { useState, useEffect } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {useGetUserID} from '../hooks/useGetUserID';
import { getToken } from "../hooks/getToken";
import styles from './offermanagement.module.css';

function OfferManagement() {

    // state hook to fetch offers and properties
    const [offers, setOffers] = useState([]);
    const [properties, setProperties] = useState([]);

    const [propertiesID, setPropertiesID] = useState([]);
    // gettong the userID 
    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"]);

    useEffect(() => {

        const fetchOffer = async () => {
            try {
                const response = await axios.get("http://localhost:3001/offers");
                
                // filtering for offers to properties of current Broker
                const filteredOffers = response.data.filter(offer => 
                    offer.propertyBroker === userID );
                
                
                setOffers(filteredOffers);
                console.log(filteredOffers);

                const propertyIDs = filteredOffers.map(offer => offer.property);
                setPropertiesID(propertyIDs);
                console.log(propertyIDs);
            } catch (err) {
                console.error(err);
            }
        };
        fetchOffer();

    }, []);

    useEffect(() => {

        const fetchProperty = async () => {
           

            if (propertiesID.length == 0 ) {
                return;
            }

            try {

                const req = propertiesID.map( id => 
                   axios.get(`http://localhost:3001/properties/${id}`) );

                   //wait for all requests to resolve
                   const responses = await Promise.all(req);

                   // getting the data from the properties
                   const propertiesData = responses.map(response => response.data);

                   setProperties(propertiesData);


            } catch(err) {
                console.error(err);
            }
        };
        fetchProperty();
    }, [propertiesID]);
    
    const handleAccept = async (offerId) => {
        const token = getToken();
        try {
            await axios.put(
                `http://localhost:3001/offers/${offerId}`, {status: "Accepted"}, {
                    headers: {
                        authorization: cookies.access_token
                    }
                }
            );

            setOffers((prev) => 
            prev.map((offer) => //temp
            offerId === offer._id ?
             {...offer, status: 'Accepted'} : offer )
            );

        } catch (err) {
            console.error(err)
        }
    };

    const handleReject = async (offerId) => {
        try {
            await axios.put(
                `http://localhost:3001/offers/${offerId}`, 
                {status: "Rejected"}, 
                {headers: {
                    authorization: cookies.access_token
                }}
            );
            setOffers((prev) => 
            prev.map((offer) => 
            offer._id === offerId ? 
            {...offer, status: 'Rejected'} : offer ));


        } catch(err) {
            console.error(err);
        }

    };

    const handleUndo =  async (offerId) => {
        try {
            await axios.put(
                `http://localhost:3001/offers/${offerId}`, 
                {status: 'pending'},
                {headers: {
                    authorization : cookies.access_token
                }}
            );
            setOffers((prev) => 
            prev.map((offer) => 
            offer._id === offerId ? 
            {...offer, status: 'pending'} : offer ));

        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div className={styles.container} >
            <h1 className={styles.header} > Offers </h1>
            <ul className={styles.offerList} > 
                { offers.map((offer) => 

                {const property = properties.find(p => p._id === offer.property);
                
                    return (
                        <li className={styles.offerItem} key={offer._id}>
                            {property && (
                                <div className={styles.offerDetails} > 
                                    <p>Property: {property.address}</p>
                                    <p> Offer: $ {offer.amount} </p>
                                    {offer.status == 'pending' ? 
                                            (<>
                                                <button
                                                    className={`${styles.button} ${styles.accept}`}
                                                    onClick={() => handleAccept(offer._id)}
                                                >Accept </button>
                                                <button
                                                    className={`${styles.button} ${styles.reject}`}
                                                    onClick={() => handleReject(offer._id)}
                                                > Rejected </button>
                                            </>)
                                             : (
                                                <> 
                                                <p>Status: {offer.status} </p>
                                                <a href="#" className={styles.undoLink} onClick={() => handleUndo(offer._id)}> Have you changed your mind about the offer ? Click here to undo </a>
                                                </>
                                             )
                                    }
                                </div>
                            ) }
                        </li>
                    );

                })}
            </ul>

        </div>
    );
}

 export default  OfferManagement;