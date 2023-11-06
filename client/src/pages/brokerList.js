import React, { useState } from 'react';
import SearchedBrokers from "../components/searchedBrokers.js";
import axios from "axios";
<<<<<<< HEAD


function brokerList() {

=======
import styles from "./home.module.css";



function BrokerList() {

>>>>>>> 19fc788247186cdb0abaf1e0359b3c515a5d6153
    const [brokers, setBrokers] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get(`http://localhost:3001/properties/search/${searchValue}`);
=======
        const response = await axios.get(`http://localhost:3001/broker/search/${searchValue}`);
>>>>>>> 19fc788247186cdb0abaf1e0359b3c515a5d6153
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
<<<<<<< HEAD
  }

export default brokerList;
=======
}
  
export default BrokerList;
>>>>>>> 19fc788247186cdb0abaf1e0359b3c515a5d6153
