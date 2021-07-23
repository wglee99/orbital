import { useDispatch, useSelector } from "react-redux";
import { getCart, deleteFromCart } from "../redux/itemRedux";
import { useEffect } from "react";
import { Button } from "@material-ui/core";

const MyList = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  // const userId = user._id;

  useEffect(() => {
    if (!isLoading) {
      let userId = 0;
      if (user !== null) {
        userId = user._id;
        localStorage.setItem(userId, "storedId");
      }
      console.log(userId);
      dispatch(getCart(userId));
    }
  }, [isLoading, dispatch, user]);

  const item = useSelector((state) => state.item);

  console.log(item);

  const { items, loading } = item;

  return (
    <div>
      {loading ? (
        <h3>Loading</h3>
      ) : (
        <div>
          {items?.items?.map((item) => {
            return (
              <ul>
                {item.name}
                <Button
                  color="secondary"
                  onClick={() =>
                    dispatch(deleteFromCart(user._id, item.productId))
                  }
                >
                  Remove
                </Button>
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyList;
