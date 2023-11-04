import { useState, useEffect } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {useGetUserID} from '../hooks/useGetUserID';


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
    
    const handleAccept = async () => {
        try {
            await axios.put(
                `http://localhost:3001/offers`, {status: "accepted"}
            );

            setOffers((prev) => 
            prev.map((offer) => //temp
            offer._id === null ? {...offer, amount: 'accepted'} : null )
            );

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <h1> Offers </h1>
            <ul> 
                { offers.map((offer) => 
                <li key={offer._id}> 

                    { properties.map((property) => 
                    offer.property == property._id ? 
                    <div> 
                        <p>Property: {property.address}</p>
                        <p> Offer: $ {offer.amount} </p>

                        <button>Accept </button>
                        <button> Rejected </button>
                    </div>

                    : null
                    )}

                </li> 
            
                )}
            </ul>

        </div>
    );
}

 export default  OfferManagement;