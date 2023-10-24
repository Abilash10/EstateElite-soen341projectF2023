import styles from "./home.module.css";

function Home() {
    return (
        <div>
     
<div className={styles.main} >
  <div className={styles.searchContainer}>
    <input className={styles.searchBox} type="text" placeholder="Search by location or address..." name="searchProperties" />
    <div className={styles.buttonContainer}>
      <button className={styles.advancedFiltersBtn} type="submit">Advanced Filters</button>
    </div>
  </div>
</div>


</div>
    );
}

export default Home;