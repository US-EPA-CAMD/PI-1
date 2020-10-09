import React from "react";
import "./TablePagination.css";
const TablePagination = ({
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  pageIndex,
  pageSize,
  paginationFiltering,
}) => {
  const LEFT_PAGE = "LEFT";
  const RIGHT_PAGE = "RIGHT";
  const neighbours = 1;
  /**
   * Helper method for creating a range of numbers
   * range(1, 5) => [1, 2, 3, 4, 5]
   */
  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }

    return range;
  };
  const fetchPageNumbers = () => {
    const totalPages = pageCount - 1;
    const currentPage = pageIndex;
    const pageNeighbours = neighbours;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = pageNeighbours * 2;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };

  function tabs() {
    var pages = fetchPageNumbers();
    pages.unshift(0);
    const tab = (
      <ul className="pagination">
        {pages.map((page, index) => {
          if (page === LEFT_PAGE)
            return (
              <li key={index} className="page-item">
                <div className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">{"..."}</span>
                  <span className="sr-only">...</span>
                </div>
              </li>
            );

          if (page === RIGHT_PAGE)
            return (
              <li key={index} className="page-item">
                <div className="page-link" aria-label="Next">
                  <span aria-hidden="true">{"..."}</span>
                  <span className="sr-only">...</span>
                </div>
              </li>
            );

          return (
            <li
              key={index}
              className={`paginate_button${
                pageIndex === page ? " active" : ""
              }`}
            >
              <button className="page-link" onClick={() => gotoPage(page)}>
                {page + 1}
              </button>
            </li>
          );
        })}
      </ul>
    );
    return tab;
  }

  function nextTab() {
    if (pageIndex !== pageCount - 1) {
      return (
        <li
          className="page-item"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <button className="page-link">{"Next"}</button>
        </li>
      );
    }
    return (
      <li className="page-item" disabled={true}>
        <button className="page-link">{"Next"}</button>
      </li>
    );
  }
  return (
    <div className="Test">   
        Showing {pageIndex * pageSize + 1} to{" "}
        {Math.min(
          (pageIndex + 1) * pageSize,
          paginationFiltering[paginationFiltering.length - 1]
        )}{" "}
        of {paginationFiltering[paginationFiltering.length - 1]} entries
      
      <div className="paginationTabs">
        <ul className="pagination">
          <li
            className="page-item"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <button className="page-link">{"Previous"}</button>
          </li>

          {tabs()}
          {nextTab()}
        </ul>
      </div>
    </div>
  );
};

export default TablePagination;
