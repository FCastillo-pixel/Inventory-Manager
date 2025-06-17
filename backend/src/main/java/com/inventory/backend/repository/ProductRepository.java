package com.inventory.backend.repository;

import com.inventory.backend.model.Product;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;

@Repository
public class ProductRepository {
    private final Map<UUID, Product> products = new HashMap<>();

    public List<Product> findAll(){
        return  new ArrayList<>(products.values());
    }

    public Optional<Product> findById(UUID id) {
        return Optional.ofNullable(products.get(id));
    }

    public Product save(Product product) {
        products.put(product.getId(), product);
        return product;
    }

    public void delete(UUID id) {
        products.remove(id);
    }

    public boolean existsById(UUID id) {
        return products.containsKey(id);
    }

    public void clear() {
        products.clear();
    }

    public List<Product> findByNameOrCategoryOrAvailability(
            Optional<String> nameFilter,
            Optional<Set<String>> categoryFilter,
            Optional<Boolean> availability
    ) {
        return products.values().stream()
                .filter(p -> nameFilter.map(name -> p.getName().toLowerCase().contains(name.toLowerCase())).orElse(true))
                .filter(p -> categoryFilter.map(categories -> categories.contains(p.category())).orElse(true))
                .filter(p -> availability.map(avail -> avail == p.isInStock()).orElse(true))
                .collect(Collectors.toList());
    }
}