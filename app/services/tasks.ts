import DB from '../database/connection/connection';
import { jsontable } from '../helpers/db/jsontable';

export default class TasksService {
  static async getTasksFromUser(userId: number | string) {
    const taskJsonTable = jsontable(
      'blocks.content',
      'tasks',
      '$.items[*]',
      ({ column, nested }) => [
        column('$.text', 'text', 'varchar(255)'),
        column('$.status', 'status', 'varchar(255)'),
        column('$.id', 'task_id', 'varchar(255)'),
        nested('$.mentions[*]', ({ column }) => [column('$', 'user_id', 'int')]),
      ]
    );

    return await DB.from(DB.raw(`blocks, ${taskJsonTable}`))
      .select('blocks.id as block_id')
      .select('blocks.project_id')
      .select('blocks.document_id')
      .select('tasks.*')
      .where('blocks.type', 'todo')
      .where('user_id', userId);
    // .toSQL();
  }
}
