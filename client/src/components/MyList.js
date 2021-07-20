import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../redux/itemRedux";
import { useEffect } from "react";

const MyList = ({ auth }) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoading) {
      let userId = 0;
      if (user !== null) {
        userId = user._id;
        localStorage.setItem(userId, 'storedId');
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
            return <ul>{item.name}</ul>;
          })}
        </div>
      )}
    </div>
  );
};

export default MyList;
