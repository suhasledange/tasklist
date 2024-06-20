import { Close } from '@mui/icons-material'
import React from 'react'

const AppliedFilter = () => {
  return (
    <div className='bg-blue/[0.3] px-2 py-1 flex items-center justify-center'>
        <div>
        <p className='font-semibold text-xs'>Task Type</p>
        <p className='text-xs'>Video Call</p>
        </div>
        <Close className='text-sm ml-2'/>
    </div>
  )
}

export default AppliedFilter
