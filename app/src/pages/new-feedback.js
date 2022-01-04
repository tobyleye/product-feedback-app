import { Box, Button } from "@chakra-ui/react";
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
import { Padded } from "../components/layouts";
import { BackButton } from "../components/buttons";
import { gql, useMutation } from "@apollo/client";
import { fetchFeedbackList } from "../graphql/queries";
import { useHistory } from "react-router-dom";

let createNewFeedback = gql`
  mutation addFeedbackRequest(
    $title: String!
    $detail: String!
    $category: String!
  ) {
    addFeedbackRequest(title: $title, detail: $detail, category: $category) {
      id
    }
  }
`;

let capitalizeFirstLetter = (str) => str? str[0].toUpperCase() + str.slice(1): '';

export default function NewFeedback() {
  const [feedback, setFeedback] = useState({
    title: "",
    category: "",
    detail: "",
  });

  let [newFeedback, { loading }] = useMutation(createNewFeedback);

  let handleChange = (name) => (e) =>
    setFeedback((fb) => ({
      ...fb,
      [name]:
        name === "title"
          ? capitalizeFirstLetter(e.target.value)
          : e.target.value,
    }));

  let history = useHistory();

  let submit = (e) => {
    e.preventDefault();
    newFeedback({
      variables: feedback,
      refetchQueries: [
        {
          query: fetchFeedbackList,
        },
      ],
    }).then(() => {
      history.push("/");
    });
  };

  return (
    <Padded>
      <FormLayout>
        <Box mb={2}>
          <BackButton />
        </Box>
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
            options={["feature", "ui", "ux", "enhancement", "bug"]}
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
            mt={8}
            w="full"
            display="flex"
            flexDir={["column-reverse", "row"]}
            justifyContent={["stretch", "flex-end"]}
          >
            <Button as={Link} variant="gray" to="/">
              Cancel
            </Button>
            <Box w={4} h={4} />
            <Button isLoading={loading} type="submit">
              Add Feedback
            </Button>
          </Box>
        </Form>
      </FormLayout>
    </Padded>
  );
}
