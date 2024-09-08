"use client";

import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useGetEntities } from "@/app/(dashboard)/handlers/hooks/queries/getEntities";
import {
  GridOptions,
  ICellRendererParams,
  ProcessDataFromClipboardParams,
  RowSelectedEvent,
  GetRowIdParams,
  ProcessCellForExportParams,
} from "ag-grid-community";
import { useUpdateEntityNameMutation } from "@/app/(dashboard)/handlers/hooks/mutations/updateEntityName";
import { toast } from "sonner";
import { NameCellRenderer } from "@/app/(dashboard)/components/components/NameCellRenderer";
import { EntityUnion } from "@/types/entity-union";
import { EntityType } from "@/app/generated/graphql";
import { NameCellEditor } from "@/app/(dashboard)/components/components/NameCellEditor";

import "ag-grid-enterprise";

export const CompaniesAndContactsGrid = memo(() => {
  const gridRef = useRef(null);

  const [checked, setChecked] = useState<string[] | undefined>([]);

  const { data: dataEntities, loading: loadingEntities } = useGetEntities();
  const entities = dataEntities?.getEntities || [];

  const listOfEntities: GridOptions["rowData"] = useMemo(() => {
    if (!loadingEntities) return JSON.parse(JSON.stringify(entities));
    return [];
  }, [entities.length, loadingEntities]);

  const [updateEntityName] = useUpdateEntityNameMutation();

  const onRowDragEnd = useCallback(() => {}, []);
  const getRowId = useCallback(
    (params: GetRowIdParams<EntityUnion>) => params.data.id,
    [],
  );

  const columns: GridOptions<EntityUnion>["columnDefs"] = useMemo(
    () => [
      {
        headerName: "Identifier",
        headerGroupComponent: () => (
          <div className="overflow-hidden text-ellipsis">Identifier</div>
        ),
        headerCheckboxSelection: true,
        suppressMovable: true,
        children: [
          {
            headerName: "Selection",
            headerComponent: () => "",
            maxWidth: 50,
            field: "id",
            valueGetter: "node.id",
            headerCheckboxSelection: true,
            checkboxSelection: true,
            pinned: true,
            lockPosition: "left",
            lockVisible: true,
            sortable: false,
            unSortIcon: false,
            filter: false,
            cellRenderer: () => "",
          },
          {
            headerName: "Name",
            field: "name",
            cellDataType: "text",
            enableCellChangeFlash: true,
            pinned: true,
            lockPosition: "left",
            lockVisible: true,
            filter: false,
            minWidth: 100,
            comparator: (valueA: string, valueB: string) => {
              const iValueA = (valueA || "").toLowerCase();
              const iValueB = (valueB || "").toLowerCase();
              if (iValueA === iValueB) return 0;
              return iValueA < iValueB ? -1 : 1;
            },
            getQuickFilterText: (params) =>
              params?.data?.name?.trim()?.toLowerCase(),
            editable: true,
            // cellStyle
            valueGetter: (params) => params?.data?.name,
            valueSetter: (params) => {
              params.data.name = params.newValue;
              return true;
            },
            onCellValueChanged: async (params) => {
              if (params.oldValue === params.newValue) return;

              const { errors } = await updateEntityName({
                variables: {
                  input: {
                    id: params.data.id,
                    name: params.newValue,
                    entityType: params.data.__typename as EntityType,
                  },
                },
                optimisticResponse: {
                  __typename: "Mutation",
                  updateEntity: {
                    __typename: params.data.__typename,
                    id: params.data.id,
                    name: params.newValue,
                  },
                },
              });

              if (errors?.length) {
                params.data.name = params.oldValue;
                params.node?.setDataValue(params.column, params.oldValue);
                toast.error("Something went wrong updating entity name");
              }
            },
            cellRenderer: (
              params: ICellRendererParams<EntityUnion, string>,
            ) => <NameCellRenderer value={params.value} />,
            cellEditor: (params: any) => (
              <NameCellEditor
                value={params.value}
                onValueChange={params.onValueChange}
                id={params.data.id}
                __typename={params.data.__typename}
              />
            ),
          },
        ],
      },
    ],
    [listOfEntities?.length],
  );

  const processDataFromClipboard = useCallback(
    (params: ProcessDataFromClipboardParams<EntityUnion>) => {
      console.log(params);
      return null;
    },
    [],
  );

  const processCellForClipboard = useCallback(
    (params: ProcessCellForExportParams<EntityUnion>) => params.value,
    [],
  );

  const statusBar = useMemo(() => {
    return {
      statusPanels: [
        {
          key: "aUniqueString",
          statusPanel: "agTotalRowCountComponent",
          align: "left",
        },
        {
          statusPanel: "agAggregationComponent",
          statusPanelParams: {
            aggFuncs: ["avg", "sum"],
          },
        },
      ],
    };
  }, []);

  const getContextMenuItems = useCallback(() => {
    return ["copy", "copyWithHeaders", "copyWithGroupHeaders", "export"];
  }, [window]);

  const onRowSelected = useCallback(
    (params: RowSelectedEvent<EntityUnion>) => {
      const selected = params.node.isSelected();
      setChecked((prev) => {
        if (selected) {
          if (params.node.data?.id)
            return [...(prev || []), params.node.data.id];
          return prev;
        } else {
          return (prev || []).filter((id) => id !== params.node.data?.id);
        }
      });
    },
    [setChecked],
  );

  const defaultColDef = useMemo(() => {
    return {
      enableValue: false,
      enableRowGroup: false,
      enablePivot: false,
      sortable: true,
      unSortIcon: true,
      suppressMovable: true,
      filter: true,
      initialHide: false,
      getQuickFilterText: () => "",
    };
  }, []);

  const sideBar = useMemo(() => {
    return {
      toolPanels: [
        {
          id: "columns",
          labelDefault: "Columns",
          labelKey: "columns",
          iconKey: "columns",
          toolPanel: "agColumnsToolPanel",
          minWidth: 225,
          maxWidth: 500,
          width: 300,
          toolPanelParams: {
            suppressPivotMode: true,
            suppressValues: true,
            suppressColumnMove: true,
            suppressRowGroups: true,
          },
        },
        // {
        //     id: "filters",
        //     labelDefault: "Filters",
        //     labelKey: "filters",
        //     iconKey: "filter",
        //     toolPanel: "agFiltersToolPanel",
        //     minWidth: 225,
        //     maxWidth: 550,
        //     width: 300,
        // },
      ],
      position: "right" as const,
      defaultToolPanel: undefined,
    };
  }, []);

  console.log(
    "File: CompaniesAndContactsGrid.tsx Line 238 listOfEntities: ",
    listOfEntities,
  );

  return (
    <div className="h-full flex-1 w-full ag-theme-quartz">
      <AgGridReact
        ref={gridRef}
        columnDefs={columns}
        rowData={listOfEntities}
        rowSelection="multiple"
        rowMultiSelectWithClick={false}
        suppressRowClickSelection={true}
        onRowSelected={onRowSelected}
        undoRedoCellEditing={true}
        rowDragManaged={true}
        onRowDragEnd={onRowDragEnd}
        getRowId={getRowId}
        className="flex-1 w-full h-full"
        domLayout="normal"
        stopEditingWhenCellsLoseFocus={true}
        enableRangeSelection={true}
        suppressCutToClipboard={true}
        processDataFromClipboard={processDataFromClipboard}
        processCellForClipboard={processCellForClipboard}
        enableFillHandle={true}
        fillHandleDirection="y"
        statusBar={statusBar}
        getContextMenuItems={getContextMenuItems}
        defaultColDef={defaultColDef}
        sideBar={sideBar}
        groupDisplayType="groupRows"
        groupRowRenderer="agGroupCellRenderer"
      />
    </div>
  );
});
