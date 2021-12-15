import { Box, Button, HStack } from "@chakra-ui/react";
import {
  Form,
  FormLayout,
  FormField,
  FormIcon,
  FormTitle,
} from "../components/form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function NewFeedback() {
  const [feedback, setFeedback] = useState({
    title: "",
    category: "",
    detail: "",
  });

  let handleChange = (name) => (e) =>
    setFeedback((fb) => ({
      ...fb,
      [name]: e.target.value,
    }));

  let submit = (e) => {
    e.preventDefault();
  };

  return (
    <FormLayout>
      <Form onSubmit={submit}>
        <FormIcon>
          <FaPlus />
        </FormIcon>
        <FormTitle>Create New Feedback</FormTitle>
        <FormField
          type="text"
          label="Feedback Title"
          helperText="Add a short, descriptive headline"
          required
          value={feedback.title}
          onChange={handleChange("title")}
        />

        <FormField
          type="select"
          label="Category"
          helperText="choose a category for your feedback"
          options={["option1", "opton2"]}
          required
          value={feedback.category}
          onChange={handleChange("category")}
        />

        <FormField
          type="textarea"
          label="Feedback Detail"
          helperText="Include any specific comments on what should be improved, added, etc."
          required
          value={feedback.detail}
          onChange={handleChange("detail")}
        />

        <Box
          display="flex"
          w="full"
          justifyContent="flex-end"
          alignItems="center"
        >
          <HStack spacing={4}>
            <Link to="/">Cancel</Link>
            <Button type="submit">Add Feedback</Button>
          </HStack>
        </Box>
      </Form>
    </FormLayout>
  );
}
