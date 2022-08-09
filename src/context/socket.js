import { createContext } from "react";
import io from "socket.io-client";
import { useState, useEffect, useContext } from "react";
const Performance = createContext();
export const usePerformance = () => useContext(Performance);
export function PerformanceProvider({ children }) {
  const [performance, setPerformance] = useState({
    ram: 0,
    cpu: 0,
    disk: 0,
    upload: [],
    download: [],
  });
  useEffect(() => {
    const socket = io();
    socket.on("connect", () => {
      socket.emit("performance");
      socket.on("performance", (msg) => {
        setPerformance((data) => {
          let tmp = data;
          tmp.upload.push({
            x: new Date(),
            y: msg.outputMb || 0,
          });
          tmp.download.push({
            x: new Date(),
            y: msg.inputMb || 0,
          });
          if (tmp.upload.length > 40) {
            tmp.upload = tmp.upload.slice(data.length - 10, data.length);
            tmp.download = tmp.download.slice(data.length - 10, data.length);
          }
          return { ...tmp, ...msg };
        });
      });
    });
    return () => {
      socket.removeAllListeners();
    };
  }, []);
  return <Performance.Provider value={performance} children={children} />;
}
