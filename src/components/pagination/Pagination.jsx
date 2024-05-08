import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded({ count, onChange }) {
  return (
    <Stack spacing={4}>
      <Pagination count={count} variant="outlined" shape="rounded" onChange={onChange}/>
    </Stack>
  );
}
