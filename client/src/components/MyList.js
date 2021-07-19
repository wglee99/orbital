import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../redux/itemRedux";
import { useEffect } from "react";

const MyList = ({ auth }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  useEffect(async () => {
   await dispatch(getCart(userId));
  }, []);

  let userId = 0;

  if (user !== null) {
    userId = user._id;
  }

  console.log(userId);

  const item = useSelector((state) => state.item);

  console.log(item);

  const { items } = item;

  console.log(items);

  return (
    <div>
    {/* {items.map((item) => {
              return (
                <ul>
                  {item.name}
                  </ul>
              )})} */}
    </div>
  );
};

export default MyList;
