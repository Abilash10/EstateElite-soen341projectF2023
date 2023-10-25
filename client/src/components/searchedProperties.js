import styles from './searchedProperties.module.css';
function SearchedProperties({ properties }) {
    return (
      <div className={styles.container}>
        {properties.map((property, index) => (
          <div key={index} className={styles.propertyCard}>
            <div>
            <img className={styles.propertyImg} src={property.imageUrl} alt="Property Image" />
            </div>
            <div className={styles.propertyInfo}>
                <p><strong>Address:</strong> {property.address}</p>
                <p><strong>Price:</strong> ${property.price}</p>
                <p><strong>Type:</strong> {property.type}</p>
                <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
                <p><strong>Parking Spots:</strong> {property.parking}</p>
                <p><strong>Pool:</strong> {property.pool ? "Yes" : "No"}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default SearchedProperties;