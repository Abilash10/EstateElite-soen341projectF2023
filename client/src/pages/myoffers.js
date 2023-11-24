import { useState, useEffect } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {useGetUserID} from '../hooks/useGetUserID';
import styles from './myoffers.module.css';

function MyOffers() {

    // state hook to fetch offers and properties
    const [offers, setOffers] = useState([]);
    const [properties, setProperties] = useState([]);

    const [propertiesID, setPropertiesID] = useState([]);

    // gettong the userID 
    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"]);

   
     // fetching offers in an array
    useEffect(() => {

        const fetchOffer = async () => {
            try {
                const response = await axios.get("http://localhost:3001/offers");
                
                // filtering for offers made by the current user
                const filteredOffers = response.data.filter(offer => 
                    offer.offerCreator === userID );
                
                
                setOffers(filteredOffers);
                console.log(filteredOffers);

                const propertyIDs = filteredOffers.reduce((acc, offer) => {
                    if (!acc.includes(offer.property)) {
                        acc.push(offer.property);
                    }
                    return acc;
                }, []);
                setPropertiesID(propertyIDs);
                console.log(propertyIDs);
            } catch (err) {
                console.error(err);
            }
        };
        fetchOffer();

    }, [offers]);

      // fetching properties in an array
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

    const handleDelete = async (offerId) => {

        try {
            await axios.delete(
                `http://localhost:3001/offers/${offerId}`, 
                {headers: {
                    authorization : cookies.access_token
                }}
            );
            setOffers(offers.filter((offer) => offer._id != offerId));
            alert("Property Deleted");


        } catch(err) {
            console.error(err);
        }
    };




    


    return (
        <div> 
            <h1> My offers </h1>
            <ul className={styles.borderedLi}  > 
             { offers.map((offer) =>  
            
            <li key={offer._id}> 
               
                { properties.map((property) => 
                
                offer.property == property._id ? //IMPORTANT: small bug when a client makes multiple offers to the same property a bugg occurs where it duplicates images
                <div> 

                    <h2>Address : {property.address} </h2>

                    <p> Offer: {offer.amount} </p>

                    <p style={{fontWeight:"bold"}}>  Status: {offer.status} </p>


                    <img src={property.imageUrl} alt={property.address} />

                    <button onClick={() => handleDelete(offer._id)}>Delete </button>

                     </div>  : null
                 )}
                
            </li>

             ) }
            </ul>

        </div>

    );

}

export default MyOffers;