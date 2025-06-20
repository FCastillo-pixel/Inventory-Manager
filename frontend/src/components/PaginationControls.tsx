import React from "react";

interface Props {
    filters: any;
    setFilters: (filters: any) => void;
    total: number;
}

const PaginationControls: React.FC<Props> = ({filters, setFilters, total}) => {
    const page = filters.page || 0;
    const size = filters.size || 10;
    const totalPages = Math.ceil(total / size);

    const goToPage = (newPage: number) => {
        setFilters({...filters, page: newPage});
    };

    return (
        <div className="flex justify-between items-center mt-4">
            <button className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => goToPage(page -1)}
            disabled={page <=0}>
                Return
            </button>
            <span className="text-sm">
                Page <strong>{page + 1} of <strong>{totalPages}</strong></strong>
            </span>
            <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => goToPage(page + 1)}
            disabled={page + 1 >= totalPages}>
                Next
            </button>
        </div>
    );
};

export default PaginationControls;