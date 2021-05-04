import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Input, Select } from "neetoui/formik";
import { Button, DateInput } from "neetoui";
import { titleize } from "../../Common/utils/titleize";
import { getTaskStatusList } from "../Tasks/constants/getTaskStatusList";
import { handleTaskSubmit } from "../Tasks/handler/handleTaskSubmit";

export default function NewTaskForm({ onClose, refetch }) {
  const formatStatus = status =>
    status.map(status => ({ value: status, label: titleize(status) }));

  const handleOnSubmit = values => {
    handleTaskSubmit(values, refetch, onClose);
  };

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
      onSubmit={handleOnSubmit}
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
            options={formatStatus(getTaskStatusList)}
            className="mb-3"
          />
          <DateInput label="Due Date" name="dueDate" className="mb-3" />
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
