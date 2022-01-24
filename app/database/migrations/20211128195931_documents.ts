import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('documents', (table) => {
    table.increments('id');
    table.string('sharable_id');

    table.integer('project_id').unsigned().index();
    table.integer('owner_id').unsigned().index();

    table.string('title');
    table.boolean('public').defaultTo(false);

    table.json('roles');
    table.datetime('deleted_at').nullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('documents');
}
