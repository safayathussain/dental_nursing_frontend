"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import LoginModal from "@/components/pageComponents/auth/LoginModal";
import RegisterModal from "@/components/pageComponents/auth/RegisterModal";
import AddQuestionModal from "@/components/pageComponents/common/AddQuestionModal";
import React, { useState } from "react";

const layout = ({ children,  }) => {
  const [showAddQuesModal, setShowAddQuesModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

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
        <LoginModal open={showLoginModal} setOpen={setShowLoginModal} setShowRegisterModal={setShowRegisterModal}/>
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

export default layout;
