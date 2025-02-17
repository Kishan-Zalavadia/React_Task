// seeding using faker with drizzle orm query
const{ users, blogs, comments, reactions } =require('./src/db/schema');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt')
const { drizzle } = require('drizzle-orm/node-postgres')

const db = drizzle('postgresql://postgres:Kishan@localhost:5432/Task-4');
// creating records
const seed_data = async () => {

    let userData = [];
    for (i = 0; i < 10; i++) {
        let first_name = faker.person.firstName()
        let last_name = faker.person.lastName()
        let email = faker.internet.email()
        let password = `${first_name.charAt(0).toUpperCase()}${first_name.slice(1, 3).toLowerCase()}@12345`
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        let avatar = faker.image.personPortrait()
        let  dateOfBirth =  faker.date.birthdate({ mode: 'year', min: 1980, max: 2020 })
        userData.push({
            firstName: first_name,
            lastName: last_name,
            email: email,
            password: hashedPassword,
            avatar: avatar,
            dateOfBirth: dateOfBirth,
            createdAt:new Date()
        })
    }
    const insertedUsers = await db.insert(users).values(userData).returning();
    let blogData = [];
    for (let user of insertedUsers) {

        let numPosts = faker.number.int({ min: 0, max: 4 });
        for (let i = 0; i < numPosts; i++) {
            blogData.push({
                userId: user.id,
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraphs(2),
                createdAt: faker.date.past()
            });
        }
    }

    const insertedBlogs = await db.insert(blogs).values(blogData).returning();

    let commentData = [];
    for (let blog of insertedBlogs) {
        let numComments = faker.number.int({ min: 0, max: 4 });
        for (let i = 0; i < numComments; i++) {
            let randomUser = faker.helpers.arrayElement(insertedUsers);
            commentData.push({
                userId: randomUser.id,
                blogId: blog.id,
                content: faker.lorem.sentences(2),
                createdAt:faker.date.past()
            });
        }
    }
    await db.insert(comments).values(commentData);

    let reactionData = [];
    for (let blog of insertedBlogs) {
        let numLikes = faker.number.int({ min: 10, max: 15 });
        let likedUsers = faker.helpers.shuffle(insertedUsers).slice(0, numLikes);
        for (let user of likedUsers) {
            reactionData.push({
                userId: user.id,
                blogId: blog.id,
                isLiked: faker.datatype.boolean()
            });
        }
    }
    await db.insert(reactions).values(reactionData);
    console.log("Data Added")
}

seed_data();