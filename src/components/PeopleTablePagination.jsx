import React from "react";

const LIMIT = 10;

const PeopleTablePagination = ({ page, total, onChange = () => {} }) => {
  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageIndex) => {
          const isActive = pageIndex === page;
          const paginationHandler = () => onChange(pageIndex);
          return isActive ? (
            <b style={{ cursor: "pointer" }} key={pageIndex}>
              {" "}
              {pageIndex}{" "}
            </b>
          ) : (
            <span
              style={{ cursor: "pointer" }}
              key={pageIndex}
              onClick={paginationHandler}
            >
              {" "}
              {pageIndex}{" "}
            </span>
          );
        }
      )}
    </div>
  );
};

export default PeopleTablePagination;
