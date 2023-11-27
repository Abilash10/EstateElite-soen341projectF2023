import { useState, useEffect } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {useGetUserID} from '../hooks/useGetUserID';
import styles from './myproperties.module.css';


function MyProperties() {

    const [properties, setProperties] = useState([]);
    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"]);

    //functions to edit price of properties
    const [editId, setEditId] = useState(null);
    const [newPrice, setNewPrice] = useState(0);

    const handleEdit = (id, currentPrice) => {
        setEditId(id);
        setNewPrice(currentPrice);
    };

    const handlePriceChange = (e) => {
        setNewPrice(e.target.value);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(
                `http://localhost:3001/properties/${editId}`,
                { price: newPrice }
            );

            setProperties((prev) => 
            prev.map((property) => 
            property._id === editId ? {...property, price: newPrice} : property )
            );
            setEditId(null);
        } catch (err) {
            console.error(err);
        }
    };




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
            <ul className={styles.borderedLi } style={{listStyleType:'none'}} > 
                {properties.map((property) => ( property.userOwner == userID ? 
                    <li key={property._id}>
                        <div className={styles.propertyInfo} > 
                            <h2> {property.address} </h2>
                        </div> 
                        <div className="info"> 
                            <p> 
                                Price: {" "} $
                                {
                                    editId === property._id ? (
                                        <>
                                            <input
                                                className={styles.inputField}
                                                type="number"
                                                value={newPrice}
                                                onChange={handlePriceChange}
                                            />
                                            <button className={styles.updateButton} onClick={handleUpdate}> Update </button>
                                        </>
                                    ) : (property.price)
                                } 
                                <button 
                                    onClick={() => handleEdit(property._id, property.price)} 
                                    className={styles.editButton}
                                > 
                                    Edit
                                </button>

                            </p>
                            <p> Type: {property.type} </p>
                            <p> Bathrooms: {property.bathrooms} </p>
                            <p>Bedrooms: {property.bedrooms}</p>
                            <p>Parking: {property.parking} </p>
                            { property.pool ? <p> Pool </p> : null}
                            <p>Visits: {property.visitRequests.length} </p>
                        </div>
                        <img src={property.imageUrl} alt={property.address} />
                        <br/>
                        <button 
                        onClick={() => handleDelete(property._id)}
                        className={styles.deleteButton}
                        > 
                        Delete property 
                        </button>
                        <br/>
                        <br/>
                    </li> : null
                ))} 
            </ul>

        </div> 
    );
}

export default MyProperties;