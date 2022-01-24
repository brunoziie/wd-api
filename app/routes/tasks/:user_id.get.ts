import express from 'express';
import TasksService from '../../services/tasks';

export default async function (req: express.Request, res: express.Response) {
  const rows = await TasksService.getTasksFromUser(req.params.user_id);

  res.json({ ...req.params, rows });
}
