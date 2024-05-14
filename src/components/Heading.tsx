interface HeadingProps {
  title: string;
  center?: boolean;
  small?:boolean;
}

export const Heading: React.FC<HeadingProps> = ({ title, center, small }) => {
  const headingStyle: React.CSSProperties = {
    textAlign: center ? "center" : "start",
    fontWeight: "bold",
    fontSize: small ? "0.8rem" : "0.5rem",
    textShadow: "2px 2px 5px black",
  };

  return (
    <div style={headingStyle}>
      {
        small ? <h2>{title}</h2> : <h1>{title}</h1>
      }
    </div>
  );
};
