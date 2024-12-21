import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db, storage } from "./firebase";
import { FetchApi } from "./FetchApi";
import { setAuth } from "@/redux/slices/AuthSlice";
import { store } from "@/redux/store";
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

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};
export const refreshAccessToken = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
    {
      method: "post",
      credentials: "include",
    }
  );
  const { data } = await res.json();
  const auth = store.getState().auth.user;
  if (data) {
    store.dispatch(setAuth({ ...auth, accessToken: data }));
  }
};

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}
export const deleteAllCookies = () => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=")[0].trim();
    deleteCookie(cookie);
  }
};
