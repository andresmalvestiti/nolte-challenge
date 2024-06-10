export const getAllWorkouts = 'SELECT * FROM fitness.workouts';

export const addWorkout = `
  INSERT INTO fitness.workouts (title, file_url, feedback, score, insert_date)
  VALUES ($1, $2, $3, $4, NOW())
  RETURNING *;
`;
