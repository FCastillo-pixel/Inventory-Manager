package com.inventory.backend.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class ProductDTO {
    @NotBlank(message = "Name is required")
    @Size(max = 120, message = "Name must not exceed 120 characters")
    private String name;

    @NotBlank(message = "Category is required")
    private String category;

    @NotNull(message = "Unit price is required")
    @PositiveOrZero(message = "Unit price must be 0 or more")
    private Double unitPrice;

    @PositiveOrZero(message = "Stock must be 0 or more")
    private Integer quantityInStock;

    private LocalDate expirationDate;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getQuantityInStock() {
        return quantityInStock;
    }

    public void setQuantityInStock(Integer quantityInStock) {
        this.quantityInStock = quantityInStock;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }
}