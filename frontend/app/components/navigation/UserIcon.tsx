interface UserIconProps {
  initials: string;
  size: "small" | "medium" | "large";
}

const sizeMap = {
  small: "w-10 h-10",
  medium: "w-12 h-12 text-lg",
  large: "w-16 h-16 text-xl",
};

export default function UserIcon({ initials, size }: UserIconProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gray-200 text-gray-900 font-medium ${sizeMap[size]}`}
    >
      <p>{initials}</p>
    </div>
  );
}
