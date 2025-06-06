import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

export const Loader = (props) => {
  const { started, setStarted } = props;
  const { progress, total, loaded, item } = useProgress();

  useEffect(() => {
    // console.log(progress, total, loaded, item);
    if (progress === 100) {
      setTimeout(() => {
        setStarted(true);
      }, 1100);
    }
  }, [progress, total, loaded, item]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 transition-opacity duration-1000 pointer-events-none
  flex flex-col items-center justify-center bg-zinc-950
  ${started ? "opacity-0" : "opacity-100"}`}
    >
     <div className="text-xl md:text-5xl  font-geek text-lime-400 relative">
        <div
          className="absolute left-0 top-0  overflow-hidden truncate text-clip transition-all duration-500"
          style={{
            opacity: `${progress}%`,
          }}
        >
          {"loading ..."}
        </div>
        <div className=" opacity-0">{"loading ..."}</div>
      </div>
      <div className=" border-2 border-lime-400 w-52 h-5 p-1">
        <div
          className="h-full bg-lime-400 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
        <p className="text-lime-500 text-xl text-center font-geek mt-1"
        style={{
          opacity : progress > 2 ? 1 :0
        }}
        >
        {"> "}
        {Math.floor(progress)}
        {"%"}
      </p>
    </div>
  );
};