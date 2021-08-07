import Card from "../UI/Card";
import { useEffect, useState } from "react";
import DestinationIndex from './DestinationIndex'
import classes from './AvailableDestination.module.css'
import LoadingSpinner from "../UI/LoadingSpinner";



const AvailableDestination = () => {
  const [destinations, setDestination] = useState([]);
  const [isLoading, setIsLoading]=useState(true)
  const [httpError, setHttpError]=useState()

  useEffect(() => {
    setIsLoading(true)
    const fetchDestination = async () => {
      const response = await fetch('https://myparkingsolutions-default-rtdb.firebaseio.com/destinations.json');

      if(!response.ok){
        throw new Error('Something went wrong!')
      }
      const responseData = await response.json();

      const loadedDestination = [];



      for (const key in responseData) {
        loadedDestination.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setDestination(loadedDestination);
      setIsLoading(false)
    };

    fetchDestination().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading){
    return<section className={classes.centered}>
      <LoadingSpinner/>
    </section>
  }
  if(httpError){
    return<section>
      <p>{httpError}</p>
    </section>

  }

  const destinationList = destinations.map((destination) => (
    <DestinationIndex
      key={destination.id}
      id={destination.id}
      name={destination.name}
      description={destination.description}
      price={destination.price}
    />
  ));

  return (
    <section className={classes.destinations}>
      <Card>
        <ul>{destinationList}</ul>
      </Card>
    </section>
  );
};
export default AvailableDestination;
