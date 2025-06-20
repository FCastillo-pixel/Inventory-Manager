package com.inventory.backend.controller;

import com.inventory.backend.dto.ProductDTO;
import com.inventory.backend.model.InventoryMetrics;
import com.inventory.backend.model.Product;
import com.inventory.backend.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:8080")
public class ProductController {
    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    // GET /products
    @GetMapping
    public List<Product> getProducts(
            @RequestParam Optional<String> name,
            @RequestParam Optional<List<String>> category,
            @RequestParam Optional<Boolean> availability,
            @RequestParam Optional<String> sortBy,
            @RequestParam Optional<String> sortBy2,
            @RequestParam(defaultValue = "true") boolean asc,
            @RequestParam(defaultValue = "true") boolean asc2,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        Set<String> categorySet = category.map(HashSet::new).orElse(null);
        return service.getFilteredAndSortedProducts(
                name,
                Optional.ofNullable(categorySet),
                availability,
                sortBy,
                sortBy2,
                asc,
                asc2,
                page,
                size
        );
    }

    // POST /products
    @PostMapping
    public Product createProduct(@RequestBody @Valid ProductDTO dto) {
        return service.createProduct(dto);
    }

    // PUT /products/{id}
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable UUID id, @RequestBody @Valid ProductDTO dto) {
        return service.updateProduct(id,dto);
    }

    // DELETE /products/{id}
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable UUID id) {
        service.deleteProduct(id);
    }

    // POST /products/{id}/outofstock
    @PostMapping("/{id}/outofstock")
    public void markOutOfStock(@PathVariable UUID id) {
        service.markOutOfStock(id);
    }

    // PUT /products/{id}/instock?defaultQuantity=10
    @PutMapping("/{id}/instock")
    public void markInStock(@PathVariable UUID id, @RequestParam(defaultValue = "10") int defaultQuantity) {
        service.markInStock(id, defaultQuantity);
    }

    // GET /products/metrics
    @GetMapping("/metrics")
    public InventoryMetrics getMetrics() {
        return service.getMetrics();
    }

    @GetMapping("/categories")
    public Set<String> getCategories(){
        return service.getAllCategories();
    }
}