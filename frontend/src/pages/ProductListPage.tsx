import React, {useCallback, useEffect, useState} from "react";
import { getProducts, getMetrics } from "../services/productService";
import { Product, InventoryMetrics } from "../types/Product";
import ProductTable from "../components/ProductTable";
import ProductFilters from "../components/ProductFilters";
import PaginationControls from "../components/PaginationControls";
import ProductFormModal from "../components/ProductFormModal";

const ProductListPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [metrics, setMetrics] = useState<InventoryMetrics | null>(null);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProducts] = useState<Product | undefined>();

    const [filters, setFilters] = useState({
        name: "",
        category: [] as string[],
        availability: "",
        sortBy: "name",
        sortBy2: "",
        asc: true,
        asc2: true,
        page: 0,
        size: 10,
    });

    const fetchData = useCallback( async () => {
        setLoading(true);
        try {
            const data = await getProducts(filters);
            setProducts(data.items);
            setTotal(data.total);
            const m = await getMetrics();
            setMetrics(m);
        }catch (err) {
            console.log("Error loading products", err);
        } finally {setLoading(false);}
    }, [filters]);
    
    const handleEdit = (product: Product) => {
        setEditingProducts(product);
        setModalOpen(true);
    }

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return(
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Inventory</h1>

            <ProductFilters filters={filters} setFilters={setFilters}></ProductFilters>

            <div className="my-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => {
                    setEditingProducts(undefined);
                    setModalOpen(true);
                }}>
                    New Product
                </button>
            </div>

            <ProductFormModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSucces={fetchData}
            initialData={editingProduct} />

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <ProductTable
                        products={products}
                        filters={filters}
                        setFilters={setFilters}
                        onEdit={handleEdit}
                    />
                    <PaginationControls filters={filters} setFilters={setFilters} total={total}/>
                </>
            )}

            {metrics && (
                <div className="mt-6 p-4 border rounded bg-gray-50">
                    <h2 className="text-lg font-semibold mb-2">General Metrics</h2>
                    <p>Total in stock: {metrics.totalInStock}</p>
                    <p>Total Value: {metrics.totalValue.toFixed(2)}</p>
                    <p>Average price: ${metrics.averagePrice.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
};

export default ProductListPage;