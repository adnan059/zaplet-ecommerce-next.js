import React from "react";
import CategorySheet from "./CategorySheet";
import Searchbar from "./Searchbar";
import ContactIcons from "./ContactIcons";
import { fetchCategories } from "@/lib/server-actions/customer-actions";

const SubHeader = async () => {
  const categories = await fetchCategories();

  if (categories?.error) {
    return (
      <h2 className="errorMessage">
        Failed to load categories. Please try again later.
      </h2>
    );
  }

  return (
    <div className="subHeader">
      <CategorySheet categories={categories} />
      <Searchbar />
      <ContactIcons />
    </div>
  );
};

export default SubHeader;
