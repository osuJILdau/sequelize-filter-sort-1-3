const { User, Author, Student, Course, Order } = require('./models');

async function seed() {
  const anna = await User.create({ name: 'Анна', email: 'anna@example.com', isActive: true });
  const boris = await User.create({ name: 'Борис', email: 'boris@example.com', isActive: true });
  await User.create({ name: 'Виктор', email: 'viktor@example.com', isActive: true });
  const diana = await User.create({ name: 'Диана', email: 'diana@example.com', isActive: false });

  await anna.createPost({ title: 'Изучаем JavaScript', publishedAt: '2024-04-05', status: 'published', createdAt: '2024-04-05' });
  await anna.createPost({ title: 'Основы SQL', publishedAt: '2023-08-12', status: 'published', createdAt: '2023-08-12' });
  await anna.createPost({ title: 'Старая заметка', publishedAt: '2022-05-14', status: 'draft', createdAt: '2022-05-14' });
  await boris.createPost({ title: 'Первая статья', publishedAt: '2025-01-10', status: 'draft', createdAt: '2025-01-10' });
  await boris.createPost({ title: 'Новости проекта', publishedAt: '2025-03-02', status: 'published', createdAt: '2025-03-02' });
  await diana.createPost({ title: 'Мой блог', publishedAt: '2024-06-18', status: 'published', createdAt: '2024-06-18' });

  const petrov = await Author.create({ firstName: 'Иван', lastName: 'Петров', country: 'Россия' });
  const sidorova = await Author.create({ firstName: 'Елена', lastName: 'Сидорова', country: 'Россия' });
  await Author.create({ firstName: 'Мария', lastName: 'Волкова', country: 'Россия' });

  await petrov.createBook({ title: 'Введение в базы данных', year: 2021, genre: 'Учебник' });
  await petrov.createBook({ title: 'Программирование', year: 2023, genre: 'Учебник' });
  await sidorova.createBook({ title: 'Город мечты', year: 2022, genre: 'Роман' });

  const anton = await Student.create({ name: 'Антон', group: 'ИС-21' });
  const igor = await Student.create({ name: 'Игорь', group: 'ИС-21' });
  const marina = await Student.create({ name: 'Марина', group: 'ИС-22' });

  const sql = await Course.create({ title: 'Базы данных', credits: 5 });
  const react = await Course.create({ title: 'React', credits: 4 });
  const html = await Course.create({ title: 'HTML и CSS', credits: 2 });
  await anton.addCourse(sql, { through: { grade: 5 } });
  await anton.addCourse(react, { through: { grade: 4 } });
  await igor.addCourse(html, { through: { grade: 5 } });
  await marina.addCourse(react, { through: { grade: 5 } });

  const firstOrder = await Order.create({ number: '1001', status: 'paid', createdAt: '2025-01-20' });
  const secondOrder = await Order.create({ number: '1002', status: 'new', createdAt: '2025-02-10' });
  const thirdOrder = await Order.create({ number: '1003', status: 'shipped', createdAt: '2025-02-15' });

  await firstOrder.createItem({ productName: 'Мышь', quantity: 3, price: 1500 });
  await firstOrder.createItem({ productName: 'Клавиатура', quantity: 4, price: 3000 });
  await secondOrder.createItem({ productName: 'Монитор', quantity: 1, price: 12000 });
  await thirdOrder.createItem({ productName: 'Флешка', quantity: 5, price: 800 });
}

module.exports = seed;
