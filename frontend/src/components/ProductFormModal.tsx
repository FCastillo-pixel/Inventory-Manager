import React, {useEffect, useState} from "react";
import { Product, ProductDTO } from "../types/Product";
import { createProduct, updateProduct } from "../services/productService";
import { useCategoryContext } from "../context/CategoryContext";

interface Props{
    isOpen: boolean;
    onClose:() => void;
    onSucces: () => void;
    initialData?: Product;
}

const ProductFormModal: React.FC<Props> = ({isOpen, onClose, onSucces, initialData}) => {
    const [form, setForm] = useState<ProductDTO>({
        name: "",
        category: "",
        unitPrice: 0,
        quantityInStock: 0,
        expirationDate: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const {refreshCategories} = useCategoryContext();

    useEffect(() => {
        if(initialData) {
            setForm({
                name: initialData.name,
                category: initialData.category,
                unitPrice: initialData.unitPrice,
                quantityInStock: initialData.quantityInStock,
                expirationDate: initialData.expirationDate || "",
            });
        } else {
            setForm({
                name: "",
                category: "",
                unitPrice: 0,
                quantityInStock: 0,
                expirationDate: "",
            });
        }
        setErrors({});
    }, [initialData, isOpen]);

    if(!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setForm({...form, [name]: name ==="unitPrice" || name === "quantityInStock" ? Number(value) : value});
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> ={};
        if(!form.name.trim()) newErrors.name = "Name is required";
        if(!form.category.trim()) newErrors.category = "Category is required";
        if(form.unitPrice < 0) newErrors.unitPrice = "Price can't less than 0";
        if (form.quantityInStock < 0) newErrors.quantityInStock = "Stock can't be less than 0";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if(!validate()) return;

        try {
            if(initialData) {
                await updateProduct(initialData.id, form);
            } else {
                await createProduct(form);
            }
            await refreshCategories();
            onSucces();
            onClose();
        }catch (error) {
            alert("Error saving product");
            console.error(error);
        }
    };

    return (
        <div className="fixed inset 0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">
                    {initialData ? "Edit product" : "New product"}
                </h2>

                <div className="space-y-3">
                    <div>
                        <label className="block font-medium">Name:</label>
                        <input type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded" />
                        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block font-medium">Category:</label>
                        <input type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full border p-2 rounded" />
                        {errors.category && <p className="text-red-600 text-sm">{errors.category}</p>}
                    </div>

                    <div className="flex gap-3">
                        <div className="w-1/2">
                            <label className="block font-medium">Price:</label>
                            <input type="number"
                            name="unitPrice"
                            value={form.unitPrice}
                            onChange={handleChange}
                            className="w-full border p-2 rounded" />
                            {errors.unitPrice && <p className="text-red-600 text-sm">{errors.unitPrice}</p>}
                        </div>

                        <div className="w-1/2">
                            <label className="block font-medium">Stock:</label>
                            <input type="number"
                            name="quantityInStock"
                            value={form.quantityInStock}
                            onChange={handleChange}
                            className="w-full border p-2 rounded" />
                            {errors.category && <p className="text-red-600 text-sm">{errors.category}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium">Expiration date (Optional):</label>
                        <input type="date"
                        name="expirationDate"
                        value={form.expirationDate}
                        onChange={handleChange}
                        className="w-full border p-2 rounded" />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductFormModal;