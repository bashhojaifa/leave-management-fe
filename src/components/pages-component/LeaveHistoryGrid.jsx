import { Box, Grid, Paper, Stack, Typography, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme, customColor }) => {
  return {
    backgroundColor: theme.palette[customColor].main,
    color: theme.palette.primary.contrastText,
  };
});

function LeaveHistoryCard(props) {
  return (
    <Grid item xs={10} sm={6} md={3}>
      <Paper>
        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 2, md: 4 }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box padding={2} width="100%">
            <Typography variant="h4" textAlign="center">
              {props.count}
            </Typography>
            <Typography variant="body1" component="div" textAlign="center">
              {props.description}
            </Typography>
          </Box>
          <StyledBox padding={2} customColor={props.customColor}>
            {props.icon}
          </StyledBox>
        </Stack>
      </Paper>
    </Grid>
  );
}

export default LeaveHistoryCard;
