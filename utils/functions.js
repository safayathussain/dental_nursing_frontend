import { collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "./firebase";
import { setAuth } from "@/redux/slices/AuthSlice";
import { store } from "@/redux/store";
import { FetchApi } from "./FetchApi";
export const useAuth = () => {
  const auth = useSelector((state) => state.auth?.user);
  return {
    auth: auth,
  };
};
export const useCategories = () => {
  const categories = useSelector((state) => state.category?.categories);
  console.log(categories);
  return {
    categories,
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

export const refreshAccessToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
      {
        method: "post",
        credentials: "include",
      }
    );
    const { data } = await res.json();
    console.log(data);
    if (!data) {
      store.dispatch(setAuth({}));
      return (window.location.href = window.location.href);
    }
    const auth = store.getState().auth.user;
    if (data) {
      store.dispatch(setAuth({ ...auth, accessToken: data }));
    }
  } catch (error) {
    console.log(error);
    store.dispatch(setAuth({}));
    window.location.href = window.location.href;
  }
};
export const logout = async () => {
  await FetchApi({ url: "/auth/logout", method: "post" });
  store.dispatch(setAuth({}));
};

export function timeAgo(postTime) {
  const now = new Date();
  const timestamp = new Date(postTime);
  const diff = now - timestamp; // Difference in milliseconds

  // Calculate time differences
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // Approximation
  const years = Math.floor(days / 365); // Approximation

  // Return the closest meaningful time unit
  if (seconds < 60) return `1 minute ago`; // Always show 1 minute for less than a minute
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days < 30) return `${days} days ago`;
  if (months < 12) return `${months} months ago`;
  return `${years} years ago`;
}
