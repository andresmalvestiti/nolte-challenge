import { AppBar, Toolbar, Container, Box, Typography } from '@mui/material'
import Image from 'next/image'
import { FC } from 'react'

const Header: FC = () => (
  <AppBar position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
      <Box 
          sx={{ 
            width: '5%',
            minWidth: '50px',
            position: 'relative',
            height: 'auto',
          }}
        >
          <Image 
            src="/logo.png" 
            alt="Logo" 
            layout="responsive" 
            width={50} 
            height={50} 
            objectFit="contain" 
          />
          
        </Box>
        <Typography variant='h5'>Fitness Assistant</Typography>
      </Toolbar>
    </Container>
  </AppBar>
)

export default Header
