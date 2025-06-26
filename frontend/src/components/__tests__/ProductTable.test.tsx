import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import ProductTable from "../ProductTable";
import { Product } from "../../types/Product";

const mockProducts: Product[] = [
    {
        id: "1",
        name: "Teclado",
        category: "Electronics",
        unitPrice: 25.5,
        quantityInStock: 8,
        expirationDate: "2025-12-01",
        createdAt: "2025-06-01T00:00:00",
        updatedAt: "2025-06-01T00:00:00",
    },
    {
        id: "2",
        name: "Teclado2",
        category: "Electronics",
        unitPrice: 25.5,
        quantityInStock: 7,
        expirationDate: "2025-12-02",
        createdAt: "2025-06-01T00:00:00",
        updatedAt: "2025-06-01T00:00:00",
    }
];

test("renders product name and stock", () => {
    render(
        <ProductTable
        products={mockProducts}
        filters={{}}
        setFilters={jest.fn()}
        onEdit={jest.fn()}
        />
    );

    expect(screen.getByText("Teclado")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
});

test("calls onEdit when edit button is clicked", () => {
    const onEdit = jest.fn();
    render(
        <ProductTable
        products={mockProducts}
        filters={{}}
        setFilters={jest.fn()}
        onEdit={onEdit}
        />
    );

    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(onEdit).toHaveBeenCalledWith(mockProducts[0]);
});

test("toggles stock checkbox", () => {
    const setFilters = jest.fn();
    render(
        <ProductTable
        products={mockProducts}
        filters={{}}
        setFilters={setFilters}
        onEdit={jest.fn()} />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).toBe(2);
})