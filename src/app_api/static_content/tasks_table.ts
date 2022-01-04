export default {
  title: "Task",
  description: "definition of columns on Task model",
  type: "object",
  properties: [
    {
      field: "title",
      title: "Title",
      filtering: true,
      type: "string",
    },
    {
      field: "description",
      title: "Description",
      filtering: true,
      type: "string",
    },
    {
      field: "dueAt",
      title: "Due by",
      filtering: true,
      type: "date",
    },
    {
      field: "remindAt",
      title: "Remind At",
      filtering: true,
      type: "date",
    },
    {
      type: "boolean",
      field: "isCompleted",
      title: "Completed",
      filtering: true,
    },
  ],
};
