import { collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db, storage } from "./firebase";
export const useAuth = () => {
  const auth = useSelector((state) => state.auth?.user);
  return {
    auth: auth,
  };
};

export const getUserByEmail = async (email) => {
  try {
    const usersCollection = await collection(db, "users");
    const q = query(usersCollection, where("email", "==", email));
    // Execute the query
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);

    // Process the results
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        console.log("User ID:", doc.id, "User Data:", doc.data());
      });
    } else {
      console.log("No user found with this email.");
    }
  } catch (error) {
    console.error("Error fetching user by email:", error);
  }
};
