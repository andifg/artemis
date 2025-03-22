import "./genericHeader.scss";

const GenericHeader = ({ header }: { header: string }) => {
  return (
    <div className="generic-header">
      <div className="headline">{header}</div>
    </div>
  );
};

export { GenericHeader };
