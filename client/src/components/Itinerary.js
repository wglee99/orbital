import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { getCart } from "../redux/itemRedux";

const Itinerary = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCart(user._id));
    }
  }, [dispatch, user, isAuthenticated]);

  const item = useSelector((state) => state.item);

  console.log(item);

  const { items } = item;

  console.log(items);

  const [listItems, setListItems] = useState(items?.items);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(listItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setListItems(items);
  }

  return isAuthenticated ? (
    <div style={{ display: "flex" }}>
      <Container border="1px" border-radius="2px">
        <h3>My List</h3>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="listItems">
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
};

export default Itinerary;
