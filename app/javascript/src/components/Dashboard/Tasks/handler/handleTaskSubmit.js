import notesApi from "apis/notes";

export const handleTaskSubmit = async (values, refetch, onClose) => {
  try {
    const { title, description, status, dueDate } = values;
    const task = {
      title,
      description,
      due_date: dueDate,
      status: status.value,
    };
    await notesApi.create(task);
    refetch();
    onClose();
  } catch (err) {
    logger.error(err);
  }
};
