import api from "./api";
import { Product, ProductDTO, InventoryMetrics } from "../types/Product";

export const getProducts = async (params: any): Promise<Product[]> => {
    const response = await api.get("/products", {params});
    return response.data;
};

export const createProduct = async (product: ProductDTO): Promise<Product> => {
    const response = await api.post("/products", product);
    return response.data;
};

export const updateProduct = async (id: string, product: ProductDTO): Promise<Product> => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
};

export const markOutOfStock = async (id: string): Promise<void> => {
    await api.post(`/products/${id}/outofstock`);
};

export const markInStock = async (id: string, quantity: number = 10): Promise<void> => {
    await api.post(`/products/${id}/instock?defaultQuantity=${quantity}`);
};

export const getMetrics = async (): Promise<InventoryMetrics> => {
    const response = await api.get("/products/metrics");
    return response.data;
};