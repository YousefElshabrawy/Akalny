import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";
import api from "../../api/api";
const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/meals.json`);
        const loadedMeals = [];
        for (const key in response.data) {
          loadedMeals.push({
            id: key,
            ...response.data[key],
          });
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      } catch (err) {
        if (err.response) {
          //Here Not in the 200 response range
          //These info is send by the backend
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          setIsLoading(false);
          setError(err.message);
        }
      }
    };
    fetchData();
  }, []);
  if (isLoading) {
    return (
      <section className={classes.isLoading}>
        <p>Is Loading...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className={classes.error}>
        <p>{error}</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
