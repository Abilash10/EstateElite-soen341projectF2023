import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styles from './addProperty.module.css';


export const AddProperty = () => {
  const userID = useGetUserID();
  console.log('User ID:', userID);
  const [cookies, _] = useCookies(["access_token"]);
  const [property, setProperty] = useState({
    address: "",
    price: 0,
    type: "Rent",
    bathrooms: 1,
    bedrooms: 1,
    parking: 1,
    pool: false,
    imageUrl: "",
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setProperty({ ...property, [name]: checked });
    } else {
      setProperty({ ...property, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/properties",
        { ...property },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Property Created");
      console.log('Sending property data:', property);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="address">Address: </label>
          <input type="text" id="address" name="address" value={property.address} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="price">Price: </label>
          <input type="number" id="price" name="price" value={property.price} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="type">Type: </label>
          <select id="type" name="type" value={property.type} onChange={handleChange} required>
            <option value="Rent">Rent</option>
            <option value="Buy">Buy</option>
          </select>
        </div>
        <div>
          <label htmlFor="bathrooms">Number of Bathrooms: </label>
          <select id="bathrooms" name="bathrooms" value={property.bathrooms} onChange={handleChange} required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label htmlFor="bedrooms">Number of Bedrooms: </label>
          <select id="bedrooms" name="bedrooms" value={property.bedrooms} onChange={handleChange} required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div>
          <label htmlFor="parking">Number of Parking Spots: </label>
          <select id="parking" name="parking" value={property.parking} onChange={handleChange} required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label htmlFor="pool">Pool: </label>
          <input type="checkbox" id="pool" name="pool" checked={property.pool} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="imageUrl">Image URL: </label>
          <input type="text" id="imageUrl" name="imageUrl" value={property.imageUrl} onChange={handleChange} required />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
);
};