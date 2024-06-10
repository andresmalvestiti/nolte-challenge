import { Box, CircularProgress } from '@mui/material'
import { FC } from 'react'

const Loader: FC = () => {
  return (
    <Box className="flex w-full h-full justify-center items-center">
      <CircularProgress/>
    </Box>
  )
}

export default Loader
