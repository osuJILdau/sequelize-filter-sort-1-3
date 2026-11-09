const { Op } = require('sequelize');
const { User, Post, Author, Book, Student, Course, Order, Item } = require('./models');

async function getUsersWithRecentPosts() {
  // where выбирает новые посты, required оставляет авторов с постами, order сортирует.
  return User.findAll({
    include: [{
      model: Post,
      as: 'posts',
      where: { publishedAt: { [Op.gt]: '2023-01-01' } },
      required: true,
    }],
    order: [
      ['name', 'ASC'],
      [{ model: Post, as: 'posts' }, 'publishedAt', 'DESC'],
    ],
  });
}

async function getAllAuthorsIncludingEmpty() {
  // where нет; required: false сохраняет авторов без книг, order сортирует фамилии.
  return Author.findAll({
    include: [{ model: Book, as: 'books', required: false }],
    order: [['lastName', 'ASC']],
  });
}

async function getStudentsInAdvancedCourses() {
  // where оставляет курсы с credits > 3, required убирает студентов без них, order сортирует.
  return Student.findAll({
    include: [{
      model: Course,
      as: 'courses',
      where: { credits: { [Op.gt]: 3 } },
      required: true,
      through: { attributes: [] },
    }],
    order: [
      ['name', 'ASC'],
      [{ model: Course, as: 'courses' }, 'title', 'ASC'],
    ],
  });
}

async function getOrdersWithBulkItems() {
  // where выбирает товары с quantity > 2, required убирает пустые заказы, order сортирует.
  return Order.findAll({
    include: [{
      model: Item,
      as: 'items',
      where: { quantity: { [Op.gt]: 2 } },
      required: true,
    }],
    order: [
      ['createdAt', 'DESC'],
      [{ model: Item, as: 'items' }, 'price', 'DESC'],
    ],
  });
}

async function getActiveUsersWithPublishedPosts() {
  // Внешний where выбирает активных, внутренний where — опубликованные посты.
  // required исключает пользователей без подходящих постов, order сортирует по имени и дате.
  return User.findAll({
    where: { isActive: true },
    include: [{
      model: Post,
      as: 'posts',
      where: { status: 'published' },
      required: true,
    }],
    order: [
      ['name', 'ASC'],
      [{ model: Post, as: 'posts' }, 'createdAt', 'DESC'],
    ],
  });
}

module.exports = {
  getUsersWithRecentPosts,
  getAllAuthorsIncludingEmpty,
  getStudentsInAdvancedCourses,
  getOrdersWithBulkItems,
  getActiveUsersWithPublishedPosts,
};
