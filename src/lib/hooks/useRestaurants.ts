// useRestaurants.js
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase-client.config";
import { Restaurant } from "../firestore/types";

const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "restaurants"));
      const restaurantsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Restaurant), // Cast the document data to the Restaurant type
      }));
      setRestaurants(restaurantsData);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
    setLoading(false);
  };

  const addRestaurant = async (newRestaurant: Restaurant) => {
    try {
      const docRef = await addDoc(collection(db, "restaurants"), newRestaurant);
      const addedRestaurant = { id: docRef.id, ...newRestaurant }; // Create a new restaurant object including the generated id
      setRestaurants((prevRestaurants) => [
        ...prevRestaurants,
        addedRestaurant,
      ]); // Update the state to include the new restaurant
    } catch (error) {
      console.error("Error adding restaurant:", error);
    }
  };

  const updateRestaurant = async (
    id: string,
    updatedRestaurant: Partial<Restaurant>
  ) => {
    // Use Partial<Restaurant> to allow partial updates
    try {
      const restaurantRef = doc(db, "restaurants", id);
      await updateDoc(restaurantRef, updatedRestaurant);
      fetchRestaurants();
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  const deleteRestaurant = async (id: string) => {
    try {
      const restaurantRef = doc(db, "restaurants", id);
      await deleteDoc(restaurantRef);
      fetchRestaurants();
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return {
    restaurants,
    loading,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
  };
};

export default useRestaurants;
