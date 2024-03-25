// useRestaurant.js
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-client.config";
import { Restaurant } from "../firestore/types";

const useRestaurant = (restaurantId: string) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch a single restaurant by ID
  const fetchRestaurant = async (id: string) => {
    setLoading(true);
    try {
      const docRef = doc(db, "restaurants", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRestaurant({ id: docSnap.id, ...(docSnap.data() as Restaurant) });
      } else {
        console.log("No such document!");
        setRestaurant(null);
      }
    } catch (error) {
      console.error("Error fetching restaurant:", error);
    }
    setLoading(false);
  };

  // Update a single restaurant
  const updateRestaurant = async (updatedRestaurant: Partial<Restaurant>) => {
    if (!restaurantId) return;

    try {
      const restaurantRef = doc(db, "restaurants", restaurantId);
      await updateDoc(restaurantRef, updatedRestaurant);
      fetchRestaurant(restaurantId); // Refresh the restaurant data
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  // Delete a single restaurant
  const deleteRestaurant = async () => {
    if (!restaurantId) return;

    try {
      const restaurantRef = doc(db, "restaurants", restaurantId);
      await deleteDoc(restaurantRef);
      setRestaurant(null); // Clear the deleted restaurant data
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  // Automatically fetch restaurant details when the restaurantId changes
  useEffect(() => {
    if (restaurantId) {
      fetchRestaurant(restaurantId);
    }
  }, [restaurantId]);

  return {
    restaurant,
    loading,
    updateRestaurant,
    deleteRestaurant,
  };
};

export default useRestaurant;
