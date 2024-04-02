import { useEffect, useState, useContext } from "react";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(utc);
dayjs.extend(timezone);
// dayjs.extend(isSameOrAfter);
import { timerContext } from "@/context/TimerContext";

export const useTimer = () => {
  const { timerState, setTimerState, isRunning, setIsRunning } =
    useContext(timerContext);
  const pomOrder = [];
  const timeMap = { shortBreak: 300, longBreak: 1200 };

  const [secondsRemaining, setSecondsRemaining] = useState(
    timerState.timerLength,
  );
  const [timerRunning, setTimerRunning] = useState(false);
  const [startTS, setStartTS] = useState<undefined | string>(undefined);
  const [endTS, setEndTS] = useState<undefined | string>(undefined);

  const [timerConfig, setTimerConfig] = useState<{
    timer: number;
    rest: number;
    isPomodoro: boolean;
    mode: "timer" | "rest";
  }>({
    timer: 1500,
    rest: 300,
    isPomodoro: true,
    mode: "timer",
  });

  const displayTimer = new Date(secondsRemaining * 1000)
    .toISOString()
    .substring(secondsRemaining < 3600 ? 14 : 12, 19);
  // const startDT = new Date(Date.now()).toISOString();
  // let mode = "TIMER";

  useEffect(() => {
    setSecondsRemaining(timerConfig[timerConfig.mode]);
  }, [timerConfig.mode, timerConfig.timer, timerConfig.rest]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerRunning) {
        // || dayjs().isAfter(endTS) had this as part of or condition line 40 - to figure out with local store
        if (secondsRemaining === 0) {
          console.log("inside main stop condition");
          if (secondsRemaining === 0) {
            console.log("inside timer runout stop condition");
            setTimerState((prev) => ({
              ...prev,
              timersComplete: prev.timersComplete + 1,
            }));
            // setMode((prev) => (prev === "TIMER" ? "REST" : "TIMER"));
            // mode = "REST";
          }
          console.log("timers complete", timerState.timersComplete);
          clearInterval(interval);
          setTimerRunning(false);
          // send notifification
          setTimerConfig((prev) => ({
            ...prev,
            mode: prev.mode === "timer" ? "rest" : "timer",
          }));

          return;
        }
        setSecondsRemaining((prev) => prev - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsRemaining, timerRunning]);

  return {
    timerConfig,
    setTimerConfig,
    timerRunning,
    setTimerRunning,
    secondsRemaining,
    setSecondsRemaining,
    displayTimer,
    startTS,
    setStartTS,
    endTS,
    setEndTS,
  };
};
