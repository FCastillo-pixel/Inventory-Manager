import React from "react";
import { Product } from "../types/Product";
import { markOutOfStock, markInStock, deleteProduct } from "../services/productService";

interface Props{
    products: Product[];
    filters: any;
    setFilters: (f: any) => void;
    onEdit: (product: Product) => void;
}

const ProductTable: React.FC<Props> = ({products, filters, setFilters, onEdit}) => {
    const handleSort = (field: string, secondary = false) => {
        if(secondary) {
            setFilters({ ...filters, sortBy2: field, asc2: !filters.asc2});
        }else {
            setFilters({...filters, sortBy: field, asc: !filters.asc});
        }
    };

    const toggleStock = async (product: Product) => {
        if(product.quantityInStock === 0) {
            await markInStock(product.id);
        } else {
            await markOutOfStock(product.id);
        }
        setFilters({ ...filters});
    }

    const handleDelete = async (id:string) => {
        if(window.confirm("Are you sure you want to delete this product?")) {
            await deleteProduct(id);
            setFilters({...filters});
        }
    };

    const getExpirationColor = (exp?: string) => {
        if(!exp) return "";
        const now = new Date();
        const date = new Date(exp);
        const diff = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
        if ( diff < 7) return "bg-red-100";
        if (diff <14) return "bg-yellow-100";
        return "bg-green-100";
    };

    const getStockColor = (stock: number) => {
        if(stock === 0) return "text-gray-400 line-through";
        if(stock < 5) return "text-red-600";
        if(stock <= 10) return "text-yellow-500";
        return "";
    };

    return(
        <table className="w-full border mt-4">
            <thead className="bg-gray-200">
                <tr>
                    <th></th>
                    <th onClick={() => handleSort("name")} className="cursor-pointer">Name</th>
                    <th onClick={() => handleSort("category")} className="cursor-pointer">Category</th>
                    <th onClick={() => handleSort("unitPrice")} className="cursor-pointer">Price</th>
                    <th onClick={() => handleSort("quantityInStock")} className="cursor-pointer">Stock</th>
                    <th onClick={() => handleSort("expirationDate")} className="cursor-pointer">Expiration date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map(p => (
                    <tr
                    key={p.id}
                    className={`${getExpirationColor(p.expirationDate)} border-b`}>
                        <td>
                            <input 
                            type="checkbox"
                            checked={p.quantityInStock === 0}
                            onChange={() => toggleStock(p)}/>
                        </td>
                        <td className={getStockColor(p.quantityInStock)}>{p.name}</td>
                        <td>{p.category}</td>
                        <td>${p.unitPrice.toFixed(2)}</td>
                        <td className={getStockColor(p.quantityInStock)}>{p.quantityInStock}</td>
                        <td>{p.expirationDate ?? "-"}</td>
                        <td>
                            <button
                            onClick={() => onEdit(p)} className="text-blue-600 hove:underline mr-2">
                                Edit
                            </button>
                            <button
                            onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline"> Delete</button>
                        </td>
                    </tr>
                ))}
                {products.length === 0 && (
                    <tr><td colSpan={7} className="text-center py-4 text-gray-500">No available products :C</td></tr>
                )}
            </tbody>
        </table>
    );
};

export default ProductTable;