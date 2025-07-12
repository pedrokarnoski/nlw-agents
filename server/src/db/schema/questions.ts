import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core'
import { rooms } from './rooms.ts'

export const questions = pgTable('questions', {
  id: uuid().primaryKey().defaultRandom(),
  roomId: uuid('room_id')
    .references(() => rooms.id)
    .notNull(),
  question: text('question').notNull(),
  answer: text(),
  createdAt: timestamp().defaultNow().notNull(),
})
