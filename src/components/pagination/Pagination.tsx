import React from "react";
import { observer } from "mobx-react";

const Pagination: React.FC<{
  totalPages: number;
  currentPage: number;
  onPrevClick: () => void;
  onPageClick: (index: number) => void;
  onNextClick: () => void;
  isLoading: boolean;
}> = ({
  totalPages,
  currentPage,
  onPrevClick,
  onPageClick,
  onNextClick,
  isLoading,
}) => {
  const prevButton = currentPage !== 1 && (
    <li
      className="prev-btn page-item"
      onClick={() => !isLoading && onPrevClick()}
    >
      <span className="page-link">Previous</span>
    </li>
  );
  const pageNumbers = [currentPage - 1, currentPage, currentPage + 1].map(
    (index) =>
      index <= totalPages &&
      index !== 0 && (
        <li
          key={index}
          onClick={() =>
            index !== currentPage && !isLoading && onPageClick(index)
          }
          className={`page-btn page-item ${index === currentPage && "active"}`}
        >
          <span className="page-link">{index}</span>
        </li>
      )
  );
  const nextButton = currentPage + 2 < totalPages && (
    <li
      className="next-btn page-item"
      onClick={() => !isLoading && onNextClick()}
    >
      <span className="page-link">Next</span>
    </li>
  );
  return (
    <React.Fragment>
      {currentPage && (
        <nav>
          <ul className="pagination">
            {prevButton}
            {pageNumbers}
            {nextButton}
          </ul>
        </nav>
      )}
    </React.Fragment>
  );
};

export default observer(Pagination);
