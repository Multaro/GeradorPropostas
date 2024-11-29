"use client";

import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { List } from '../types/list';

interface GlobalListContext {
  portals: List[];
  addPortal: (portal: List) => void;
  removePortal: (id: string) => void;
}

const GlobalListContext = createContext<GlobalListContext>({
  portals: [],
  addPortal: () => {},
  removePortal: () => {},
});

interface GlobalListProviderProps {
  children: React.ReactNode;
}

const GlobalListProvider: React.FC<GlobalListProviderProps> = ({ children }) => {
  const [portals, setPortals] = useState<List[]>([]);

  useEffect(() => {
    const storedPortals = Cookies.get('portals');
    if (storedPortals) {
      setPortals(JSON.parse(storedPortals));
    }
  }, []);

  const addPortal = (portal: List) => {
    setPortals([...portals, portal]);
    Cookies.set('portals', JSON.stringify([...portals, portal]));
  };

  const removePortal = (id: string) => {
    const filteredPortals = portals.filter(portal => portal.id !== id);
    setPortals(filteredPortals);
    Cookies.set('portals', JSON.stringify(filteredPortals));
  }

  return (
    <GlobalListContext.Provider value={{ portals, addPortal, removePortal }}>
      {children}
    </GlobalListContext.Provider>
  );
};

export { GlobalListProvider, GlobalListContext };
