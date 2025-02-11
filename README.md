# Project Title

Mr. To Do

## Overview

Aimed at helping families deal with the myriad of tasks that plague everyday life, Mr. To Do is a personal task manager app. You are able to keep track and assign priority and status to whatever task you are working on.

### Problem Space

There is a growing use of task manager apps for the workplace, however there are few that are geared specifically for personal use. With smartphones and children being more in tune with technology, this task manager app solves two problems. The first is having a centralized location for your tasks and the ability to add, delete, or update them. The second problem is that as parents and families grow, there are a lot of tasks to ensure a smoothly running household. In future iterations, this app will expand to allow groupings so parents can assign tasks to children and manage these tasks more efficiently than in the past.

### User Profile

Everyday people who want to have better structure and understanding of all the items they have to accomplish outside of their busy work lives.

### Features

There will be a user profile that will record user task data. That will be handled with a created back-end that will track and store a title, description, priority, and status. A user will be able to filter tasks by priority and status while also having the ability to create, edit, or delete tasks.

## Implementation

Create a back end to store user profiles and data. Create user profile,  logout and delete functions and a centralized dashboard with the ability to add, edit, delete and filter tasks.

### Tech Stack

- React
- Client libraries:
  - react
  - react-router
  - react-modal
  - axios
  - sass

### APIs

Proprietary API user table with username and password details. Additional task table with title, description, priority, and status.
This API allows for creating, editing and deleting of tasks for individual users.

### Sitemap

There will be the home page that allows a user to sign in or sign up. After a successful signup or login, the user will be redirected to their dashboard. From there, a user can add tasks, edit tasks, and filter their own tasks based on priority and status.

### Data

There will be two tables in the database that will be controlled by the back-end dedicated to this site: the users table and the tasks table. The users table will store the username, password, and a unique ID. The tasks table will store the task data and will use a foreign key for user_id in a one-to-one relationship. A user will be able to see their tasks, filter by status or priority and also add and edit tasks. Additionally, the user will be able to delete their account, which will result in task deletion as well.

## Roadmap

- Build out an API server to store user data. GET, POST, PUT, and DELETE requests are implemented as well as authentication and authorization processes.

- Create migrations.

- Test the back-end API (Postman) and fix any issues.

- Set up the project for front-end development. Deploy remote repo for client side.

- Feature: Login/Sign Up

  - Build out the Sign-Up/Login homepage. Test authorization and authentication processes.

- Feature: User Profile

  - Build out the User Profile Menu to handle delete and logout functionality.

- Feature: Dashboard

  - Create a dashboard page to be able to show logged-in users' tasks.

- Feature: Edit/Add Task Page

  - Build out the Edit and Add Task page to ensure all CRUD functionality from the backend is being utilized.

- Implement a filter system on the dashboard page for better user functionality.

---

## Future Implementations

- Potential to add in family settings so parents can add tasks to children's profiles and also have the ability to share tasks among different users.

- Potential to use and implement some machine learning to offer useful links or suggestions on how to complete a task and auto-classification of tasks among categories for easier organization.
