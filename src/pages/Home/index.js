import style from "./index.module.scss";
import Chart from "react-apexcharts";
import { useDeviceCount } from "hooks/api";
import { usePerformance } from "context";
export default function Home() {
  const data = usePerformance();
  const { data: devices } = useDeviceCount();
  const optionsRam = {
    colors: ["#259EFA"],
    chart: {
      animations: {
        enabled: false,
        animateGradually: {
          enabled: false,
        },
        dynamicAnimation: {
          enabled: false,
        },
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 15,
          size: "70%",
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "13px",
          },
          value: {
            color: "#111",
            fontSize: "30px",
            show: true,
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Memory"],
  };
  const optionsCPU = {
    colors: ["#259EFA"],
    chart: {
      animations: {
        enabled: false,
        animateGradually: {
          enabled: false,
        },
        dynamicAnimation: {
          enabled: false,
        },
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 15,
          size: "70%",
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "13px",
          },
          value: {
            color: "#111",
            fontSize: "30px",
            show: true,
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["CPU"],
    fill: {
      colors: "#00E396",
    },
  };
  const optionsDisk = {
    colors: ["#259EFA"],
    chart: {
      animations: {
        enabled: false,
        animateGradually: {
          enabled: false,
        },
        dynamicAnimation: {
          enabled: false,
        },
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 15,
          size: "70%",
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "13px",
          },
          value: {
            color: "#111",
            fontSize: "30px",
            show: true,
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Disk"],
    fill: { colors: "#FEB019" },
  };
  const optionDownload = {
    chart: {
      id: "network",
      animations: {
        enabled: true,
        easing: "linear",
        speed: 100,
        dynamicAnimation: {
          speed: 1000,
        },
      },
      plotOptions: {
        hollow: {
          margin: 15,
          size: "70%",
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      type: "datetime",
      min: Date.now() - (Date.now() % 1000) - 20 * 1000,
      max: Date.now() - (Date.now() % 1000),
      range: 20 * 1000,
      labels: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
  };
  function secondToWeek(second) {
    const secondPerWeek = 604800;
    const secondPerDay = 86400;
    const secondPerHour = 3600;
    const secondPerMinute = 60;
    const getInteger = (b, a) => {
      return (a - (a % b)) / b;
    };
    function addLeadingZeros(num, totalLength) {
      return String(num).padStart(totalLength, "0");
    }
    let week = getInteger(secondPerWeek, second);
    let day = getInteger(secondPerDay, second) - week * 7;
    let hour = getInteger(secondPerHour, second) - (week * 7 + day) * 24;
    let minute =
      getInteger(secondPerMinute, second) - ((week * 7 + day) * 24 + hour) * 60;
    let sc = second - (((week * 7 + day) * 24 + hour) * 60 + minute) * 60;

    return (
      week +
      "w " +
      day +
      "d " +
      addLeadingZeros(hour, 2) +
      "h " +
      addLeadingZeros(minute, 2) +
      "m " +
      addLeadingZeros(sc, 2) +
      "s "
    );
  }
  return (
    <div className={style.container}>
      <div className={style.row1}>
        <h2 className={style.row1Header}>Performance</h2>
        <div className={style.Chart}>
          <Chart
            options={optionsRam}
            series={[data.ram]}
            type="radialBar"
            className={style.chart}
            height="100%"
            width="100%"
          />
          <Chart
            options={optionsCPU}
            series={[data.cpu]}
            type="radialBar"
            className={style.chart}
            height="100%"
            width="100%"
          />
          <Chart
            options={optionsDisk}
            series={[data.disk]}
            type="radialBar"
            className={style.chart}
            height="100%"
            width="100%"
          />
        </div>
      </div>
      <div className={style.row2}>
        <div className={style.col1}>
          <div className={style.cell121}>
            <div className={style.devices}>
              <h2>Devices</h2>
              <div className={style.deviceStatus}>
                <div>
                  <h1>{devices?.active || 0}</h1>
                  {/* <span style={{ flex: "1 1 0%" }} /> */}
                  <span style={{ color: "#35C78B" }}>active</span>
                </div>
                <div>
                  <h1>{devices?.count - (devices?.active || 0) || 0}</h1>
                  {/* <span style={{ flex: "1 1 0%" }} /> */}
                  <span style={{ color: "#F17B62" }}>dormant</span>
                </div>
                <div>
                  <h1>{devices?.count || 0}</h1>
                  {/* <span style={{ flex: "1 1 0%" }} /> */}
                  total
                </div>
              </div>
            </div>
          </div>
          <div className={style.cell122}>
            <div className={style.message}>
              <h2>Activity Log</h2>
              <div className={style.log}>
                <div>
                  <h1>0</h1>
                  <span style={{ color: "#F17B62" }}>Error</span>
                </div>
                <div>
                  <h1>0</h1>
                  <span style={{ color: "#FCBA16" }}>Warning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.col2}>
          <div
            className={style.content}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h2>System</h2>
            <div className={style.system}>
              <h3>CPU</h3>
              <div style={{ display: "flex" }}>
                Core <span style={{ flex: "1 1 0%" }} />
                {data.cpuCount}
              </div>
              <div style={{ display: "flex" }}>
                Usage <span style={{ flex: "1 1 0%" }} />
                {data.cpu}%
              </div>
              <div style={{ display: "flex" }}>
                Model <span style={{ flex: "1 1 0%" }} />
                {data.cpuModel}
              </div>
            </div>
            <div className={style.system}>
              <h3>Memory</h3>
              <div style={{ display: "flex" }}>
                Total <span style={{ flex: "1 1 0%" }} />
                {data.totalMemMb} MB
              </div>
              <div style={{ display: "flex" }}>
                Used <span style={{ flex: "1 1 0%" }} />
                {data.usedMemMb} MB
              </div>
              <div style={{ display: "flex" }}>
                Free <span style={{ flex: "1 1 0%" }} />
                {data.freeMemMb} MB
              </div>
            </div>
            <div className={style.system}>
              <h3>Operating System</h3>
              <div style={{ display: "flex" }}>
                OS <span style={{ flex: "1 1 0%" }} />
                {data.os}
              </div>
              <div style={{ display: "flex" }}>
                Type <span style={{ flex: "1 1 0%" }} />
                {data.type}
              </div>
              <div style={{ display: "flex" }}>
                Arch <span style={{ flex: "1 1 0%" }} />
                {data.arch}
              </div>
              <div style={{ display: "flex" }}>
                Uptime <span style={{ flex: "1 1 0%" }} />
                {secondToWeek(data.uptime || 0)}
              </div>
            </div>
          </div>
        </div>
        <div className={style.col3}>
          <div className={style.content}>
            <h2>Network</h2>
            <div className={style.networkChart}>
              <Chart
                type="line"
                height="100%"
                width="100%"
                series={[
                  {
                    name: "Download",
                    data: data.download,
                  },
                  {
                    name: "Upload",
                    data: data.upload,
                  },
                ]}
                options={optionDownload}
              />
            </div>
            <div className={style.networkInfo}>
              <div style={{ display: "flex" }}>
                Upload
                <span style={{ flex: "1 1 0%" }} />
                {data.outputMb} Mb/s
              </div>
              <div style={{ display: "flex" }}>
                Download <span style={{ flex: "1 1 0%" }} />
                {data.inputMb} Mb/s
              </div>
              <div style={{ display: "flex" }}>
                IP Address <span style={{ flex: "1 1 0%" }} />
                {data.ip}
              </div>
              <div style={{ display: "flex" }}>
                Host name <span style={{ flex: "1 1 0%" }} />
                {data.hostname}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
