const sequelize = require('./database');
const seed = require('./seed');
const queries = require('./queries');

async function main() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await seed();

    console.log('\n1. Пользователи с постами после 2023-01-01');
    const users = await queries.getUsersWithRecentPosts();
    for (const user of users) {
      console.log(user.name);
      for (const post of user.posts) {
        console.log(`  ${post.title} — ${post.publishedAt.toISOString().slice(0, 10)}`);
      }
    }

    console.log('\n2. Авторы, включая авторов без книг');
    const authors = await queries.getAllAuthorsIncludingEmpty();
    for (const author of authors) {
      console.log(`${author.lastName} ${author.firstName}: ${author.books.length} книг(и)`);
      for (const book of author.books) console.log(`  ${book.title}`);
    }

    console.log('\n3. Студенты на курсах с credits > 3');
    const students = await queries.getStudentsInAdvancedCourses();
    for (const student of students) {
      console.log(student.name);
      for (const course of student.courses) console.log(`  ${course.title} — ${course.credits}`);
    }

    console.log('\n4. Заказы с товарами в количестве больше 2');
    const orders = await queries.getOrdersWithBulkItems();
    for (const order of orders) {
      console.log(`Заказ ${order.number}`);
      for (const item of order.items) {
        console.log(`  ${item.productName}: ${item.quantity} шт. — ${item.price} руб.`);
      }
    }

    console.log('\n5. Активные пользователи с опубликованными постами');
    const activeUsers = await queries.getActiveUsersWithPublishedPosts();
    for (const user of activeUsers) {
      console.log(user.name);
      for (const post of user.posts) console.log(`  ${post.title}`);
    }
  } catch (error) {
    console.error('Ошибка:', error.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

main();
