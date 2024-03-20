"use client";
import {useEffect, useState} from "react";
import {animate, motion, useMotionValue, useTransform} from "framer-motion";
import {getIndex, useFlubber} from "@/lib/use-flubber";

const circle = "M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22";
const demonFace = "M22.5 2.09c-.9.91-2.37 1.64-4.19 2.16A9.92 9.92 0 0 0 12 2c-2.39 0-4.59.84-6.31 2.25C3.87 3.73 2.4 3 1.5 2.09c.03 1.63.85 3.12 2.22 4.31A9.89 9.89 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-2.08-.63-4-1.72-5.6c1.37-1.19 2.19-2.68 2.22-4.31M7.5 8.5l3 1.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5zm4.5 8.73c-1.75 0-3.29-.73-4.19-1.81L9.23 14c.45.72 1.52 1.23 2.77 1.23s2.32-.51 2.77-1.23l1.42 1.42c-.9 1.08-2.44 1.81-4.19 1.81M16.5 10c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5l3-1.5z";
const paths = [demonFace, circle, demonFace];
const colors = ["#8000FF", "#000", "#8000FF"];

export function DevilEmoji() {
  const [pathIndex, setPathIndex] = useState<number>(0);
  const progress = useMotionValue<number>(1);
  const fill = useTransform(progress, paths.map(getIndex), colors);
  const path = useFlubber(progress, paths);
  
  function handleSwitch() {
    console.log(`animation started to ${pathIndex}, with progress,`, progress)
    const animation = animate(progress, pathIndex, {
        duration: 1,
        ease: "easeInOut",
        onComplete: () => {
          if (pathIndex === paths.length - 1) {
            progress.set(0);
            setPathIndex(1);
          } else {
            setPathIndex(pathIndex + 1)
          }
        }
      }
    );
    return () => animation.stop();
  }
  
  return (
    <button onClick={handleSwitch} className="flex flex-col items-center">
      Click to start animation!
      <svg viewBox="0 0 24 24"
           className="w-12 h-12">
        <motion.path strokeLinecap="round" strokeLinejoin="round"
                     d={path}
                     fill={fill}
        />
      </svg>
    </button>
  )
}



