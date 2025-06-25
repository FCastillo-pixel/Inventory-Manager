import React, {useState, useEffect, useCallback} from "react";
import { useCategoryContext } from "../context/CategoryContext";

interface Props {
    filters: any;
    setFilters: (filters: any) => void;
}

const ProductFilters: React.FC<Props> = ({filters, setFilters}) => {
    const [name, setName] = useState(filters.name || "");
    const [category, setCategory] = useState(filters.category || "");
    const [availability, setAvailability] = useState(filters.availability || "");

    const {categories: allCategories} = useCategoryContext();

    const handleApply = useCallback( () => {
            setFilters((prevFilters: any) =>({
            ...prevFilters,
            name,
            category: category === "" ? "" : category,
            availability: availability === "" ? "" : availability === "in",
            page: 0,
        }));
    }, [setFilters, name, category, availability]);


    useEffect(() => {
        handleApply();
    }, [handleApply]);

    return (
        <div className="mb-4 p-4 bg-gray-100 rounded space-y-3">
            <div>
                <label className="block text-sm font-semibold">Search by name:</label>
                <input type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Product name..." />
            </div>

            <div>
                <label className="block text-sm font-semibold">Filter by category</label>
                <select value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded">
                    <option value="">All categories</option>
                    {allCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-semibold">Availability:</label>
                <select 
                value={availability}
                onChange={e => setAvailability(e.target.value)}
                className="w-full p-2 border rounded">
                    <option value="">All</option>
                    <option value="in">In stock</option>
                    <option value="out">Out of stock</option>
                </select>
            </div>
        </div>
    );
};

export default ProductFilters