# Just a Todo React App(TypeScript) with ASP. NET Web API and SQLite database

## Running the client React app

In the TodosClient project directory, you can run:

### `npm install` and then `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
JSON Web Token is stored in Locacl storage upon Signup/Login and the access to the Todo page is restricted by token.

Run the TodosServer either with Visual Studio: IDE or via dotnet CLI command. 
API will run on following port [https://localhost:7008](https://localhost:7008) and here are the endpoins:

> **Post:**  .../api/Auth/signup
> **Post:**  .../api/Auth/login
> **Get:**  .../api/Task/TaskList
> **Post:**  .../api/Task/CreateTask
> **Get:**  .../api/Task/DeleteTask
> **Post:**  .../api/Task/UpdateTask

You can use [DB Browser for SQLite](https://sqlitebrowser.org/) to view/edit the database.


Here is dummy user, just in case:

**Username:** Bob
**Password:** toaster
