import { motion, useAnimate } from "framer-motion";
import {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

type ModalPropsUnion = {
  backdropColor?: string;
  onBackdropPress: () => void;
  openDuration?: number;
  closeDuration?: number;
  children: ReactNode;
};

export interface RefForModal {
  handleOpenAnimate: () => void;
  handleCloseAnimate: () => void;
}

type Coords = {
  x: number;
  y: number;
};

const useMousePosition = (): Coords => {
  const [position, setPosition] = useState<Coords>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({
        x: event.clientX - window.innerWidth / 2,
        y: event.clientY - 50,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return position;
};

const ModalRef = forwardRef<RefForModal, ModalPropsUnion>((props, ref) => {
  const {
    backdropColor,
    onBackdropPress,
    openDuration,
    closeDuration,
    children,
  } = props;
  const [indexElement, setIndexElement] = useState<Coords>({ x: 0, y: 0 });
  const [scope, animate] = useAnimate();
  const position = useMousePosition();

  useEffect(() => {
    animate(scope.current, { opacity: 0 });
    animate("#modal", {
      scale: 0,
    });
  }, []);

  const handleOpenAnimate = async () => {
    const { x, y } = position;
    animate(
      scope.current,
      {
        opacity: 1,
        display: "flex",
      },
      { duration: openDuration ? openDuration / 1000 : 0.3 }
    );
    animate(
      "#modal",
      {
        scale: [0.5, 1],
        opacity: [1, 1],
        x: [x, 0],
        y: [y, 12],
      },
      { duration: openDuration ? openDuration / 1000 : 0.3 }
    );
    setIndexElement(position);
  };
  const handleCloseAnimate = async () => {
    const { x, y } = indexElement;
    animate(
      scope.current,
      {
        opacity: 0,
        transitionEnd: {
          display: "none",
        },
      },
      { duration: closeDuration ? closeDuration / 1000 : 0.3 }
    );
    animate(
      "#modal",
      {
        scale: [1, 0],
        opacity: [1, 1],
        x: [0, x],
        y: [12, y],
      },
      { duration: closeDuration ? closeDuration / 1000 : 0.3 }
    );
  };

  useImperativeHandle(ref, () => {
    return {
      handleOpenAnimate,
      handleCloseAnimate
    };
  });

  return (
    <div
      ref={scope}
      className={`${
        !backdropColor &&
        "bg-gradient-to-r from-blue-100/70 via-purple-100/70 to-pink-100/70"
      }  fixed top-0 hidden right-0 left-0 z-50 w-full h-screen p-4 justify-center`}
      style={{
        backgroundColor: backdropColor,
      }}
      onClick={onBackdropPress}
    >
      <div
        id="modal"
        className="bg-white pt-8 pb-6 px-10 rounded-lg shadow-md fixed"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <motion.img
          className="absolute top-2 right-2 size-6 cursor-pointer opacity-90"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", duration: 0.3 }}
          onClick={handleCloseAnimate}
          src="./images/close.png"
          alt=""
        />
        {children}
      </div>
    </div>
  );
});

export default ModalRef;
