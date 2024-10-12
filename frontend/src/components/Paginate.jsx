import React from "react";
import { Container, Pagination } from "react-bootstrap";

const Paginate = ({ currentPage, totalPage, pageHandler }) => {
  return (
    <Container className="d-flex justify-content-center mt-5">
      <Pagination size="sm" className="pagination-custom">
        <Pagination.First
          onClick={() => pageHandler(1)}
          disabled={currentPage <= 1}
          className="pagination-item"
        />
        <Pagination.Prev
          onClick={() => pageHandler(currentPage - 1)}
          disabled={currentPage <= 1}
          className="pagination-item"
        />

        {[...Array(totalPage)].map((_, i) => (
          <Pagination.Item
            key={i}
            active={i + 1 === currentPage}
            onClick={() => pageHandler(i + 1)}
            className="pagination-item"
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => pageHandler(currentPage + 1)}
          disabled={currentPage >= totalPage}
          className="pagination-item"
        />
        <Pagination.Last
          onClick={() => pageHandler(totalPage)}
          disabled={currentPage >= totalPage}
          className="pagination-item"
        />
      </Pagination>
    </Container>
  );
};

export default Paginate;
