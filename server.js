const express = require('express');
const { sequelize, Student, Course } = require('./models');

const app = express();
app.use(express.json());

// Sync database
sequelize.sync({ force: true }).then(async () => {
    console.log('Database synced');

    // Sample Data
    const [student1, student2] = await Promise.all([
        Student.create({ name: 'Alice', email: 'alice@example.com' }),
        Student.create({ name: 'Bob', email: 'bob@example.com' })
    ]);

    const [course1, course2] = await Promise.all([
        Course.create({ name: 'Math', description: 'Basic Mathematics' }),
        Course.create({ name: 'Science', description: 'Basic Science' })
    ]);

    // Establish Many-to-Many relationship
    await student1.addCourse(course1);
    await student1.addCourse(course2);
    await student2.addCourse(course1);

    console.log('Sample data inserted with Many-to-Many association');
});

// Retrieve all students with enrolled courses
app.get('/students', async (req, res) => {
    const students = await Student.findAll({ include: Course });
    res.json(students);
});

// Retrieve all courses with enrolled students
app.get('/courses', async (req, res) => {
    const courses = await Course.findAll({ include: Student });
    res.json(courses);
});

app.listen(3010, () => {
    console.log('Server running on http://localhost:3010');
});
