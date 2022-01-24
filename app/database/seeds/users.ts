import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    { id: 1, email: 'eu@brunoziie.com', username: 'brunoziie', name: 'Bruno Ziiê' },
    { id: 2, email: 'teo@weedo.it', username: 'teo', name: 'Teobaldo' },
    { id: 3, email: 'fred@weedo.it', username: 'fred', name: 'Frederyko' },
  ]);
}
