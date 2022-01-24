import { Knex } from 'knex';
import { nanoid } from 'nanoid';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('projects').del();
  await knex('documents').del();
  await knex('blocks').del();

  // Inserts seed entries
  await knex('projects').insert([{ id: 1, name: 'weedocs', key: 'wdc', owner_id: 1 }]);
  await knex('documents').insert([
    { id: 1, title: 'my first documents', project_id: 1, sharable_id: nanoid() },
  ]);

  await knex('blocks').insert([
    {
      id: 1,
      type: 'todo',
      project_id: 1,
      editor_id: 1,
      document_id: 1,
      content: JSON.stringify({
        items: [
          {
            id: nanoid(8),
            status: 'done',
            text: 'create express/knex base',
            mentions: [1, 2],
            due: new Date().getTime(),
          },
          {
            id: nanoid(8),
            status: 'todo',
            text: 'implements cruds',
            mentions: [1],
            due: new Date().getTime(),
          },
          {
            id: nanoid(8),
            status: 'todo',
            text: 'get task list',
            mentions: [2],
            due: new Date().getTime(),
          },
        ],
      }),
    },
  ]);
}
