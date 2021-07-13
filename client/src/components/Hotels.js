import HotelWidget from "./HotelWidget";
import Container from "@material-ui/core/Container";


const Hotels = () => {
  return (
    <div>
      <h2 className="hotels">Available Hotels</h2>
      <Container>
      <div><HotelWidget /></div>
      </Container>
    </div>
  );
};

export default Hotels;
