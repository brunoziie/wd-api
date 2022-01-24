import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('projects', (table) => {
    table.increments('id');
    table.integer('owner_id').unsigned().index();
    table.string('name');
    table.string('description').nullable();
    table.string('key');
    table.string('github').nullable();
    table.json('roles').nullable();
    table.datetime('deleted_at').nullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('projects');
}
