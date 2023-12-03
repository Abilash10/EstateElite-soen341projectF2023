import React, { useState } from 'react';
import SearchedBrokers from "../components/searchedBrokers.js";
import axios from "axios";
import styles from "./brokerList.module.css";



function BrokerList() {

    const [brokers, setBrokers] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/broker/search/${searchValue}`);
        setBrokers(response.data);
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
              placeholder="Search by broker's surname or first name..." 
              name="searchBrokers" 
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)} 
              onKeyPress={handleKeyPress}
              />
              <div className={styles.buttonContainer}>
                  {/* <button className={styles.advancedFiltersBtn} type="submit">Advanced Filters</button> */}
                  <button className={styles.searchBtn} type="submit" onClick={handleSearch}>Search</button>
              </div>
          </div>
          <SearchedBrokers brokers={brokers} />
      </div>
  );
}
  
export default BrokerList;