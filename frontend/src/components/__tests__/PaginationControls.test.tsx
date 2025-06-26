import React from "react";
import {render, screen, fireEvent} from "@testing-library/react"
import PaginationControls from "../PaginationControls";

test("disbles prev on first page", () => {
    const setFilters = jest.fn();
    render(
        <PaginationControls filters={{page: 0, size: 10}} setFilters={setFilters} total={25} />
    );

    const prevButton = screen.getByText("Return");
    expect(prevButton).toBeDisabled();
});

test("calls setFilters when clicking Next", () => {
    const setFilters = jest.fn();
    render(
        <PaginationControls filters={{page: 0, size: 10}} setFilters={setFilters} total={25} />
    );
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    expect(setFilters).toHaveBeenCalledWith({page: 1, size:10});
});