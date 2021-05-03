export const handleTaskDelete = async (
  taskId,
  setSelectedTaskIds,
  setShowDeleteAlert
) => {
  setSelectedTaskIds([taskId]);
  setShowDeleteAlert(true);
};
