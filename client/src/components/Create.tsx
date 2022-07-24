import { useState } from "react";

type Props = {};

const Create = ({}: Props) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div
      className={`create  ${collapsed ? "collapsed" : ""}`}
      onClick={() => setCollapsed(!collapsed)}
    >
      Create
    </div>
  );
};

export default Create;
