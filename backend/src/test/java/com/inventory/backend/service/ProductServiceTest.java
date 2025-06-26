package com.inventory.backend.service;

import com.inventory.backend.dto.ProductDTO;
import com.inventory.backend.model.Product;
import com.inventory.backend.model.InventoryMetrics;
import com.inventory.backend.repository.ProductRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;
import java.util.Set;
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

    @Test
    void shouldCalculateMetricsByCategory() {
        ProductDTO dto = new ProductDTO();
        dto.setName("Mouse");
        dto.setCategory("Electronics");
        dto.setUnitPrice(10.0);
        dto.setQuantityInStock(5);
        service.createProduct(dto);

        ProductDTO dto2 = new ProductDTO();
        dto2.setName("book");
        dto2.setCategory("Books");
        dto2.setUnitPrice(20.0);
        dto2.setQuantityInStock(10);
        service.createProduct(dto2);

        InventoryMetrics metrics = service.getMetrics();
        assertEquals(15, metrics.getTotalInStock());
        assertTrue(metrics.getByCategory().containsKey("Books"));
        assertTrue(metrics.getByCategory().containsKey("Electronics"));
    }

    @Test
    void shouldFailValidationOnInvalidDTO() {
        ProductDTO dto = new ProductDTO();
        dto.setName("");
        dto.setCategory("");
        dto.setUnitPrice(-10.0);
        dto.setQuantityInStock(-2);

        Set<ConstraintViolation<ProductDTO>> violations = Validation.buildDefaultValidatorFactory()
                .getValidator()
                .validate(dto);

        assertEquals(4, violations.size());
    }

    @Test
    void shouldSortByNameAndStock() {
        ProductDTO dto1 = new ProductDTO();
        dto1.setName("AAA");
        dto1.setCategory("Cat1");
        dto1.setUnitPrice(10.0);
        dto1.setQuantityInStock(5);

        ProductDTO dto2 = new ProductDTO();
        dto2.setName("AAA");
        dto2.setCategory("Cat2");
        dto2.setUnitPrice(20.0);
        dto2.setQuantityInStock(2);

        service.createProduct(dto1);
        service.createProduct(dto2);

        var result = service.getFilteredAndSortedProducts(
                Optional.empty(),
                Optional.empty(),
                Optional.empty(),
                Optional.of("name"),
                Optional.of("quantityInStock"),
                true,
                false,
                0,
                10
        );

        assertEquals(5, result.get(0).getQuantityInStock());
        assertEquals(2, result.get(1).getQuantityInStock());
    }

}
