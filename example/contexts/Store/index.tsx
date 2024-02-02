import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';
import type { IStore } from './type';

let Store = createContext<null | IStore>(null);
export let useStore = () => {
  let d = useContext(Store);
  if (d === null)
    throw new Error('Wrap App component inside of StoreProvider component.');
  return d;
};
export default function StoreProvider({ children }: PropsWithChildren) {
  let [state, setState] = useState({});
  let update = useCallback(
    (newState: object = {}) => setState((ps) => ({ ...ps, ...newState })),
    []
  );
  return <Store.Provider {...{ value: { state, update }, children }} />;
}
