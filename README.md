## Code Challenge Backend

To run this backend app, please make sure you have Docker installed on your system. Then run the following command to run the container:
```
docker-compose up -d
```
<br>

**Import the dummy data (optional)**
Please run this command to import some fake tasks to the database and create a new user for testing. This command will build the app first, then run the importing function.
```
npm run importer
```

<br>

**Environment Variables**
For the sake of simplicity, I kept the `.env` in this repo. However this shouldn't be included for security reasons.

<br>

**Run the backend**
To run your backend server, please run
```
npm run dev
```
Now your backend server is running on port `3001`

<br>

**Linting**
To make sure the app doesn't have any linting issues, please run
```
npm run lint
```
This will also fix any minor linting issues you may have.

<br>

**Testing**
To run the tests, please run
```
npm run test
```
This uses Jest to run some tests.

⚠️ This is just an example, it may not work properly because the number of tasks may change. In a real world testing cases, I will use a **another database dedicated to the testing so it doesn't have the fake data we are using for testing**. Also I would do some more effort to create the task first, check the new task in DB and remove the newly added it.


<br>

**Testing the CRUD Endpoints**
We have some endpoints for the user which allows us to

**For the Students/User**
- **Login** `POST /api/login`
- **Register** `POST /api/register`
- **Get the currently logged in user** `GET /api/user`
- **Get user by ID** `GET /api/${user-id}`
- **Get all Users** `GET /api/users`

**For the Tasks**
- **Create a new task** `POST /api/task`
- **Update an existing task** `PATCH /api/task`
- **Delete an existing proudct** `DELETE /api/task`
- **Get an existing task** `GET /api/${task-id}`
- **Get all tasks** `GET /api/tasks`
- **Get paginated tasks** `GET /api/tasks?limit=${limit}&page{page}`