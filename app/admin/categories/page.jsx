"use client";
import CreateCategoryForm from "@/components/admin/CreateCategoryForm";
import CategoryTable from "@/components/admin/tables/CategoriesTable";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";

const page = () => {
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  return (
    <div>
      {showAddCategoryForm ? (
        <CreateCategoryForm
          setShowAddCategoryForm={setShowAddCategoryForm}
          data={currentCategory}
          setData={setCurrentCategory}
        />
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold">Categories</p>
            <Button
              variant={"primary-blue"}
              onClick={() => setShowAddCategoryForm(true)}
              className={"flex items-center text-white gap-1.5"}
            >
              <FaPlus size={18} /> Add Category
            </Button>
          </div>
          <CategoryTable
            setCurrentEditCategory={setCurrentCategory}
            setShowAddCategoryForm={setShowAddCategoryForm}
          />
        </div>
      )}
    </div>
  );
};

export default page;
