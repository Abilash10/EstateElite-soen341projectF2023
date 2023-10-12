import styles from "./repsonsive.module.css";

function Home() {
    return (
        <div>
     
<div className={styles.row} >
  

  <div className={`${styles.col9} ${styles.colS12}`}>
    <h1>welcome to home page</h1>
    <p>description stufff</p>
  </div>

  <div className={`${styles.col3} ${styles.colS12}`}>
    <div className={styles.aside}>
      <h2>h</h2>
      <p>Ee</p>
      <h2>waasup?</h2>
      <p>heyy</p>
      <h2>wasup2?</h2>
      <p>cool </p>
    </div>
  </div>
</div>


</div>
    );
}

export default Home;