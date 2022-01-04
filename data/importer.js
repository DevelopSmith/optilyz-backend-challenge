const taskController = require("../dist/app_api/controllers/import-dummy-data");
const app = require("../dist/app");

const importer = () => {
  taskController.importUser();
  taskController.importTasks();
}

importer();
