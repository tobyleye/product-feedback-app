import { Box, Button, HStack } from "@chakra-ui/react";
import {
  Form,
  FormLayout,
  FormField,
  FormIcon,
  FormTitle,
} from "../components/form";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { fetchFeedback } from "../graphql/queries";
import { useParams } from "react-router-dom";

let EditForm = ({ feedback: _feedback = {} }) => {
  const [feedback, setFeedback] = useState({
    title: _feedback.title,
    category: _feedback.category,
    detail: _feedback.detail,
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
        <FormTitle>Editing ‘{_feedback.title}’</FormTitle>
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
          justifyContent="space-between"
          alignItems="center"
        >
          <Button type="button" colorScheme="red">
            Delete
          </Button>

          <HStack spacing={4}>
            <Link to={`/feedback/${_feedback.id}`}>Cancel</Link>
            <Button type="submit">Save Changes</Button>
          </HStack>
        </Box>
      </Form>
    </FormLayout>
  );
};

export default function EditFeedback() {
  let { id } = useParams();
  const { data } = useQuery(fetchFeedback, {
    variables: {
      id,
    },
  });

  let feedback = data?.feedbackRequest;

  return <Box>{feedback && <EditForm feedback={feedback} />}</Box>;
}
