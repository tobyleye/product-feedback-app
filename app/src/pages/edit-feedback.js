import { Box, Button } from "@chakra-ui/react";
import {
  Form,
  FormLayout,
  FormField,
  FormIcon,
  FormTitle,
} from "../components/form";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { fetchFeedback, fetchFeedbackList } from "../graphql/queries";
import { Padded } from "../components/layouts";
import { BackButton } from "../components/buttons";
import { gql } from "@apollo/client";
import { useHistory, Redirect, useParams, Link } from "react-router-dom";
import { useCurrentUser } from "../context/currentuser";

let editFeedbackMutation = gql`
  mutation updateFeedbackRequest(
    $id: String!
    $title: String
    $detail: String
    $category: String
  ) {
    updateFeedbackRequest(
      id: $id
      title: $title
      detail: $detail
      category: $category
    ) {
      id
    }
  }
`;

let deleteFeedbackMutation = gql`
  mutation deleteFeedbackRequest($id: String!) {
    deleteFeedbackRequest(id: $id) {
      id
    }
  }
`;

let EditForm = ({ feedback: _feedback = {} }) => {
  const [feedback, setFeedback] = useState({
    title: _feedback.title,
    category: _feedback.category,
    detail: _feedback.detail,
  });

  let { id } = useParams();
  let [editFeedback, { loading: saving }] = useMutation(editFeedbackMutation);
  let [deleteFeedback, { loading: deleting }] = useMutation(
    deleteFeedbackMutation
  );

  let history = useHistory();

  let handleChange = (name) => (e) =>
    setFeedback((fb) => ({
      ...fb,
      [name]: e.target.value,
    }));

  let submit = (e) => {
    e.preventDefault();
    editFeedback({
      variables: {
        id,
        ...feedback,
      },
      refetchQueries: [
        {
          query: fetchFeedback,
          variables: {
            id,
          },
        },
      ],
    }).then(() => {
      history.push(`/feedback/${id}`);
    });
  };

  let handleDelete = () => {
    let confirm = window.confirm("are you sure?");
    if (!confirm) return;

    deleteFeedback({
      variables: {
        id,
      },
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
            w="full"
            mt={8}
            display="flex"
            flexDir={["column-reverse", "row"]}
            alignItems={["stretch", "center"]}
          >
            <Button
              isLoading={deleting}
              onClick={handleDelete}
              type="button"
              variant="red"
            >
              Delete
            </Button>
            <Box w={4} h={4} />

            <Box
              ml={[null, "auto"]}
              display="flex"
              flexDir={["column-reverse", "row"]}
              spacing={4}
            >
              <Button as={Link} variant="gray" to="/">
                Cancel
              </Button>
              <Box w={4} h={4} />

              <Button isLoading={saving} type="submit">
                Save Changes
              </Button>
            </Box>
          </Box>
        </Form>
      </FormLayout>
    </Padded>
  );
};

export default function EditFeedback() {
  let currentUser = useCurrentUser()
  let { id } = useParams();
  const { data } = useQuery(fetchFeedback, {
    variables: {
      id,
    },
  });

  let feedback = data?.feedbackRequest;

  if (feedback) {
    if (feedback.user.id === currentUser.id) {
      return <EditForm feedback={feedback} />;
    } else {
      return <Redirect to="/" />;
    }
  }
  return null;
}
