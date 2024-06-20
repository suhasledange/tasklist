import { Close } from '@mui/icons-material';
import React from 'react';

const AppliedFilter = ({ filter, onRemove }) => {
  return (
    <div className='bg-blue/[0.3] px-2 py-1 flex items-center justify-center'>
      <div>
        <p className='font-semibold text-xs'>{filter.type}</p>
        <p className='text-xs'>{filter.value}</p>
      </div>
      <Close className='text-sm ml-2 cursor-pointer' onClick={() => onRemove(filter.type)} />
    </div>
  );
};

export default AppliedFilter;