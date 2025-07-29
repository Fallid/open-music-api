/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('songs', {
    id: { type: 'VARCHAR(50)', primaryKey: true },
    title: { type: 'VARCHAR(50)', notNull: true },
    year: { type: 'integer', notNull: true },
    genre: { type: 'VARCHAR(35)', notNull: true },
    performer: { type: 'VARCHAR(40)', notNull: true },
    duration: { type: 'integer', notNull: false },
    album_id: {
      type: 'VARCHAR(50)', notNull: false, references: 'albums', onDelete: 'CASCADE', onUpdate: 'CASCADE',
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
    },
    updated_at: {
      type: 'TIMESTAMP',
      notNull: true,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('songs');
};
