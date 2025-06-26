package com.inventory.backend.model;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class InventoryMetricsTest {
    @Test
    void shouldComputerMetricsByCategoryCorrectly() {
        Product p1 = new Product(UUID.randomUUID(), "Iteam A", "Alimentos", 10.0, 5, null);
        Product p2 = new Product(UUID.randomUUID(), "Iteam B", "Alimentos", 15.0, 5, null);
        Product p3 = new Product(UUID.randomUUID(), "Iteam C", "Electronica", 50.0, 10, null);

        List<Product> products = List.of(p1,p2,p3);
        InventoryMetrics metrics = InventoryMetrics.fromProductList(products);

        assertEquals(20, metrics.getTotalInStock());
        assertEquals(10.0, metrics.getByCategory().get("Alimentos").getAveragePrice());
        assertEquals(100.0, metrics.getByCategory().get("Alimentos").getTotalValue());
    }
}
