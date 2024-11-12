# Classroom-Management-Project

The final handover project is a classroom management project.
You will need to write a classroom management system using React.js, TypeScript, and Redux for the client-side and NestJS for the server-side.

The Figma is available at here [Classroom Management](https://www.figma.com/proto/OboFfLWOHqGSvxqNlrHTHa/Handover-Project?node-id=3%3A25&scaling=min-zoom&page-id=3%3A24&starting-point-node-id=3%3A25)

Make sure that you write your code according to the [Standards Document](./STANDARDS.md)

Here is a brief overview of the technical requirements:

- Make sure to store all sensitive information in environment variables.
- Use Material UI for the project.
- Use Redux for state management.
- Use React-Query(useQuery) for data fetching.
- Use TypeScript for type checking.
- Use NestJS for the server-side.
- Use PostgreSQL for the database.
- Use Sequelize for the ORM.
- Use GitHub for version control, create a master branch that is named after your full name.
- Use branches for each feature you are working on.
- Use pull requests for merging your code.
- Server-side logic should be divided into 3 layers, controller, service, and repository.
- Use Docker for containerization.
- Deploy the project to Azure Cloud.
- Use GitHub Actions for CI/CD.

Client Specifications:

- The client should be a single-page application.
- The client should have a sidebar menu that allows you to navigate between the different screens.
- The client should have a button that allows you to change the color of the application (dark mode and light mode).
- The elements that change color should be the header bar that appears at the top of the site and all the buttons on the site.
- To change the color, use the context of react.

User Stories:

- As a user, I want to be able to view all the classes in the school.
- As a user, I want to be able to delete classes.

- As a user, I want to be able to view all the students in the school.
- As a user, I want to be able to assign a student to one class only, and delete a student.
- As a user, I want to be able to create a class and create a student.

- As a user, I want to be able to view the students in a class and the occupancy.
- As a user, I want to be able to remove a student from the class.

## Validations

- A student ID needs to be a valid Israeli TAZ
- A student cannot be created without an ID, first name, last name, and profession.
- A class cannot be created without an ID, class name, number of places in the class.
- A student cannot be assigned to a class if there are no places available in the class.
- A student can only be removed from a class if they are
  assigned to a class.
- A class can only be deleted if there are no students assigned to the class.
- If a student is removed from a class, the number of remaining places should be updated.

Make sure to ask for a code review from a senior developer after you have completed the project.

Good luck!
