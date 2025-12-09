const sizes = {
  sm: {
    width: 140,
    height: 22,
  },
  md: {
    width: 150,
    height: 30,
  },
};

export const Logo = ({
  className,
  size = "md",
}: {
  className?: string;
  size?: keyof typeof sizes;
}) => {
  return <></>;
};
