import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Heading = ({title}) => {
  return (
    <Box paddingTop={4}>
      <Typography variant="h2" textAlign={"center"} gutterBottom>
        {title}
      </Typography>
    </Box>
  );
};
export default Heading