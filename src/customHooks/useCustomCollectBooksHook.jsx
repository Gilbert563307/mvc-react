import { useEffect, useState } from 'react';
import { useBooksControllerV2Context } from '../controller/BooksControllerV2';

const useCustomCollectBooksHook = () => {
  const { bookState, dispatch } = useBooksControllerV2Context();
  const [customState, setCustomState] = useState({});

  function isPromise(p) {
    return p && Object.prototype.toString.call(p) === "[object Promise]";
  }

  useEffect(() => {
    dispatch({ type: "LISTBOOKS" });
  }, []);

  useEffect(() => {
    //setting state back to original after awaiting it;
    if (isPromise(bookState)) {
      Promise.resolve(bookState).then((stateObject) => {
        setCustomState(stateObject);
      });
    }

  }, [bookState]);

  return { customState, dispatch };
};

export default useCustomCollectBooksHook;
