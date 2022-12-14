import { useMemo, useState } from "react";
import { BsCloudCheck, BsCloudSlash, BsArrowBarUp } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import ReactTooltip from "react-tooltip";

import Table from "components/Tables";
import style from "./index.module.scss";
import { useDevices, useDeleteDevice } from "hooks/api";
import { ConfirmBox } from "components/ToolBox";
export default function Devices() {
  const [select, setSelect] = useState([]);
  const { data: devicesData } = useDevices();
  const { mutate: deleteDevice } = useDeleteDevice();
  const tableHead = useMemo(() => {
    return [
      {
        id: "name",
        numberic: false,
        label: "Name",
      },
      {
        id: "isProvision",
        numberic: true,
        label: "Provision Status",
      },
      {
        id: "upProtocol",
        numberic: false,
        label: "Up Protocol",
      },
      {
        id: "downProtocol",
        numberic: false,
        label: "Down Protocol",
      },
      {
        id: "modelName",
        numberic: false,
        label: "Model Name",
      },
      {
        id: "provision",
        numberic: false,
        label: "",
        isSort: false,
      },
      {
        id: "delete",
        numberic: false,
        label: "",
        isSort: false,
      },
    ];
  }, []);
  const tableData = useMemo(
    () =>
      ((data) => {
        return (data || []).map((datum) => {
          return {
            name: {
              value: <div>{datum.name}</div>,
              key: datum.name,
            },
            modelName: {
              value: <div>{datum.Model.name}</div>,
              key: datum.Model.name,
            },
            isProvision: {
              value: (
                <div>
                  {datum.isProvision ? (
                    <div
                      data-tip="This device has provisioned"
                      data-effect="solid"
                    >
                      <BsCloudCheck size={25} color="#00ad55" />
                      <ReactTooltip />
                    </div>
                  ) : (
                    <div data-tip="This device has not provisioned">
                      <BsCloudSlash size={25} color="#f30d0d" />
                      <ReactTooltip />
                    </div>
                  )}
                </div>
              ),
              key: datum.isProvision ? 1 : 0,
            },
            upProtocol: {
              value: <div>1</div>,
              key: datum.name,
            },
            downProtocol: {
              value: <div>2</div>,
              key: datum.name,
            },
            provision: {
              value: (
                <ConfirmBox
                  // onConfirm={() => {
                  //   mutate(data.id);
                  // }}
                  trigger={
                    <div
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      data-tip="Provision"
                      data-effect="solid"
                    >
                      <ReactTooltip />
                      <BsArrowBarUp size={25} />
                    </div>
                  }
                >
                  Are you sure about provision?
                </ConfirmBox>
              ),
              // key: datum.name,
            },
            delete: {
              value: (
                <ConfirmBox
                  onConfirm={() => {
                    deleteDevice(datum.id);
                  }}
                  trigger={
                    <div
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      data-tip="Delete Devices"
                      data-effect="solid"
                      data-place="top"
                      data-for="delete"
                    >
                      <ReactTooltip id="delete" />
                      <AiOutlineDelete size={25} />
                    </div>
                  }
                >
                  Are you sure about delete?
                </ConfirmBox>
              ),
              // key: datum.name,
            },
          };
        });
      })(devicesData),
    [devicesData, deleteDevice]
  );
  return (
    <div className={style.container}>
      <Table
        head={tableHead}
        data={tableData}
        select={[select, setSelect]}
        checkbox
        searchID="name"
      />
    </div>
  );
}
