export interface Product {
    id: string;
    name: string;
    category: string;
    unitPrice: number;
    quantityInStock: number;
    expirationDate?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProductDTO {
    name: string;
    category: string;
    unitPrice: number;
    quantityInStock: number;
    expirationDate?: string;
}

export interface InventoryMetrics {
    totalInStock: number;
    totalValue: number;
    averagePrice: number;
    byCategory: {
        [category: string]: {
            inStock: number;
            totalValue: number;
            averagePrice: number;
        };
    };
}