
const sequelize = require('../database');
const Student = require('./student');
const Course = require('./course');

// Many-to-Many Association
Student.belongsToMany(Course, { through: 'StudentCourses' });
Course.belongsToMany(Student, { through: 'StudentCourses' });

module.exports = {
    sequelize,
    Student,
    Course
};
