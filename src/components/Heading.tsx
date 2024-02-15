interface HeadingProps {
  title: string;
  center?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({ title, center }) => {
  const headingStyle: React.CSSProperties = {
    textAlign: center ? "center" : "start",
    fontWeight: "bold",
    fontSize: "0.5rem",
  };

  return (
    <div style={headingStyle}>
      <h1>{title}</h1>
    </div>
  );
};
