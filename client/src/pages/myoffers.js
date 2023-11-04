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

                const propertyIDs = filteredOffers.map(offer => offer.property);
                setPropertiesID(propertyIDs);
                console.log(propertyIDs);
            } catch (err) {
                console.error(err);
            }
        };
        fetchOffer();

    }, []);

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




    


    return (
        <div> 
            <h1> My offers </h1>
            <ul className={styles.borderedLi}  > 
             { offers.map((offer) =>  
            
            <li key={offer._id}> 
               
                { properties.map((property) => 
                
                offer.property == property._id ? 
                <div> 

                    <h2>Address : {property.address} </h2>

                    <p> Offer: {offer.amount} </p>

                    <p style={{fontWeight:"bold"}}>  Status: {offer.status} </p>


                    <img src={property.imageUrl} alt={property.address} />

                     </div>  : null
                 )}
                
            </li>

             ) }
            </ul>

        </div>

    );

}

export default MyOffers;