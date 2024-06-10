import { Box, Button, TextField } from '@mui/material'
import { FC, FormEventHandler, useState } from 'react'
import FileUpload from '@/components/FileUpload/FileUpload'
import { WorkoutFormData } from '@/types/workoutFormData'
import Loader from '@/components/Loader/Loader'

interface Props {
  loading: boolean
  onSubmit: (data: WorkoutFormData) => void
}

const WorkoutForm: FC<Props> = ({ onSubmit, loading }) => {
  const [title, setTitle] = useState<string>('')
  const [file, setFile] = useState<File | undefined>(undefined)

  const clear = () => {
    setTitle('')
    setFile(undefined)
  }

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    onSubmit({ title, file: file!! })
    clear()
  }

  return (
    <form onSubmit={submitHandler}>
      <Box className="flex flex-col gap-y-2 w-fit">
        <TextField
          id="title"
          name="title"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size="small"
          fullWidth
          required
        />
        <FileUpload value={file} onChange={setFile} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          className="w-[25%] self-center"
        >
          {loading ? <Loader /> : 'Submit'}
        </Button>
      </Box>
    </form>
  )
}

export default WorkoutForm
