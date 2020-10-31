import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

const StyledPagination = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 5px;
  text-align: center;
  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    &[aria-current],
    &.current {
      color: var(--red);
    }
  }
`;

const Pagination = ({ pageSize, totalCount, currentPage, skip, base }) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;
  return (
    <StyledPagination>
      {hasPrevPage && (
        <Link to={`${base}${prevPage !== 1 ? `/${prevPage}` : ''}`}>
          ᐊ Prev
        </Link>
      )}
      {[...Array(totalPages)].map((_, i) => (
        <Link
          key={`page${i + 1}`}
          to={`${base}${i === 0 ? '' : `/${i + 1}`}`}
          className={currentPage === 1 && i === 0 ? 'current' : ''}
        >
          {i + 1}
        </Link>
      ))}
      {hasNextPage && <Link to={`${base}/${nextPage}`}>Next ᐅ</Link>}
    </StyledPagination>
  );
};

export default Pagination;
