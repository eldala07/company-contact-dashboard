"use client";

import React, { useContext, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { EntityUnion } from "@/types/entity-union";

type GridRefType = React.RefObject<AgGridReact<EntityUnion>>;

const GridRefContext = React.createContext<GridRefType | null>(null);

export const useGridRefContext = (): GridRefType | null =>
  useContext(GridRefContext);

export const GridRefProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const gridRef = useRef<AgGridReact<EntityUnion>>(null);

  return (
    <GridRefContext.Provider value={gridRef}>
      {children}
    </GridRefContext.Provider>
  );
};

export default GridRefContext;
