package com.inventory.backend.dto;

import com.inventory.backend.model.Product;
import java.util.List;

public class ProductPage {
    private List<Product> items;
    private long total;

    public ProductPage(List<Product> items, long total) {
        this.items = items;
        this.total = total;
    }

    public List<Product> getItems(){
        return items;
    }

    public void setItems(List<Product> items) {
        this.items = items;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }
}
