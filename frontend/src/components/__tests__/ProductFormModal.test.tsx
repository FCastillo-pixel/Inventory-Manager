import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import ProductFormModal from "../ProductFormModal";
import { CategoryContext } from "../../context/CategoryContext";

const mockCtx = {
    categories: ["Books", "Food"],
    refreshCategories: jest.fn()
};

test("displays validation errors on submit", async() => {
    render(
        <CategoryContext.Provider value={{categories: [], refreshCategories: jest.fn()}}>
            <ProductFormModal isOpen={true} onClose={() => {}} onSucces={() => {}} />
        </CategoryContext.Provider>
    );

    fireEvent.click(screen.getByText("Save"));
    expect(await screen.findByText("Name is required")).toBeInTheDocument();
});

test("renders form for creating a product", () => {
  render(
    <CategoryContext.Provider value={mockCtx}>
      <ProductFormModal isOpen={true} onClose={() => {}} onSucces={() => {}} />
    </CategoryContext.Provider>
  );

  expect(screen.getByText("New product")).toBeInTheDocument();
});

test("renders form with existing product for editing", () => {
  const initialData = {
    id: "1",
    name: "Laptop",
    category: "Electronics",
    unitPrice: 1000,
    quantityInStock: 10,
    expirationDate: "2025-01-01",
    createdAt: "",
    updatedAt: "",
  };

  render(
    <CategoryContext.Provider value={mockCtx}>
      <ProductFormModal
        isOpen={true}
        onClose={() => {}}
        onSucces={() => {}}
        initialData={initialData}
      />
    </CategoryContext.Provider>
  );

  expect(screen.getByDisplayValue("Laptop")).toBeInTheDocument();
  expect(screen.getByDisplayValue("1000")).toBeInTheDocument();
});
