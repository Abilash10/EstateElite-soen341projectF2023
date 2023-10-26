import styles from './searchedProperties.module.css';
import axios from 'axios';
import { useCookies } from "react-cookie";

const userID = window.localStorage.getItem("userID");

function SearchedProperties({ properties }) {

const [cookies, _] = useCookies(["access_token"]);
  
//Add user id to the request visit array of the property
const handleRequestVisit = async (event) => {
  event.preventDefault();
  const propertyId = event.target.parentNode.parentNode.id;
  try{
      const response = await axios.post(`http://localhost:3001/properties/${propertyId}/requestVisit`, { userID },
      {
          headers: { authorization: cookies.access_token },}
          );
      console.log(response);
      alert("Visit Requested!");
  }
  catch(err){
      console.log(err);
  }
}

    return (
      <div className={styles.container}>
        {properties.map((property, index) => (
          <div key={property._id} className={styles.propertyCard} id={property._id}>
            <div className={styles.propertyVisuals}>
            <img className={styles.propertyImg} src={property.imageUrl} alt="Property Image" />
            {userID != undefined && userID != property.userOwner ? <button className={styles.requestVisitBtn} onClick={handleRequestVisit}>Request Visit</button> : null}
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