import React, {useState, useEffect, useCallback} from "react";
import { getCategories } from "../services/productService";

interface Props {
    filters: any;
    setFilters: (filters: any) => void;
}

const ProductFilters: React.FC<Props> = ({filters, setFilters}) => {
    const [name, setName] = useState(filters.name || "");
    const [category, setCategory] = useState<string[]>(filters.category || []);
    const [availability, setAvailability] = useState(filters.availability || "");

    const [allCategories, setAllCategories] = useState<string[]> ([]);

    useEffect(() => {
        getCategories().then(setAllCategories).catch(err => {
            console.error("Error getting categories");
            setAllCategories([]);
        });
    }, []);

    const handleApply = useCallback( () => {
            setFilters((prevFilters: any) =>({
            ...prevFilters,
            name,
            category,
            availability: availability === "" ? "" : availability === "in",
            page: 0,
        }));
    }, [setFilters, name, category, availability]);

    const toggleCategory = (value: string) => {
        setCategory(prev =>
            prev.includes(value)
            ? prev.filter(c => c !== value)
            : [...prev, value]
        );
    };

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
                <div className="glex flex-wrap gap-2 mt-1">
                    {allCategories.map(cat => (
                        <label key={cat} className="text-sm">
                            <input type="checkbox"
                            checked={category.includes(cat)}
                            onChange={() => toggleCategory(cat)}
                            className="mr-1" />
                            {cat}
                        </label>
                    ))}
                </div>
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