import { Workout } from '@/types/workout'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DownloadIcon from '@mui/icons-material/Download'
import { format } from 'date-fns'
import { FC } from 'react'
import Link from 'next/link'

interface Props {}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

interface Props {
  rows: Workout[]
  onView: (workout: Workout) => void
}

const WorkoutTable: FC<Props> = ({ rows, onView }) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell align="right">Title</TableCell>
          <TableCell align="right">Score</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {format(row.insert_date, 'yyyy-MM-dd')}
            </TableCell>
            <TableCell align="right">{row.title}</TableCell>
            <TableCell align="right">{row.score}/100</TableCell>
            <TableCell align="right">
              <IconButton type="button" onClick={() => onView(row)}>
                <VisibilityIcon />
              </IconButton>
              <Link href={`http://localhost:4566/${row.file_url}`}>
                <DownloadIcon />
              </Link>
              {/* <IconButton type="button" onClick={() => {}}>
                <DownloadIcon />
              </IconButton> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)

export default WorkoutTable
