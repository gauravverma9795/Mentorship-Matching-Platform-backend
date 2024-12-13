const { pgTable, text, varchar } = require('drizzle-orm/pg-core');

const users = pgTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  role: text('role').notNull(),
  skills: text('skills'),
  interests: text('interests'),
  bio: text('bio'),
});

module.exports = { users };