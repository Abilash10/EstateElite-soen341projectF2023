import styles from "./home.module.css";
import sP from "../components/searchedProperties.js";

function Home() {
    return (
        <div>
     
<div className={styles.main} >
  <div className={styles.searchContainer}>
    <input className={styles.searchBox} type="text" placeholder="Search by location or address..." name="searchProperties" />
    <div className={styles.buttonContainer}>
      <button className={styles.advancedFiltersBtn} type="submit">Advanced Filters</button>
      <button className={styles.searchBtn} type="submit" onSubmit={sP}>Search</button>
    </div>
  </div>
</div>


</div>
    );
}

export default Home;