import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FlightModal from "../components/FlightModal";

const Flights = () => {
  return (
    <div>
      <h2 className="availFlights">Available Flights</h2>

      {/*<div>
        <Widget />
      </div>*/}
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "20vh" }}
      >
        <Box
          border={1}
          height={100}
          width={1000}
          display="flex"
          justifyContent="right"
          pr={5}
          alignItems="center"
          bgcolor="white"
          boxShadow={2}
          mt={10}
          ml={10}
        >
          <Container>Check out the cheapest flights here</Container>
          <FlightModal />
        </Box>
      </Grid>
    </div>
  );
};

export default Flights;
