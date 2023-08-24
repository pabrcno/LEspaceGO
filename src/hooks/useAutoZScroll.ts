import { useSpring } from "@react-spring/three";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";
export const useAutoZScrolling = (deactivateScroll?: boolean) => {
  const { camera } = useThree();
  const lastY = useRef(0);

  // Spring state for speed transition
  const [{ speed }, setSpeed] = useSpring(() => ({ speed: 0.01 }));

  useFrame(() => {
    if (deactivateScroll) return;

    // Update camera position with the current animated speed
    lastY.current -= speed.get();
    camera.position.z = lastY.current + 4;
  });
  const speedAudio = useMemo(() => new Audio("/speed.wav"), []);
  const [played, setPlayed] = useState(false);
  const [keyDown, setKeyDown] = useState(false); // New state to track if key is currently down
  speedAudio.volume = 0.1;
  useEffect(() => {
    const debouncedOnKeyDown = debounce(() => {
      // Mark the key as down
      setKeyDown(true);

      // Play the speed sound
      if (!played) {
        setPlayed(true);
        speedAudio.play().catch(() => {
          console.log("Failed to play speed sound");
        });
      }

      // Set the spring to the faster speed
      setSpeed({ speed: 0.5 });
    }, 200);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift" && !keyDown) {
        debouncedOnKeyDown();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        debouncedOnKeyDown.cancel(); // Cancel any pending debounced call

        // Mark the key as up
        setKeyDown(false);

        // pause the speed sound
        speedAudio.pause();
        speedAudio.currentTime = 0; // Optionally reset audio to start if you want it to replay from the beginning next time.

        // Reset states
        setPlayed(false);
        setSpeed({ speed: 0.01 });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSpeed]);

  return { speed: speed.get() };
};
