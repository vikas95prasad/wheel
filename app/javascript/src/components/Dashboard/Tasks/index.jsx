import React, { useState, useEffect } from "react";
import notesApi from "apis/notes";
import { Button, PageLoader } from "neetoui";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import { PageHeading, SubHeader } from "neetoui/layouts";

import TaskTable from "./TaskTable";
import NewTaskPane from "./NewTaskPane";
import DeleteAlert from "./DeleteAlert";

const Tasks = () => {
  const [loading, setLoading] = useState(true);
  const [showNewTaskPane, setShowNewTaskPane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await notesApi.fetch();
      setTasks(response.data);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }
  return (
    <>
      <PageHeading
        title="Tasks"
        rightButton={() => (
          <Button
            onClick={() => setShowNewTaskPane(true)}
            label="Add Task"
            icon="ri-add-line"
          />
        )}
      />
      {tasks.length ? (
        <>
          <SubHeader
            searchProps={{
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
              clear: () => setSearchTerm(""),
            }}
            deleteButtonProps={{
              onClick: () => setShowDeleteAlert(true),
              disabled: !selectedTaskIds.length,
            }}
            paginationProps={{
              count: tasks.length,
              pageNo: 1,
              pageSize: 10,
            }}
            toggleFilter={{
              value: "test",
            }}
            sortProps={{
              options: [
                { label: "Title", value: "title" },
                { label: "Status", value: "status" },
                { label: "Due Date", value: "due_date" },
              ],
            }}
          />
          <TaskTable
            selectedTaskIds={selectedTaskIds}
            setSelectedTaskIds={setSelectedTaskIds}
            tasks={tasks}
            setShowDeleteAlert={setShowDeleteAlert}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyNotesListImage}
          title="Looks like you don't have any tasks!"
          subtitle="Add your tasks to send customized emails to them."
          primaryAction={() => setShowNewTaskPane(true)}
          primaryActionLabel="Add new note"
        />
      )}
      <NewTaskPane
        showPane={showNewTaskPane}
        setShowPane={setShowNewTaskPane}
        fetchTasks={fetchTasks}
      />
      {showDeleteAlert && (
        <DeleteAlert
          selectedTaskIds={selectedTaskIds}
          onClose={() => setShowDeleteAlert(false)}
          refetch={fetchTasks}
        />
      )}
    </>
  );
};

export default Tasks;
