"use client";

import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useGetEntities } from "@/app/(dashboard)/handlers/hooks/queries/getEntities";
import {
  GetRowIdParams,
  GridOptions,
  ICellRendererParams,
  ProcessCellForExportParams,
  ProcessDataFromClipboardParams,
  RowSelectedEvent,
  CellClassParams,
  EditableCallbackParams,
  EditableCallback,
} from "ag-grid-community";
import { useUpdateEntityNameMutation } from "@/app/(dashboard)/handlers/hooks/mutations/updateEntityName";
import { toast } from "sonner";
import { NameCellRenderer } from "@/app/(dashboard)/components/components/NameCellRenderer";
import { EntityUnion } from "@/types/entity-union";
import { Company, Contact, EntityType } from "@/app/generated/graphql";
import { NameCellEditor } from "@/app/(dashboard)/components/components/NameCellEditor";

import "ag-grid-enterprise";
import { EmailCellRenderer } from "@/app/(dashboard)/components/components/EmailCellRenderer";
import { EmailCellEditor } from "@/app/(dashboard)/components/components/EmailCellEditor";
import { isContact } from "@/app/(dashboard)/handlers/services/isContact/isContact";
import { useUpdateContactEmailMutation } from "@/app/(dashboard)/handlers/hooks/mutations/updateContactEmail";
import { useUpdateContactPhoneMutation } from "@/app/(dashboard)/handlers/hooks/mutations/updateContactPhone";
import { useUpdateCompanyContactEmailMutation } from "@/app/(dashboard)/handlers/hooks/mutations/updateCompanyContactEmail";
import { useUpdateCompanyIndustryMutation } from "@/app/(dashboard)/handlers/hooks/mutations/updateCompanyIndustry";
import { PhoneCellRenderer } from "@/app/(dashboard)/components/components/PhoneCellRenderer";
import { PhoneCellEditor } from "@/app/(dashboard)/components/components/PhoneCellEditor";
import { isCompany } from "@/app/(dashboard)/handlers/services/isCompany/isCompany";
import { IndustryCellRenderer } from "@/app/(dashboard)/components/components/IndustryCellRenderer";
import { IndustryCellEditor } from "@/app/(dashboard)/components/components/IndustryCellEditor";
import { ContactEmailCellRenderer } from "@/app/(dashboard)/components/components/ContactEmailCellRenderer";
import { ContactEmailCellEditor } from "@/app/(dashboard)/components/components/ContactEmailCellEditor";
import { Building2Icon, UserRoundIcon } from "lucide-react";

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
  const [updateContactEmail] = useUpdateContactEmailMutation();
  const [updateContactPhone] = useUpdateContactPhoneMutation();
  const [updateCompanyContactEmail] = useUpdateCompanyContactEmailMutation();
  const [updateCompanyIndustry] = useUpdateCompanyIndustryMutation();

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
            headerName: "Category",
            field: "__typename",
            cellDataType: "text",
            pinned: true,
            lockPosition: "left",
            lockVisible: true,
            filter: false,
            width: 50,
            minWidth: 50,
            editable: false,
            valueGetter: (params) =>
              isCompany(params.data) ? "Company" : "Contact",
            valueFormatter: (params) =>
              isCompany(params.data) ? "Company" : "Contact",
            cellRenderer: (
              params: ICellRendererParams<EntityUnion, string>,
            ) => (
              <div className="h-full flex items-center">
                {isCompany(params.data) ? (
                  <Building2Icon width={18} />
                ) : (
                  <UserRoundIcon width={18} />
                )}
              </div>
            ),
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
            minWidth: 200,
            comparator: (valueA: string, valueB: string) => {
              const iValueA = (valueA || "").toLowerCase();
              const iValueB = (valueB || "").toLowerCase();
              if (iValueA === iValueB) return 0;
              return iValueA < iValueB ? -1 : 1;
            },
            getQuickFilterText: (params) =>
              params?.data?.name?.trim()?.toLowerCase(),
            editable: true,
            cellStyle: (params: CellClassParams<EntityUnion>) => {
              if (params.colDef.editable) {
                return {
                  backgroundColor: "#007bff1A", // small opacity and beautiful blue: #007bff
                };
              }
              return {};
            },
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
          {
            headerName: "Email",
            field: "email",
            cellDataType: "text",
            enableCellChangeFlash: true,
            filter: false,
            minWidth: 100,
            comparator: (valueA: string, valueB: string) => {
              const iValueA = (valueA || "").toLowerCase();
              const iValueB = (valueB || "").toLowerCase();
              if (iValueA === iValueB) return 0;
              return iValueA < iValueB ? -1 : 1;
            },
            editable: (params: EditableCallbackParams<Contact>) =>
              isContact(params.data),
            cellStyle: (params: CellClassParams<Contact>) => {
              if (
                (params.colDef.editable as EditableCallback<Contact>)(params)
              ) {
                return {
                  backgroundColor: "#007bff1A", // small opacity and beautiful blue: #007bff
                };
              }
              return {};
            },
            valueGetter: (params) => {
              if (isContact(params.data)) {
                return params.data.email;
              }
              return "";
            },
            valueSetter: (params) => {
              if (isContact(params.data)) {
                params.data.email = params.newValue;
              }
              return true;
            },
            onCellValueChanged: async (params) => {
              if (
                params.oldValue === params.newValue ||
                !isContact(params.data)
              )
                return;

              const { errors } = await updateContactEmail({
                variables: {
                  input: {
                    id: params.data.id,
                    email: params.newValue,
                    entityType: params.data.__typename as EntityType,
                  },
                },
                optimisticResponse: {
                  __typename: "Mutation",
                  updateEntity: {
                    __typename: params.data.__typename,
                    id: params.data.id,
                    email: params.newValue,
                  },
                },
              });

              if (errors?.length) {
                params.data.email = params.oldValue;
                params.node?.setDataValue(params.column, params.oldValue);
                toast.error("Something went wrong updating contact email");
              }
            },
            cellRenderer: (params: ICellRendererParams<Contact, string>) => (
              <EmailCellRenderer value={params.value} />
            ),
            cellEditor: (params: any) => (
              <EmailCellEditor
                value={params.value}
                onValueChange={params.onValueChange}
                id={params.data.id}
                __typename={params.data.__typename}
              />
            ),
          },
          {
            headerName: "Phone",
            field: "phone",
            cellDataType: "number",
            enableCellChangeFlash: true,
            filter: false,
            minWidth: 100,
            editable: (params: EditableCallbackParams<Contact>) =>
              isContact(params.data),
            cellStyle: (params: CellClassParams<Contact>) => {
              if (
                (params.colDef.editable as EditableCallback<Contact>)(params)
              ) {
                return {
                  backgroundColor: "#007bff1A", // small opacity and beautiful blue: #007bff
                };
              }
              return {};
            },
            valueGetter: (params) => {
              if (isContact(params.data)) {
                return params.data.phone;
              }
              return "";
            },
            valueSetter: (params) => {
              if (isContact(params.data)) {
                params.data.phone = params.newValue;
              }
              return true;
            },
            onCellValueChanged: async (params) => {
              if (
                params.oldValue === params.newValue ||
                !isContact(params.data)
              )
                return;

              const { errors } = await updateContactPhone({
                variables: {
                  input: {
                    id: params.data.id,
                    phone: params.newValue,
                    entityType: params.data.__typename as EntityType,
                  },
                },
                optimisticResponse: {
                  __typename: "Mutation",
                  updateEntity: {
                    __typename: params.data.__typename,
                    id: params.data.id,
                    phone: params.newValue,
                  },
                },
              });

              if (errors?.length) {
                params.data.phone = params.oldValue;
                params.node?.setDataValue(params.column, params.oldValue);
                toast.error("Something went wrong updating contact phone");
              }
            },
            cellRenderer: (params: ICellRendererParams<Contact, string>) => (
              <PhoneCellRenderer value={params.value} />
            ),
            cellEditor: (params: any) => (
              <PhoneCellEditor
                value={params.value}
                onValueChange={params.onValueChange}
                id={params.data.id}
                __typename={params.data.__typename}
              />
            ),
          },
          {
            headerName: "Industry",
            field: "industry",
            cellDataType: "text",
            enableCellChangeFlash: true,
            filter: false,
            minWidth: 150,
            editable: (params: EditableCallbackParams<Company>) =>
              isCompany(params.data),
            cellStyle: (params: CellClassParams<Company>) => {
              if (
                (params.colDef.editable as EditableCallback<Company>)(params)
              ) {
                return {
                  backgroundColor: "#007bff1A", // small opacity and beautiful blue: #007bff
                };
              }
              return {};
            },
            valueGetter: (params) => {
              if (isCompany(params.data)) {
                return params.data.industry;
              }
              return "";
            },
            valueSetter: (params) => {
              if (isCompany(params.data)) {
                params.data.industry = params.newValue;
              }
              return true;
            },
            onCellValueChanged: async (params) => {
              if (
                params.oldValue === params.newValue ||
                !isCompany(params.data)
              )
                return;

              const { errors } = await updateCompanyIndustry({
                variables: {
                  input: {
                    id: params.data.id,
                    industry: params.newValue,
                    entityType: params.data.__typename as EntityType,
                  },
                },
                optimisticResponse: {
                  __typename: "Mutation",
                  updateEntity: {
                    __typename: params.data.__typename,
                    id: params.data.id,
                    industry: params.newValue,
                  },
                },
              });

              if (errors?.length) {
                params.data.industry = params.oldValue;
                params.node?.setDataValue(params.column, params.oldValue);
                toast.error("Something went wrong updating company industry");
              }
            },
            cellRenderer: (params: ICellRendererParams<Company, string>) => (
              <IndustryCellRenderer value={params.value} />
            ),
            cellEditor: (params: any) => (
              <IndustryCellEditor
                value={params.value}
                onValueChange={params.onValueChange}
                id={params.data.id}
                __typename={params.data.__typename}
              />
            ),
          },
          {
            headerName: "Contact Email",
            field: "contactEmail",
            cellDataType: "text",
            enableCellChangeFlash: true,
            filter: false,
            minWidth: 150,
            editable: (params: EditableCallbackParams<Company>) =>
              isCompany(params.data),
            cellStyle: (params: CellClassParams<Company>) => {
              if (
                (params.colDef.editable as EditableCallback<Company>)(params)
              ) {
                return {
                  backgroundColor: "#007bff1A", // small opacity and beautiful blue: #007bff
                };
              }
              return {};
            },
            valueGetter: (params) => {
              if (isCompany(params.data)) {
                return params.data.contactEmail;
              }
              return "";
            },
            valueSetter: (params) => {
              if (isCompany(params.data)) {
                params.data.contactEmail = params.newValue;
              }
              return true;
            },
            onCellValueChanged: async (params) => {
              if (
                params.oldValue === params.newValue ||
                !isCompany(params.data)
              )
                return;

              const { errors } = await updateCompanyContactEmail({
                variables: {
                  input: {
                    id: params.data.id,
                    contactEmail: params.newValue,
                    entityType: params.data.__typename as EntityType,
                  },
                },
                optimisticResponse: {
                  __typename: "Mutation",
                  updateEntity: {
                    __typename: params.data.__typename,
                    id: params.data.id,
                    contactEmail: params.newValue,
                  },
                },
              });

              if (errors?.length) {
                params.data.contactEmail = params.oldValue;
                params.node?.setDataValue(params.column, params.oldValue);
                toast.error(
                  "Something went wrong updating company contact email",
                );
              }
            },
            cellRenderer: (params: ICellRendererParams<Company, string>) => (
              <ContactEmailCellRenderer value={params.value} />
            ),
            cellEditor: (params: any) => (
              <ContactEmailCellEditor
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
    [],
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
