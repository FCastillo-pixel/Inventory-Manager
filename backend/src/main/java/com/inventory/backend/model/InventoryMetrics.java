package com.inventory.backend.model;

import java.util.*;
import java.util.stream.Collectors;

public class InventoryMetrics {
    private int totalInStock;
    private double totalValue;
    private double averagePrice;

    private  Map<String, CategoryMetrics> byCategory;

    public InventoryMetrics() {}

    public InventoryMetrics(int totalInStock, double totalValue, double averagePrice, Map<String, CategoryMetrics> byCategory) {
        this.totalInStock = totalInStock;
        this.totalValue = totalValue;
        this.averagePrice = averagePrice;
        this.byCategory = byCategory;
    }

    public static InventoryMetrics fromProductList(List<Product> products) {
        int totalStock = products.stream().mapToInt(Product::getQuantityInStock).sum();

        double totalValue = products.stream()
                .mapToDouble(Product::getTotalValue)
                .sum();

        List<Product> inStock = products.stream()
                .filter(p -> p.getQuantityInStock() > 0)
                .collect(Collectors.toList());

        double averagePrice = inStock.isEmpty() ? 0:
                inStock.stream().mapToDouble(Product::getUnitPrice).average().orElse(0);

        Map<String, CategoryMetrics> categoryMetrics = products.stream()
                .collect(Collectors.groupingBy(
                        Product::getCategory,
                        Collectors.collectingAndThen(Collectors.toList(), CategoryMetrics::fromProductList)
                ));
        return new InventoryMetrics(totalStock, totalValue, averagePrice, categoryMetrics);
    }

    public int getTotalInStock() {
        return totalInStock;
    }

    public void setTotalInStock(int totalInStock) {
        this.totalInStock = totalInStock;
    }

    public double getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(double totalValue) {
        this.totalValue = totalValue;
    }

    public double getAveragePrice() {
        return averagePrice;
    }

    public void setAveragePrice(double averagePrice) {
        this.averagePrice = averagePrice;
    }

    public Map<String, CategoryMetrics> getByCategory() {
        return byCategory;
    }

    public void setByCategory(Map<String, CategoryMetrics> byCategory) {
        this.byCategory = byCategory;
    }

    public static class CategoryMetrics {
        private  int inStock;
        private double totalValue;
        private double averagePrice;

        public static CategoryMetrics fromProductList(List<Product> products) {
            int stock = products.stream().mapToInt(Product::getQuantityInStock).sum();
            double value = products.stream().mapToDouble(Product::getTotalValue).sum();

            List<Product> inStock = products.stream().filter(p -> p.getQuantityInStock() > 0).toList();
            double avg = inStock.isEmpty() ? 0 :
                    inStock.stream().mapToDouble(Product::getUnitPrice).average().orElse(0);

            return new CategoryMetrics(stock, value, avg);
        }

        public CategoryMetrics() {}

        public CategoryMetrics(int inStock, double totalValue, double averagePrice) {
            this.inStock = inStock;
            this.totalValue = totalValue;
            this.averagePrice = averagePrice;
        }

        public double getTotalValue() {
            return totalValue;
        }

        public void setTotalValue(double totalValue) {
            this.totalValue = totalValue;
        }

        public double getAveragePrice() {
            return averagePrice;
        }

        public void setAveragePrice(double averagePrice) {
            this.averagePrice = averagePrice;
        }

        public int getInStock() {
            return inStock;
        }

        public void setInStock(int inStock) {
            this.inStock = inStock;
        }
    }
}