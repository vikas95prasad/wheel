import React from "react";
import { Checkbox, Tooltip, Button, Badge } from "neetoui";
import { titleize } from "../../Common/utils/titleize";
import { formatDate } from "../../Common/utils/formatDate";
import { getBadgeColor } from "../Tasks/common/getBadgeColor";
import { handleTaskDelete } from "../Tasks/handler/handleTaskDelete";
import { truncateText } from "../../Common/utils/truncateText";

export default function TaskTable({
  selectedTaskIds,
  setSelectedTaskIds,
  tasks = [],
  setShowDeleteAlert,
}) {
  return (
    <div className="w-full px-4">
      <table className="nui-table--actions nui-table--hover nui-table nui-table--checkbox">
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
            <th className="text-center"></th>
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
                  onClick={e => {
                    e.stopPropagation();
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
              <td className="task-title-width">
                <div>
                  <Button
                    href="#"
                    style="link"
                    label={truncateText(task.title)}
                  />
                </div>
              </td>
              <td className="text-left task-description-width">
                <div>{truncateText(task.description, 40)}</div>
              </td>
              <td className="text-center">
                <Badge color={getBadgeColor[task.status]}>
                  {titleize(task.status)}
                </Badge>
              </td>
              <td className="text-center">{formatDate(task.created_at)}</td>
              <td className="text-center">{formatDate(task.due_date)}</td>
              <td className="text-center">
                <span className="flex space-x-4">
                  <Tooltip content={"Edit"} position="bottom">
                    <Button style="icon" icon="ri-pencil-line" />
                  </Tooltip>
                  <Tooltip content={"Delete"} position="bottom">
                    <Button
                      style="icon"
                      icon="ri-delete-bin-line"
                      onClick={() =>
                        handleTaskDelete(
                          task.id,
                          setSelectedTaskIds,
                          setShowDeleteAlert
                        )
                      }
                    />
                  </Tooltip>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
