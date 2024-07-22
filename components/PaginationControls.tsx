import React from 'react'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

const PaginationControls: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const renderPageButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                buttons.push(
                    <span
                        key={i}
                        className={`join-item btn cursor-pointer ${i === currentPage ? 'bg-primary text-white' : ''}`}
                        onClick={() => onPageChange(i)}
                    >
                        {i}
                    </span>
                );
            } else if (
                (i === currentPage - 2 && currentPage > 4) ||
                (i === currentPage + 2 && currentPage < totalPages - 3) ||
                (i === 2 && currentPage > 4) ||
                (i === totalPages - 1 && currentPage < totalPages - 3)
            ) {
                buttons.push(
                    <span key={i} className="join-item btn btn-disabled">
                        ...
                    </span>
                );
            }
        }
        return buttons;
    };

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    const isSinglePage = totalPages === 1;

    if (isSinglePage) {
        return null; // Don't render pagination controls if there's only one page
    }

    return (
        <div className="flex items-center space-x-2">
            <span
                className={`join-item btn ${isFirstPage ? 'btn-disabled' : 'cursor-pointer'}`}
                onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
            >
                &lt;
            </span>
            {renderPageButtons()}
            <span
                className={`join-item btn ${isLastPage ? 'btn-disabled' : 'cursor-pointer'}`}
                onClick={() => !isLastPage && onPageChange(currentPage + 1)}
            >
                &gt;
            </span>
        </div>
    );
};


export default PaginationControls
