import React from "react";

interface Props {
    filters: any;
    setFilters: (filters: any) => void;
}

const PaginationControls: React.FC<Props> = ({filters, setFilters}) => {
    const page = filters.page || 0;

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
                Page <strong>{page + 1}</strong>
            </span>
            <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => goToPage(page + 1)}>
                Next
            </button>
        </div>
    );
};

export default PaginationControls;