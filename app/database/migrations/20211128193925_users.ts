import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('name');
    table.string('username');
    table.string('email');
    table.boolean('activated');
    table.datetime('deleted_at').nullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
