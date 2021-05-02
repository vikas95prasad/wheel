import React from "react";
import moment from "moment";
import { Checkbox, Tooltip, Button, Badge } from "neetoui";
import { titleize } from "../../Common/lib/titleize";

export default function TaskTable({
  selectedTaskIds,
  setSelectedTaskIds,
  tasks = [],
}) {
  const getColor = status => {
    return status == "todo"
      ? "red"
      : status == "in_progress"
      ? "blue"
      : "green";
  };

  return (
    <div className="w-full px-4">
      <table className="nui-table nui-table--checkbox">
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={
                  selectedTaskIds.length === tasks.map(task => task.id).length
                }
                onClick={() => {
                  const taskIds = tasks.map(task => task.id);
                  if (selectedTaskIds.length === taskIds.length) {
                    setSelectedTaskIds([]);
                  } else {
                    setSelectedTaskIds(taskIds);
                  }
                }}
              />
            </th>
            <th className="text-left">Title</th>
            <th className="text-left">Description</th>
            <th className="text-center">Status</th>
            <th className="text-center">Created On</th>
            <th className="text-center">Due Date</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr
              key={task.id}
              className={"cursor-pointer bg-white hover:bg-gray-50"}
            >
              <td>
                <Checkbox
                  checked={selectedTaskIds.includes(task.id)}
                  onClick={event => {
                    event.stopPropagation();
                    const index = selectedTaskIds.indexOf(task.id);

                    if (index > -1) {
                      setSelectedTaskIds([
                        ...selectedTaskIds.slice(0, index),
                        ...selectedTaskIds.slice(index + 1),
                      ]);
                    } else {
                      setSelectedTaskIds([...selectedTaskIds, task.id]);
                    }
                  }}
                />
              </td>
              <td>
                <div>{task.title}</div>
              </td>
              <td>{task.description}</td>
              <td className="flex flex-row items-center justify-center text-gray-900">
                <Badge color={getColor(task.status)}>
                  {titleize(task.status)}
                </Badge>
              </td>
              <td className="text-center">
                {task.created_at
                  ? moment(task.created_at).format("D MMMM, YYYY")
                  : "-"}
              </td>
              <td className="text-center">
                {task.due_date
                  ? moment(task.due_date).format("D MMMM, YYYY")
                  : "-"}
              </td>
              <td className="text-center">
                <Tooltip content={"Delete"} position="bottom">
                  <Button style="icon" icon="ri-delete-bin-line" />
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
