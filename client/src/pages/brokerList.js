import React, { useState } from 'react';
import SearchedBrokers from "../components/searchedBrokers.js";
import axios from "axios";


function brokerList() {

    const [brokers, setBrokers] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/properties/search/${searchValue}`);
        setBrokers(response.data);
      } catch (err) {
        console.error(err);
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

export default brokerList;