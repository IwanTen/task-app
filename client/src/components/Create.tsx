import { useEffect, useState } from "react";

type Props = {};

interface CardData {
  name: string;
  info: string;
}

const Create = ({}: Props) => {
  const [data, setData] = useState<CardData>({
    name: "",
    info: "",
  });
  const [collapsed, setCollapsed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/v1/tasks", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: data.name }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((data) => {
      return {
        ...data,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className={`create-task`} onClick={() => setCollapsed(!collapsed)}>
      <div className="create-task__header">
        <h2 className="create-task__header__title">create a new task</h2>
      </div>
      <form className="create-task__form" onSubmit={handleSubmit}>
        <label>
          Task Name:
          <input
            type="text"
            value={data.name}
            name="name"
            onChange={handleChange}
          />
        </label>
        <button>add task</button>
      </form>
    </div>
  );
};

export default Create;

// ${collapsed ? "collapsed" : ""} code to collapse card
