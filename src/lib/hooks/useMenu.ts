import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase-client.config"; // Adjust this import according to your project structure
import { MenuItem } from "../firestore/types";
import { useState } from "react";

const useMenu = (restaurantId: string) => {
  const menuItemsRef = collection(db, `restaurants/${restaurantId}/menus`);
  const [loading, setLoading] = useState(false);

  // Fetch menu items, returning them directly
  const fetchMenuItems = async (
    parentId: string | null = null
  ): Promise<MenuItem[]> => {
    try {
      setLoading(true);
      const q = query(menuItemsRef, where("parentId", "==", parentId));
      const querySnapshot = await getDocs(q);
      setLoading(false);

      return querySnapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...(docSnapshot.data() as MenuItem),
      }));
    } catch (error) {
      console.error("Error fetching menu items:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };

  // Add a new menu item, returning the newly added item
  const addMenuItem = async (menuItem: MenuItem): Promise<MenuItem> => {
    try {
      setLoading(true);
      const docRef = await addDoc(menuItemsRef, menuItem);

      setLoading(false);
      return { ...menuItem, id: docRef.id };
    } catch (error) {
      console.error("Error adding menu item:", error);
      throw error;
    }
  };

  // Update a menu item, returning the updated item data
  const updateMenuItem = async (
    menuId: string,
    updatedMenu: Partial<MenuItem>
  ): Promise<void> => {
    try {
      setLoading(true);
      const menuDocRef = doc(menuItemsRef, menuId);
      await updateDoc(menuDocRef, updatedMenu);
      setLoading(false);
    } catch (error) {
      console.error("Error updating menu item:", error);
      throw error;
    }
  };

  const deleteChildren = async (parentId: string) => {
    const childrenQuery = query(
      menuItemsRef,
      where("parentId", "==", parentId)
    );
    const querySnapshot = await getDocs(childrenQuery);
    for (const docSnapshot of querySnapshot.docs) {
      await deleteChildren(docSnapshot.id); // Delete this item's children first
      await deleteDoc(doc(menuItemsRef, docSnapshot.id)); // Then delete this item
    }
  };

  // Delete a menu item
  const deleteMenuItem = async (menuId: string): Promise<void> => {
    try {
      setLoading(true);
      await deleteChildren(menuId); // Delete all children of this menu item
      await deleteDoc(doc(menuItemsRef, menuId)); // Then delete the item itself
      setLoading(false);
    } catch (error) {
      console.error("Error deleting menu item and its children:", error);
      throw error;
    }
  };

  // Return the functions for external use
  return {
    fetchMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    loading,
  };
};

export default useMenu;
