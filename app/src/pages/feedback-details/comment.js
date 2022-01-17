import {
  Box,
  Button,
  Heading,
  Text,
  Avatar,
  useDisclosure,
} from "@chakra-ui/react";
import ReplyForm from "./reply-form";
import { useCurrentUser } from "../../context/currentuser";

let CustomAvatar = (props) => (
  <Avatar
    {...props}
    sx={{
      width: "40px",
      height: "40px",
      fontSize: "15px",

      div: {
        fontSize: "18px",
        lineHeight: 1.2
      },
    }}
  />
);

export function Comment({
  id,
  user,
  body,
  replies = [],
  disallowReply = false,
  feedbackId,
}) {
  let {
    isOpen: showReplyForm,
    onClose: closeReplyForm,
    onToggle: toggleReplyForm,
  } = useDisclosure();

  let [currentUser] = useCurrentUser();

  return (
    <Box>
      <Box display="flex" mb={5}>
        <Box display={["none", "block"]} flexShrink={0} mr={8}>
          <CustomAvatar name={user?.fullname} />
        </Box>
        <Box flex="1">
          <Box
            mb={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <CustomAvatar
                display={["flex", "none"]}
                mr={4}
                name={user?.fullname}
              />
              <div>
                <Heading size="h4" textTransform="capitalize">{user?.fullname}</Heading>
                <Text size="body2">@{user?.username}</Text>
              </div>
            </Box>

            {!disallowReply && currentUser && (
              <Button size="sm" variant="link" onClick={toggleReplyForm}>
                Reply
              </Button>
            )}
          </Box>

          <Text mb={4} wordBreak="break-all">
            {body}
          </Text>

          {showReplyForm && (
            <ReplyForm
              feedbackId={feedbackId}
              commentId={id}
              onClose={closeReplyForm}
            />
          )}
        </Box>
      </Box>

      {/* replies */}
      <Box ml={4} paddingLeft={4}>
        {replies?.map((reply) => (
          // replies are basically comments
          <Comment
            key={reply.id}
            user={reply.user}
            body={reply.reply}
            disallowReply
          />
        ))}
      </Box>
    </Box>
  );
}
