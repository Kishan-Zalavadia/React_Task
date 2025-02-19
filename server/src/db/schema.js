const { pgTable, varchar, uuid, text, timestamp, date, boolean } = require('drizzle-orm/pg-core')

const users = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    firstName: varchar({ length: 30 }).notNull(),
    lastName: varchar({ length: 35 }).notNull(),
    email: varchar({length:255}).notNull().unique(),
    password: varchar({length:255}).notNull(),
    avatar:varchar({length:2048}),
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
    title: varchar({length:255}).notNull(),
    description: varchar({length:1000}).notNull(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp(),
    deletedAt: timestamp(),
    isActive: boolean().default(true)
})

const comments = pgTable('comments', {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid().references(() => users.id,{onDelete: 'cascade'}),
    blogId: uuid().references(() => blogs.id,{onDelete: 'cascade'}),
    content: varchar({length:255}).notNull(),
    commentedAt: timestamp().defaultNow(),
    deletedAt:timestamp(),
    isCommented:boolean().default(true)
})

const reactions = pgTable('reactions', {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid().references(() => users.id,{onDelete: 'cascade'}),
    blogId: uuid().references(() => blogs.id,{onDelete: 'cascade'}),
    isLiked: boolean(),
    reactionAt: timestamp().defaultNow()
})

module.exports = { users, blogs, comments, reactions }