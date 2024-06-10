'use client'
import FeedbackModal from '@/components/FeedbackModal/FeedbackModal'
import Loader from '@/components/Loader/Loader'
import WorkoutForm from '@/components/WorkoutForm/WorkoutForm'
import WorkoutTable from '@/components/WorkoutTable/WorkoutTable'
import { Workout } from '@/types/workout'
import { WorkoutFormData } from '@/types/workoutFormData'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false)
  const [loadingList, setLoadingList] = useState<boolean>(false)
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [error, setError] = useState<string | undefined>(undefined)

  const [selectedWorkout, setSelectedWorkout] = useState<Workout | undefined>(
    undefined
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedWorkout(undefined)
  }

  const onViewWorkoutHandler = (workout: Workout) => {
    setSelectedWorkout(workout)
    setIsModalOpen(true)
  }

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoadingList(true)
        const response = await fetch('/api/workouts', {
          method: 'GET',
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        const workouts = data.workouts as Workout[]
        setWorkouts(workouts)
        console.log('Workout plans request successfull', data)
      } catch (error) {
        console.error('Error fetching workout plans', error)
      } finally {
        setLoadingList(false)
      }
    }
    fetchWorkouts()
  }, [])

  const submitHandler = async (data: WorkoutFormData) => {
    const { title, file } = data
    if (!file) {
      setError('File is required')
      return
    }
    setError(undefined)
    const formData = new FormData()
    formData.append('title', title)
    formData.append('file', file)

    try {
      setLoadingUpload(true)
      const response = await fetch('/api/workouts', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      const workout = data.workout as Workout
      setWorkouts((prev) => [...prev, workout])
      setSelectedWorkout(workout)
      setIsModalOpen(true)
      console.log('Form submitted successfully', data)
    } catch (error) {
      console.error('Error submitting form', error)
    } finally {
      setLoadingUpload(false)
    }
  }

  return (
    <Box className="flex flex-col gap-y-16 mt-5 w-full items-center">
      <WorkoutForm onSubmit={submitHandler} loading={loadingUpload} />
      {error && (
        <Typography variant="caption" className="text-red-600">{error}</Typography>
      )}
      {loadingList ? (
        <Loader />
      ) : (
        <WorkoutTable rows={workouts} onView={onViewWorkoutHandler} />
      )}
      <FeedbackModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={selectedWorkout}
      />
    </Box>
  )
}
