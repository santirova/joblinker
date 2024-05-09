import { Pagination, Stack } from "@mui/material";

const PaginationComp = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Stack spacing={2}>
    <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
  </Stack>
  );
};

export default PaginationComp;
