import React from "react";
import "./style.scss";

const Pagination = ({ pagination, setPagination }) => {
  const { currentPage, perPage, totalElements } = pagination;

  const totalPages = Math.ceil(totalElements / perPage);

  const handlePageChange = (newPage) => {
    setPagination((prev) => {
      return { ...prev, currentPage: newPage };
    });
  };

  const handleNextSet = () => {
    setPagination((prev) => {
      // Move to the next set of 5 pages
      const nextPage = Math.min(prev.currentPage + 5, totalPages);
      return { ...prev, currentPage: nextPage };
    });
  };

  const handleEndPage = () => {
    setPagination((prev) => ({ ...prev, currentPage: totalPages }));
  };

  const renderPagination = () => {
    const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
    const pages = [];

    for (let i = startPage; i < startPage + 5 && i <= totalPages; i++) {
      pages.push(i);
    }

    return pages.map((page) => (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`pagination-button ${currentPage === page ? "active" : ""}`}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Prev
      </button>

      {renderPagination()}

      <button onClick={handleNextSet} className="pagination-button">
        Next
      </button>

      <button
        onClick={handleEndPage}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        End
      </button>
    </div>
  );
};

export default Pagination;
