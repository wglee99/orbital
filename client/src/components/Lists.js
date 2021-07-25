import Container from "@material-ui/core/Container";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { getCart } from "../redux/cartRedux";
import { connect } from "react-redux";
import { css } from "styled-components";
import { contextType } from "react-modal";
import produce from "immer";
import { useCallback, useReducer } from "react";

const dragReducer = produce((draft, action) => {
    switch (action.type) {
      case "MOVE": {
        draft[action.from] = draft[action.from] || [];
        draft[action.to] = draft[action.to] || [];
        const [removed] = draft[action.from].splice(action.fromIndex, 1);
        draft[action.to].splice(action.toIndex, 0, removed);
      }
    }
  });

  const Index = () => {
    const [state, dispatch] = useReducer(dragReducer, {
      items: data,
    });
  
    const onDragEnd = useCallback((result) => {
      if (result.reason === "DROP") {
        if (!result.destination) {
          return;
        }
        dispatch({
          type: "MOVE",
          from: result.source.droppableId,
          to: result.destination.droppableId,
          fromIndex: result.source.index,
          toIndex: result.destination.index,
        });
      }
    }, []);
  
    return (
      <div className={css(tw`flex flex-row h-screen p-4`)}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="cartItems" >
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cx(
                    styles.dropper,
                    snapshot.isDraggingOver && styles.dropOver
                  )}
                >
                  {state.items?.map((cartItems, index) => {
                    return (
                      <Draggable
                        key={item.productId}
                        draggableId={item.productId}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              className={cx(
                                styles.dragger,
                                snapshot.isDragging && styles.dragging
                              )}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className={styles.draggerContent}>
                                <img
                                  src={person.picture}
                                  className={styles.draggerIcon}
                                />
                                <span>
                                  //?
                                </span>
                              </div>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
          <Droppable droppableId="items2">
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cx(
                    styles.dropper,
                    snapshot.isDraggingOver && styles.dropOver
                  )}
                >
                  {state.items2?.map((cartItems, index) => {
                    return (
                      <Draggable
                        key={item.productId}
                        draggableId={item.productId}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              className={cx(
                                styles.dragger,
                                snapshot.isDragging && styles.dragging
                              )}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className={styles.draggerContent}>
                                 <img
                                   src={person.picture}
                                  className={styles.draggerIcon}
                                />
                                <span>
                                  //?
                                </span>
                              </div>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      </div>
    );
  };
  export default Lists;
  //
  const styles = {
    dragger: css(
      tw`px-4 py-4 my-2 transition-colors duration-150 ease-in-out bg-white rounded-lg shadow hover:bg-gray-100`
    ),
    dropper: css(tw`w-auto px-4 min-w-1/4 max-w-1/2`),
    draggerContent: css(tw`flex items-center space-x-3 text-base`),
    draggerIcon: css(
      tw`inline-flex items-center justify-center rounded-full p-1.5 text-white bg-teal-100 text-teal-700`
    ),
    dragging: css(tw`bg-gray-300`),
    dropOver: css(tw`bg-gray-100`),
  };