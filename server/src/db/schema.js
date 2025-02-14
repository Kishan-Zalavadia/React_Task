const { pgTable, varchar, uuid, text, timestamp, date, boolean } = require('drizzle-orm/pg-core')

const users = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    firstName: varchar({ length: 20 }).notNull(),
    lastName: varchar({ length: 25 }).notNull(),
    email: varchar().notNull().unique(),
    password: varchar().notNull(),
    avatar: text(),
    refreshToken: text(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp(),
    deletedAt: timestamp(),
    isAdmin: boolean().default(false),
    isActive: boolean().default(true),
    dateOfBirth: date().notNull()
})

const blogs = pgTable('blogs', {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid().references(() => users.id,{onDelete: 'cascade'}),
    title: varchar().notNull(),
    description: text().notNull(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp(),
    deletedAt: timestamp(),
    isActive: boolean().default(true)
})

const comments = pgTable('comments', {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid().references(() => users.id,{onDelete: 'cascade'}),
    blogId: uuid().references(() => blogs.id,{onDelete: 'cascade'}),
    content: text().notNull(),
    commentedAt: timestamp().defaultNow()
})

const reactions = pgTable('interactions', {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid().references(() => users.id,{onDelete: 'cascade'}),
    blogId: uuid().references(() => blogs.id,{onDelete: 'cascade'}),
    isLiked: boolean().default(true),
    reactionAt: timestamp().defaultNow()
})

module.exports = { users, blogs, comments, reactions }