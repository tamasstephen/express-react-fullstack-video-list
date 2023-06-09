interface DivProps {
  children: React.ReactNode;
  width?: "small" | "medium" | "large" | "xtra";
}

const widthMap = {
  small: "w-72",
  medium: "w-[90%] lg:w-1/2 xl:max-w-5xl",
  large: "w-[90%] lg:w-7/12 xl:max-w-7xl",
  xtra: "w-[90%]  xl:max-w-screen-xl",
};

export default function Div({ children, width }: DivProps) {
  return (
    <div className="flex justify-center">
      <div
        className={`flex flex-col items-center justify-center ${
          width ? widthMap[width] : widthMap.small
        }`}
      >
        {children}
      </div>
    </div>
  );
}
