package com.inventory.backend.model;

public class Product {
    private UUID id;
    private String name;
    private String category;
    private BigDecimal number;
    private LocalDate expirationDate;
    private int quantityInStock;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}