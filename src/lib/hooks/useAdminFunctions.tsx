import { useState } from "react";
import {
  getFirestore,
  collection,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebase-client.config";

const useAdminFunctions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetDatabase = async () => {
    setLoading(true);
    setError("");

    try {
      // Example: Resetting a specific collection
      const querySnapshot = await getDocs(collection(db, "restaurants"));
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref); // Delete each document
      });

      // Add other collections reset logic here
      // Repeat the above logic for other collections you wish to reset

      alert("Database reset successfully");
    } catch (err) {
      console.error("Error resetting database:", err);
      setError("Failed to reset the database");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    resetDatabase,
  };
};

export default useAdminFunctions;
