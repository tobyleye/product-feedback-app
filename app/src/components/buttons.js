import { FaChevronLeft } from "react-icons/fa";
import { Box } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

export function BackButton() {
  let history = useHistory();

  return (
    <button onClick={() => history.goBack()}>
      <Box display="inline-flex" alignItems="center">
        <Box mr={2}>
          <FaChevronLeft />
        </Box>
        <span>Go back</span>
      </Box>
    </button>
 
  );
}
