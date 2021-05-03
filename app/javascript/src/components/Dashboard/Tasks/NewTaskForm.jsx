import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Input, Select } from "neetoui/formik";
import { Button } from "neetoui";
import notesApi from "apis/notes";
import { titleize } from "../../Common/lib/titleize";

export default function NewTaskForm({ onClose, refetch }) {
  const handleSubmit = async values => {
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

  const taskStatuses = ["todo", "in_progress", "completed"];
  const getFormattedOptions = statuses =>
    statuses.map(status => ({
      value: status,
      label: titleize(status),
    }));
  const formattedTaskStatuses = getFormattedOptions(taskStatuses);

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{
        title: "",
        description: "",
        status: "",
        dueDate: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object({
        title: yup.string().required("Title is required."),
        description: yup.string().required("Description is required."),
        dueDate: yup.string().required("Due Date is required."),
      })}
    >
      {({ isSubmitting }) => (
        <Form>
          <Input label="Title" name="title" className="mb-3" />
          <Input label="Description" name="description" className="mb-3" />
          <Select
            label="Task Status"
            name="status"
            placeholder="Select task status"
            options={formattedTaskStatuses}
            className="mb-3"
          />
          <Input label="Due Date" name="dueDate" type="date" className="mb-3" />
          <div className="nui-pane__footer nui-pane__footer--absolute">
            <Button
              onClick={onClose}
              label="Cancel"
              size="large"
              style="secondary"
            />

            <Button
              type="submit"
              label="Submit"
              size="large"
              style="primary"
              className="ml-2"
              disabled={isSubmitting}
              loading={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
