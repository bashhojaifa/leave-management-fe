import { Box, Skeleton, Stack } from "@mui/material";

const EmployeeOverViewsSkeleton = () => {
  return (
    <Stack spacing={1} direction="row" alignItems="center">
      {/* For other variants, adjust the size with `width` and `height` */}
      <Box>
        <Skeleton variant="circular" width={40} height={40} />
      </Box>
      <Box>
        <Skeleton variant="text" sx={{ fontSize: "3rem", width: "10rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "5rem" }} />
      </Box>
      <Box>
        <Skeleton variant="text" sx={{ fontSize: "3rem", width: "10rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "5rem" }} />
      </Box>
    </Stack>
  );
};

export default EmployeeOverViewsSkeleton;
