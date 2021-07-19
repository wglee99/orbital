import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../redux/itemRedux";
import { useEffect, useState } from "react";

const MyList = ({ auth }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // const func = async () => {
    // setIsLoading(true);
    // const result = await getCart(userId);
    dispatch(getCart(userId));
    // setIsLoading(false);

    // setIsLoading(false);
    // };
    // func();
  }, []);

  let userId = 0;

  if (user !== null) {
    userId = user._id;
  }

  // console.log(userId);

  const item = useSelector((state) => state.item);

  console.log(item);

  const { cart, loading } = item;

  // if (isLoading && item === undefined) {
  //   return <div>{"loading"}</div>;
  // }
  return (
    <div>
      {loading ? (
        <h3>Loading</h3>
      ) : (
        <div>
          {cart.items.map((item) => {
            return <ul>{item.name}</ul>;
          })}
        </div>
      )}
    </div>
  );
};

export default MyList;
