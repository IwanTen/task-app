import { useEffect, useState } from "react";
import { IoMdClose as CloseIcon } from "react-icons/io";

type Props = {
  createTask: (data: any) => void;
  formOpen: Boolean;
  closeForm: () => void;
};

interface CardData {
  name: string;
  info: string;
}

const Create: React.FC<Props> = (Props) => {
  const [data, setData] = useState<CardData>({
    name: "",
    info: "",
  });
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    Props.createTask(data);
  };

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setData((data) => {
      return {
        ...data,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    console.log(open);
  }, [open]);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className={`create-task ${Props.formOpen == true ? "collapsed" : ""}`}>
      <div className="create-task__header">
        <h2 className="create-task__header__title">create a new task</h2>
        <CloseIcon className="create-task-close" onClick={Props.closeForm} />
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

        <label>
          {"add description (optional)"}
          <textarea name="info" onChange={handleChange}></textarea>
        </label>
        <button className="create-task-submit">add task</button>
      </form>
    </div>
  );
};

export default Create;

// ${collapsed ? "collapsed" : ""} code to collapse card
