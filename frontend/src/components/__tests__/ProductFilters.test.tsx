import React from "react";
import {render, screen, fireEvent} from "@testing-library/react"
import ProductFilters from "../ProductFilters";
import {CategoryContext} from "../../context/CategoryContext"

const mockCategories = ["Books", "Electronics"];

test("renders filters and calls setFilters on input chnage", () => {
    const setFilters = jest.fn();

    render(
        <CategoryContext.Provider value={{categories: mockCategories, refreshCategories: jest.fn()}}>
            <ProductFilters filters={{}} setFilters={setFilters} />
        </CategoryContext.Provider> 
    );

    const nameInput = screen.getByPlaceholderText("Product name...");
    fireEvent.change(nameInput, {target: {value: "Keyboard"}});

    const categorySelect = screen.getByTestId("select");
    fireEvent.change(categorySelect, {target: { value: "Books"}});

    expect(screen.getByText("Books")).toBeInTheDocument();
})