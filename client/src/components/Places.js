import axios from "axios";
import { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/redux";
import { connect } from 'react-redux';
import { addCartToDB } from "../redux/cartRedux";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const clientID = 'ZQAGA4ZUCP0NJVMTYE20YXYL4UAHLVQKUDBHBK1WFRQLQSZA';
const clientSecret = 'KQPU2Q3YWTVZFCJY3JFV2D5N1SCQJSXWFFQSKTX2GGURC0JI';
const api_v = '20190425';

 const url =
 `https://api.foursquare.com/v2/venues/explore?client_id=${clientID}&client_secret=${clientSecret}&v=${api_v}&near=bali&query=tourist&limit=70&offset=5`;
console.log(url);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

//const url =
  //"https://api.foursquare.com/v2/venues/explore?client_id=ZQAGA4ZUCP0NJVMTYE20YXYL4UAHLVQKUDBHBK1WFRQLQSZA&client_secret=KQPU2Q3YWTVZFCJY3JFV2D5N1SCQJSXWFFQSKTX2GGURC0JI&v=20190425&near=bali&query=tourist&limit=70&offset=5";

 function Places({ auth, addCartToDB } ) {
  const classes = useStyles();

  const [reco, setReco] = useState([]);
  const getReco = async () => {
    const res = await axios.get(url);
    setReco(res.data.response.groups[0].items);
  };

  useEffect(() => {
    getReco();
  }, []);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleSave = () => {
addCartToDB(auth.user._id, cartItems)
  }

  return (
    <div style={{ display: "flex" }}>
      <TableContainer component={Paper} style={{ width: 1500 }}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ width: 500 }}>
                Recommended places
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reco.map((item) => {
              return (
                <StyledTableRow key={item.venue.id}>
                  <StyledTableCell component="th" scope="row">
                    {item.venue.name}
                  </StyledTableCell>
                  <StyledTableCell align="right" style={{ width: 100 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        dispatch(addToCart(item.venue.id, item.venue.name))
                      }
                    >
                      Add to List
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Container style={{ width: 1000 }}>
        <h3>My List</h3>
        {cartItems.map((item) => {
          return (
            <ul>
              {item.name}
              <Button
                color="secondary"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </Button>
            </ul>
          );
        })}
        
          {auth.isAuthenticated ? (
        <Button variant="contained" color="secondary" onClick={handleSave}>
          SAVE
        </Button>
          ) : (
            <h4> Please log in to save items</h4>
          )}
        
      </Container>
    </div>
  );
}

function mapStateToProps(state) {
  return { auth: state.auth, 
    cartItems: state.cartItems };
}

export default connect(mapStateToProps, {addCartToDB})(Places);
