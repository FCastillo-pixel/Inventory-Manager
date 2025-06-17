package com.inventory.backend.service;

import com.inventory.backend.dto.ProductDTO;
import com.inventory.backend.model.Product;
import com.inventory.backend.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;


public class ProductServiceTest {
    private ProductRepository repository;
    private ProductService service;

    @BeforeEach
    void setUp() {
        repository = new ProductRepository();
        service = new ProductService(repository);
    }

    @Test
    void createProduct_shouldAddProduct() {
        ProductDTO dto = new ProductDTO();
        dto.setName("Keyboard");
        dto.setCategory("Electronics");
        dto.setUnitPrice(95.99);
        dto.setQuantityInStock(2);

        Product created = service.createProduct(dto);

        assertNotNull(created.getId());
        assertEquals("Keyboard", created.getName());
        assertEquals(1, repository.findAll().size());
    }

    @Test
    void markOutOfStock_shouldSetQuantityToZero() {
        ProductDTO dto = new ProductDTO();
        dto.setName("Mouse");
        dto.setCategory("Electronics");
        dto.setUnitPrice(10.50);
        dto.setQuantityInStock(10);

        Product created = service.createProduct(dto);
        UUID id = created.getId();

        service.markOutOfStock(id);

        Product updated = repository.findById(id).orElseThrow();
        assertEquals(0, updated.getQuantityInStock());
    }
}
