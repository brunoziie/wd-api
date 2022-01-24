import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('blocks', (table) => {
    table.increments('id');

    table.integer('document_id').unsigned().index();
    table.integer('project_id').unsigned().index();
    table.integer('editor_id').unsigned().index();

    table.string('type');
    table.json('content');
    table.integer('order');

    table.datetime('deleted_at').nullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('blocks');
}
