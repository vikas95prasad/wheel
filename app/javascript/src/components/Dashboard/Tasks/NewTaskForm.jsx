import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Input } from "neetoui/formik";
import { Button } from "neetoui";
import notesApi from "apis/notes";

export default function NewTaskForm({ onClose, refetch }) {
  const handleSubmit = async values => {
    try {
      await notesApi.create(values);
      refetch();
      onClose();
    } catch (err) {
      logger.error(err);
    }
  };
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        status: "",
        createOn: "",
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
          <Input label="Description" name="description" />
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
