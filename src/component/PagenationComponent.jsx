import React from 'react';
import {Pagination, Stack} from "@mui/material";

const PaginationComponent = ({page, total, sizePerPage, handleChange}) => {
    return (
        <div className='py-2 d-flex justify-content-center'>
            <Stack spacing={2}>
                <Pagination page={page} count={Math.ceil(total / sizePerPage) || 1} variant="outlined" shape="rounded" onChange={handleChange}/>
            </Stack>
        </div>
    );
};

export default PaginationComponent;