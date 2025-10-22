import { Outlet } from "react-router-dom";
import { Box } from "@mantine/core";

const BaseLayout = () => {
  return (
    <Box bg="gray.2">
      <Outlet />
    </Box>
  );
};

export default BaseLayout;
