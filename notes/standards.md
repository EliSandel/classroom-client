# Smartbase Code Standards

### File Naming Convention

1. React Component files should be in Pascal Case with the first letter of every word in uppercase and the rest in lowercase with no spaces like “MyFirstComponent.tsx”
2. All other files should all lowercase separated by hyphens and end with the file category and the the file extension,
   for example `scroll.hook.ts`, `weapon-form.controller.ts`

### Code Conventions

1. Module imports should be arranged so that they form a pyramid, with the shortest import statement on top, and the longest on the bottom.
2. Avoid using the `require` keyword, use `import` instead.
3. Avoid using the `module.exports` keyword, use `export` instead.
4. Avoid using the `function` keyword, use arrow functions instead.
5. Never add or edit methods to native JavaScript Classes, for example `String.prototype.format = myFunction`
6. Always add an empty line before, `if`, `for`, `return`, and `export` statements.
7. Always add an empty line between function declarations.
8. Avoid using the `undefined` keyword
9. Never use the `any` type
10. Always declare the return type in the function declaration
11. Always use the `const` keyword for variables that are not reassigned
12. Always use the `let` keyword for variables that are reassigned
13. Never use the `var` keyword
14. Always use the `===` operator for comparison
15. Always use the `!==` operator for comparison
16. Always use the `?.` operator for optional chaining
17. Always use the `??` operator for nullish coalescing
18. Only use the non-null assertion operator `!` when you are sure that the value is not `null` or `undefined`
19. Always use the `as` keyword for type assertions
20. All TypeScript interfaces should be in PascalCase and should have an `I` prefix, for example `interface IMyInterface`
21. All TypeScript types should be in PascalCase and should have a `T` prefix, for example `type TMyType`
22. All TypeScript enums should be in PascalCase.
23. Constants that are used across the application should in `SCREAMING_SNAKE_CASE`.
24. Always use the `void` type for functions that do not return a value.
25. Before casting to a type, always run validation checks on data parsed from a non-validated format like JSON or XML

### React Conventions

1. All React components should be functional components with de-structured props and have a custom props interface and use the FC type.
2. All React state declarations should be at the top of the component.
3. React useMemo is always preferred over a combination of state and useEffect
4. React state should always have an initial value that is not `undefined`
5. Always initialize React state with a type parameter. For example
   `const [count, setCount] = useState<number>(0);`
6. The React component should always be the default export.
7. Only one component should be exported from a file

### CSS Conventions

1. Always use CSS-in-JS for styling React components except for very specific cases where pure CSS is required.
2. When using pure CSS, make sure to place the CSS in a separate file within the component folder with the same name as the component.
3. Pure CSS class names should be in kebab-case.
4. When using CSS-in-JS, make sure to place the styles in a separate file within the component folder with the same name as the component and append `.style.ts` to the file name.
5. CSS-in-JS class names should be in camelCase.
6. When using CSS-in-JS, make sure to the department's internal CSS-in-JS utility, an example can be found in the `./examples/styles` file.

### Database Conventions

1. Always use a database migration tool like Sequelize to manage the database schema.
2. All databases tables should be named in snake_case in pluralized form.
3. All database columns should be named in snake_case.
4. Dimension tables that are not created via end-user input should have an `id` column as the primary key that is a auto-incrementing integer.
5. Fact tables that are created via end-user input should have a `uuid` column as the primary key, and a `created_at` and `updated_at` column.
6. Important database Fact tables should always be "soft deleted" by adding a `deleted_at` column as per the Sequelize documentation.
