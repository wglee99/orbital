import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { getCart } from "../redux/itemRedux";

const Itinerary = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatcher = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatcher(getCart(user._id));
    }
  }, [dispatcher, user, isAuthenticated]);

  const item = useSelector((state) => state.item);


  const { items } = item;


  const [listItems, setListItems] = useState(items?.items);
  // const [selected, setSelected] = useState([]);

  // a little function to help us with reordering the result
  // const reorder = (list, startIndex, endIndex) => {
  //   const result = Array.from(list);
  //   const [removed] = result.splice(startIndex, 1);
  //   result.splice(endIndex, 0, removed);

  //   return result;
  // };

  /**
   * Moves an item from one list to another list.
   */
  // const move = (source, destination, droppableSource, droppableDestination) => {
  //   const sourceClone = Array.from(source);
  //   const destClone = Array.from(destination);
  //   const [removed] = sourceClone.splice(droppableSource.index, 1);

  //   destClone.splice(droppableDestination.index, 0, removed);

  //   const result = {};
  //   result[droppableSource.droppableId] = sourceClone;
  //   result[droppableDestination.droppableId] = destClone;

  //   return result;
  // };

  // const grid = 8;

  // const getItemStyle = (isDragging, draggableStyle) => ({
  //   // some basic styles to make the items look a bit nicer
  //   userSelect: "none",
  //   padding: grid * 2,
  //   margin: `0 0 ${grid}px 0`,

  //   // change background colour if dragging
  //   background: isDragging ? "lightgreen" : "white",

  //   // styles we need to apply on draggables
  //   ...draggableStyle,
  // });

  // const getListStyle = (isDraggingOver) => ({
  //   background: isDraggingOver ? "lightblue" : "lightgrey",
  //   padding: grid,
  //   width: 250,
  // });

  // const id2List = {
  //   droppable: listItems,
  //   droppable2: selected,
  // };

  // const getList = (id) => id2List[id];

  // const onDragEnd = (result) => {
  //   const { source, destination } = result;

  //   // dropped outside the list
  //   if (!destination) {
  //     return;
  //   }

  //   if (source.droppableId === destination.droppableId) {
  //     const items = reorder(
  //       getList(source.droppableId),
  //       source.index,
  //       destination.index
  //     );

  //     if (source.droppableId === id2List.droppable2) {
  //       setSelected(items);
  //     } else {
  //       const result = move(
  //         getList(source.droppableId),
  //         getList(destination.droppableId),
  //         source,
  //         destination
  //       );

  //       setListItems(result.droppable);
  //       setSelected(result.droppable2);
        
        // this.setState({
        //     items: result.droppable,
        //     selected: result.droppable2
    //   }
    // }

// console.log(selected);
// console.log(listItems);

  // };

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
                      key={item.productId}
                      draggableId={item.productId}
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

    // <DragDropContext onDragEnd={onDragEnd}>
    //   <Droppable droppableId="droppable">
    //     {(provided, snapshot) => (
    //       <div
    //         ref={provided.innerRef}
    //         style={getListStyle(snapshot.isDraggingOver)}
    //       >
    //         {listItems.map((item, index) => (
    //           <Draggable key={item.productId} draggableId={item.productId} index={index}>
    //             {(provided, snapshot) => (
    //               <div
    //                 ref={provided.innerRef}
    //                 {...provided.draggableProps}
    //                 {...provided.dragHandleProps}
    //                 style={getItemStyle(
    //                   snapshot.isDragging,
    //                   provided.draggableProps.style
    //                 )}
    //               >
    //                 {item.name}
    //               </div>
    //             )}
    //           </Draggable>
    //         ))}
    //         {provided.placeholder}
    //       </div>
    //     )}
    //   </Droppable>
    //   <Droppable droppableId="droppable2">
    //     {(provided, snapshot) => (
    //       <ul
    //         ref={provided.innerRef}
    //         style={getListStyle(snapshot.isDraggingOver)}
    //       >
    //         {selected.map((item, index) => (
    //           <Draggable key={item.productId} draggableId={item.productId} index={index}>
    //             {(provided, snapshot) => (
    //               <ul
    //                 ref={provided.innerRef}
    //                 {...provided.draggableProps}
    //                 {...provided.dragHandleProps}
    //                 style={getItemStyle(
    //                   snapshot.isDragging,
    //                   provided.draggableProps.style
    //                 )}
    //               >
    //                 {item.name}
    //               </ul>
    //             )}
    //           </Draggable>
    //         ))}
    //         {provided.placeholder}
    //       </ul>
    //     )}
    //   </Droppable>
    // </DragDropContext>
  ) : (
    <h1 style={{ textAlign: "center" }}>
      <strong>You are not logged in!</strong>
    </h1>
  );
};

export default Itinerary;
