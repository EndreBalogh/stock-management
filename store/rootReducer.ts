import countReducer from "./features/countSlice";
import inventoryReducer from "./features/inventorySlice";
import financeReducer from "./features/financeSlice";

const rootReducer = {
  counter: countReducer,
  inventory: inventoryReducer,
  finance: financeReducer,
};

export default rootReducer;
