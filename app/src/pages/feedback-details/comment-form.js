import { Heading, Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import { FormField } from "../../components/form";
import { Card } from "../../components/cards";

const maxCharacter = 255;

export default function CommentForm({ onSubmit }) {
  let [comment, setComment] = useState("");
  return (
    <Card>
      <Heading size="md" mb={4}>Add comment</Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          typeof onSubmit === "function" && onSubmit();
        }}
      >
        <FormField
          type="textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <p>{maxCharacter - comment.length} characters left</p>
          <Button>Post Comment</Button>
        </Box>
      </form>
    </Card>
  );
}
