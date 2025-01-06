"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import LoginModal from "@/components/pageComponents/auth/LoginModal";
import RegisterModal from "@/components/pageComponents/auth/RegisterModal";
import AddQuestionModal from "@/components/pageComponents/common/AddQuestionModal";
import { setCategories } from "@/redux/slices/CategorySlice";
import { FetchApi } from "@/utils/FetchApi";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Layout = ({ children }) => {
  const [showAddQuesModal, setShowAddQuesModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: categoriesData } = await FetchApi({
          url: "/category/all-categories",
        });
        dispatch(setCategories(categoriesData.data?.data));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    loadData();
  }, []);
  return (
    <div>
      <Navbar
        setShowAddQuesModal={setShowAddQuesModal}
        setShowLoginModal={setShowLoginModal}
        setShowRegisterModal={setShowRegisterModal}
      />
      {showAddQuesModal && (
        <AddQuestionModal
          open={showAddQuesModal}
          setOpen={setShowAddQuesModal}
        />
      )}
      {showLoginModal && (
        <LoginModal
          open={showLoginModal}
          setOpen={setShowLoginModal}
          setShowRegisterModal={setShowRegisterModal}
        />
      )}
      {showRegisterModal && (
        <RegisterModal
          open={showRegisterModal}
          setOpen={setShowRegisterModal}
          setShowLoginModal={setShowLoginModal}
        />
      )}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
