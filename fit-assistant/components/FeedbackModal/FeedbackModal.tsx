import React, { FC } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material'
import { Workout } from '@/types/workout'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  justifyContent: 'center'
}

interface Props {
  isOpen: boolean
  onClose: () => void
  content?: Workout
}

const FeedbackModal: FC<Props> = ({ isOpen, onClose, content }) => {
  const { palette } = useTheme()
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="feedback-modal"
      aria-describedby="modal-description"
    >
      <Box sx={style} className="text-center">
        <Typography id="modal-title" variant="h6">
          Workout plan feedback
        </Typography>
        <Typography
          id="modal-title"
          variant="h5"
          sx={{ color: palette.success.main }}
        >
          {content?.score}/100
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {content?.feedback}
        </Typography>
        <Button onClick={onClose} type="button" sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  )
}

export default FeedbackModal
