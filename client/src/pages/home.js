import styles from "./home.module.css";
import React, { useState } from 'react';
import SearchedProperties from "../components/searchedProperties.js";
import axios from "axios";

function Home() {

  const [properties, setProperties] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/properties/search/${searchValue}`);
      setProperties(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className={styles.main}>
        <div className={styles.searchContainer}>
            <input 
            className={styles.searchBox} 
            type="text" 
            placeholder="Search by location or address..." 
            name="searchProperties" 
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress} 
            />
            <div className={styles.buttonContainer}>
                <button className={styles.searchBtn} type="submit" onClick={handleSearch}>Search</button>
            </div>
        </div>
        <SearchedProperties properties={properties} />
    </div>
);
}

export default Home;