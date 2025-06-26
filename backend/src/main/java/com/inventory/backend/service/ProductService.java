package com.inventory.backend.service;

import com.inventory.backend.dto.ProductDTO;
import com.inventory.backend.dto.ProductPage;
import com.inventory.backend.model.Product;
import com.inventory.backend.model.InventoryMetrics;
import com.inventory.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import  java.util.stream.Collectors;

@Service
public class ProductService {
    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> getFilteredAndSortedProducts(
            Optional<String> nameFilter,
            Optional<String> categoryFilter,
            Optional<Boolean> availability,
            Optional<String> sortBy,
            Optional<String> sortBy2,
            boolean ascending,
            boolean ascending2,
            int page,
            int size
    ){
        List<Product> filtered = repository.findByNameOrCategoryOrAvailability(nameFilter, categoryFilter,availability);

        Comparator<Product> comparator = getComparator(sortBy.orElse(null), ascending);
        if(sortBy2.isPresent()) {
            comparator = comparator.thenComparing(getComparator(sortBy2.get(), ascending2));
        }

        return filtered.stream()
                .sorted(comparator)
                .skip((long) page * size)
                .limit(size)
                .collect(Collectors.toList());
    }
    public ProductPage getFilteredProductsPage(
            Optional<String> nameFilter,
            Optional<String> categoryFilter,
            Optional<Boolean> availability,
            Optional<String> sortBy,
            Optional<String> sortBy2,
            boolean ascending,
            boolean ascending2,
            int page,
            int size
    ){
        List<Product> filtered = repository.findByNameOrCategoryOrAvailability(nameFilter, categoryFilter,availability);

        Comparator<Product> comparator = getComparator(sortBy.orElse(null), ascending);
        if(sortBy2.isPresent()) {
            comparator = comparator.thenComparing(getComparator(sortBy2.get(), ascending2));
        }

        long total = filtered.size();

        List<Product> pageItems = filtered.stream()
                .sorted(comparator)
                .skip((long) page * size)
                .limit(size)
                .toList();

        return new ProductPage(pageItems, total);

    }

    private Comparator<Product> getComparator(String sortField, boolean ascending) {
        Comparator<Product> comparator;

        switch (sortField) {
            case "name":
                comparator = Comparator.comparing(Product::getName, String.CASE_INSENSITIVE_ORDER);
                break;
            case "category":
                comparator = Comparator.comparing(Product::getCategory, String.CASE_INSENSITIVE_ORDER);
                break;
            case "unitPrice":
                comparator = Comparator.comparingDouble(Product::getUnitPrice);
                break;
            case "quantityInStock":
                comparator = Comparator.comparingInt(Product::getQuantityInStock);
                break;
            case "expirationDate":
                comparator = Comparator.comparing(p -> Optional.ofNullable(p.getExpirationDate()).orElse(null),
                        Comparator.nullsLast(Comparator.naturalOrder()));
                break;
            default:
                comparator = Comparator.comparing(Product::getName);
        }
        return ascending ? comparator : comparator.reversed();
    }

    public Product createProduct(ProductDTO dto) {
        Product product = new Product(
                UUID.randomUUID(),
                dto.getName(),
                dto.getCategory(),
                dto.getUnitPrice(),
                dto.getQuantityInStock() != null ? dto.getQuantityInStock() : 0,
                dto.getExpirationDate()
        );
        return repository.save(product);
    }

    public Product updateProduct(UUID id, ProductDTO dto) {
        Product product = repository.findById(id).orElseThrow(() -> new NoSuchElementException("Product not found"));

        product.setName(dto.getName());
        product.setCategory(dto.getCategory());
        product.setUnitPrice(dto.getUnitPrice());
        product.setQuantityInStock(dto.getQuantityInStock());
        product.setExpirationDate(dto.getExpirationDate());
        product.setUpdatedAt(LocalDateTime.now());

        return repository.save(product);
    }

    public void deleteProduct(UUID id) {
        if(!repository.existsById(id)) {
            throw new NoSuchElementException("Product not found");
        }
        repository.delete(id);
    }

    public void markOutOfStock(UUID id) {
        Product product = repository.findById(id).orElseThrow(() -> new NoSuchElementException("Product not found"));
        product.setQuantityInStock(0);
        product.setUpdatedAt(LocalDateTime.now());
        repository.save(product);
    }

    public void markInStock(UUID id, int defaultQuantity) {
        Product product = repository.findById(id).orElseThrow(() -> new NoSuchElementException("Product not found"));
        product.setQuantityInStock(defaultQuantity);
        product.setUpdatedAt(LocalDateTime.now());
        repository.save(product);
    }

    public InventoryMetrics getMetrics() {
        List<Product> all = repository.findAll();
        return InventoryMetrics.fromProductList(all);
    }

    public Set<String> getAllCategories() {
        return repository.findAll().stream()
                .map(Product::getCategory)
                .filter(Objects::nonNull)
                .collect(Collectors.toCollection(TreeSet::new));
    }
}