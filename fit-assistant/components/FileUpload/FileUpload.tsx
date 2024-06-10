import React, { useCallback, useState, FC } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, Box, Typography, useTheme } from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface Props {
  value?: File
  onChange: (file?: File) => void
}

const FileUpload: FC<Props> = ({ value, onChange }) => {
  const { palette } = useTheme()
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles[0])
    },
    [onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 'fit-content',
        gap: 2,
      }}
    >
      <Box
        {...getRootProps()}
        className="flex flex-col p-5 text-center cursor-pointer justify-center items-center"
        sx={{
          border: '2px dashed',
          borderColor: palette.primary.main,
          borderRadius: '4px',
          minHeight: '200px',
          minWidth: '200px',
        }}
      >
        <input {...getInputProps()} name="file"/>
        <UploadFileIcon fontSize='large' color='primary'/>
        {isDragActive ? (
          <Typography>Drop the files here ...</Typography>
        ) : (
          <Typography>
            {`Drag & drop some files here, or click to upload files`}
          </Typography>
        )}
      </Box>
      {value && (
        <Box className="flex w-full">
          <Typography variant="body1">
            Selected file: {value.name}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default FileUpload
