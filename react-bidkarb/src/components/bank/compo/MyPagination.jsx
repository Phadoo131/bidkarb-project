import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

function MyPagination({ currentPage, itemsPerPage, totalItems, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [activePage, setActivePage] = useState(currentPage);

  const handlePageChange = (page) => {
    setActivePage(page);
    onPageChange(page);
  };

  const calculatePageRange = () => {
    const maxButtonsToShow = 4;
    const startPage = Math.max(1, activePage - Math.floor(maxButtonsToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);
  
    const pageRange = [];
    for (let i = startPage; i <= endPage; i++) {
      pageRange.push(
        <Pagination.Item key={i} active={activePage === i} onClick={() => handlePageChange(i)}>
          {i}
        </Pagination.Item>
      );
    }
  
    return pageRange;
  };
  
  

  return (
    <Pagination>
      <Pagination.Prev onClick={() => handlePageChange(activePage - 1)} disabled={activePage === 1} />
      {calculatePageRange()}
      <Pagination.Next onClick={() => handlePageChange(activePage + 1)} disabled={activePage === totalPages} />
    </Pagination>
  );
}

export default MyPagination;