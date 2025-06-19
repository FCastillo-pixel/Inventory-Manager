import React, {useEffect, useState} from "react";
import {
    getProducts,
    deleteProduct,
    markOutOfStock,
    markInStock,
    getMetrics,
}from "../services/productService"
import { Product, InventoryMetrics } from "../types/Product";

const InventoryPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [metrics, setMetrics] = useState<InventoryMetrics | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState(0);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getProducts({page, size: 10});
            const m = await getMetrics();
            setProducts(data);
            setMetrics(m);
        }catch (err) {
            console.log("Error loading products", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const handleToggleStock = async (product: Product) => {
        if(product.quantityInStock === 0) {
            await markInStock(product.id, 10);
        }else {
            await markOutOfStock(product.id);
        }
        fetchData();
    };

    const handleDelete = async (id: string) => {
        await deleteProduct(id);
        fetchData();
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Inventory</h1>

            {metrics && (
                <div className="mb-4">
                    <p>Total in stock: {metrics.totalInStock}</p>
                    <p>Total value: ${metrics.totalValue.toFixed(2)}</p>
                    <p>Average Price: ${metrics.averagePrice.toFixed(2)}</p>
                </div>
            )}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full border border-gray-300 text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th>In Stock</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Expiration</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((prod) => (
                            <tr 
                                key={prod.id}
                                className={
                                    prod.quantityInStock === 0 ? "line-through bg-gray-200" :
                                    !prod.expirationDate ? "" :
                                    new Date(prod.expirationDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                                    ? "bg-red-100"
                                    : new Date(prod.expirationDate) < new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
                                    ? "bg-yellow-100"
                                    : "bg-green-100" 
                                }
                            >
                                <td>
                                    <input type="checkbox" checked={prod.quantityInStock > 0} onChange={() => handleToggleStock(prod)} />
                                </td>
                                <td>{prod.name}</td>
                                <td>{prod.category}</td>
                                <td>${prod.unitPrice}</td>
                                <td
                                className={
                                    prod.quantityInStock > 10
                                    ? ""
                                    : prod.quantityInStock >= 5
                                    ? "text-orange-500"
                                    : prod.quantityInStock > 0
                                    ? "text-red-500"
                                    : ""
                                }
                                >
                                    {prod.quantityInStock}
                                </td>
                                <td>{prod.expirationDate || "-"}</td>
                                <td>
                                    <button className="text-blue-500" onClick={() => {/*falta editar*/}}>Edit</button>
                                    <button className="text-red-500 ml-2" onClick={() => handleDelete(prod.id)}>Delete</button>
                                </td>
                            </tr>   
                        ))}
                    </tbody>
                </table>
            )}

            <div className="mt-4">
                <button disabled={page === 0} onClick={() => setPage(page - 1)}> Prev </button>
                <span className="mx-2">Page {page + 1}</span>
                <button onClick={() => setPage(page + 1)}> Next </button>
            </div>
        </div>
    );
};

export default InventoryPage