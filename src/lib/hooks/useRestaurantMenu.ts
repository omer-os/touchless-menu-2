import { useState, useEffect, useCallback } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase-client.config";

// Helper function to construct Firestore path
const constructPath = (base, type, parentId) => {
  return `${base}/${parentId ? `categories/${parentId}/${type}` : type}`;
};

const useMenuItems = (restaurantId, menuId) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseRef = `restaurants/${restaurantId}/menus/${menuId}`;

  const fetchItems = useCallback(
    async (type, parentId = "") => {
      setLoading(true);
      const path = constructPath(baseRef, type, parentId);
      try {
        const querySnapshot = await getDocs(collection(db, path));
        const fetchedItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(fetchedItems);
      } catch (error) {
        console.error(`Error fetching ${type}:`, error);
      } finally {
        setLoading(false);
      }
    },
    [baseRef]
  );

  const addItem = async (type, item, parentId = "") => {
    const path = constructPath(baseRef, type, parentId);
    try {
      await addDoc(collection(db, path), item);
      fetchItems(type, parentId);
    } catch (error) {
      console.error(`Error adding ${type}:`, error);
    }
  };

  const updateItem = async (type, itemId, updatedItem, parentId = "") => {
    const path = `${constructPath(baseRef, type, parentId)}/${itemId}`;
    try {
      await updateDoc(doc(db, path), updatedItem);
      fetchItems(type, parentId);
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
    }
  };

  const deleteItem = async (type, itemId, parentId = "") => {
    const path = `${constructPath(baseRef, type, parentId)}/${itemId}`;
    try {
      await deleteDoc(doc(db, path));
      fetchItems(type, parentId);
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  return {
    items,
    loading,
    fetchItems,
    addItem,
    updateItem,
    deleteItem,
  };
};

export default useMenuItems;
