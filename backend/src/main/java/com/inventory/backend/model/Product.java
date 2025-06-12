package com.inventory.backend.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

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