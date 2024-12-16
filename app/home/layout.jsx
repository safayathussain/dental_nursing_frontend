"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AddQuestionModal from "@/components/pageComponents/common/AddQuestionModal";
import useClickOutside from "@/utils/useClickOutside";
import React, { useRef, useState } from "react";

const layout = ({ children }) => {
  const [showAddQuesModal, setShowAddQuesModal] = useState(false);
 
  return (
    <div>
      <Navbar setShowAddQuesModal={setShowAddQuesModal} />
      {showAddQuesModal && (
        <AddQuestionModal
          open={showAddQuesModal}
          setOpen={setShowAddQuesModal}
        />
      )}
      {children}
      <Footer />
    </div>
  );
};

export default layout;
