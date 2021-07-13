import Container from "@material-ui/core/Container";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { getCart } from "../redux/cartRedux";
import { connect } from "react-redux";

// const Itinerary = ( {auth, getCart} ) => {
//   useEffect(() => {
//     getCart(auth.user.userId)
//   })
function Itinerary({ auth, getCart }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [listItems, setListItems] = useState(cartItems);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(listItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setListItems(items);
  }

  return auth.isAuthenticated ? (
    <div style={{ display: "flex" }}>
      <Container border="1px" border-radius="2px">
        <h3>My List</h3>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="cartItems">
            {(provided) => (
              <ul ref={provided.innerRef} {...provided.droppableProps}>
                {listItems.map((item, index) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <ul
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <p>{item.name}</p>
                        </ul>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </Container>

      <Container>
        <h3>Itinerary</h3>
      </Container>
    </div>
  ) : (
    <h1 style={{ textAlign: "center" }}>
      <strong>You are not logged in!</strong>
    </h1>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cartItems,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCart })(Itinerary);
