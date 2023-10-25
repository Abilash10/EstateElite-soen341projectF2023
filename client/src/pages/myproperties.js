import { useState, useEffect } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {useGetUserID} from '../hooks/useGetUserID';
import styles from './myproperties.module.css';


function MyProperties() {

    const [properties, setProperties] = useState([]);
    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"]);

    useEffect(() => {

        const fetchProperty = async () => {
            try {
                const response = await axios.get("http://localhost:3001/properties"); // not sure yet
                setProperties(response.data);
                console.log(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProperty();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/properties/${id}`, {
        headers: { authorization: cookies.access_token },
      });
      setProperties(properties.filter((property) => property._id !== id));
      alert("Property Deleted");

        } catch (err) {
            console.error(err);
        }
    };
    return (

        <div>
            <h1>  My properties  </h1>
            <ul className={styles.borderedLi } style={{listStyleType: 'none'}} > 
                {properties.map((property) => ( property.userOwner == userID ? 
                    <li key={property._id}>
                        <div> 
                            <h2> {property.address} </h2>
                        </div> 
                        <div className="info"> 
                            <p> Price: {property.price}$ </p>
                            <p> Type: {property.type} </p>
                            <p> Bathrooms: {property.bathrooms} </p>
                            <p>Bedrooms: {property.bedrooms}</p>
                            <p>Parking: {property.parking} </p>
                            { property.pool ? <p> Pool </p> : null}
                        </div>
                        <img src={property.imageUrl} alt={property.address} />
                        <button onClick={() => handleDelete(property._id)}> Delete property </button>
                    </li> : null
                ))} 
            </ul>

        </div> 
    );
}

export default MyProperties;