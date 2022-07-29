import { useState, useEffect } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import TaskForm from "../components/TaskForm";
import { IoAdd as AddTaskButton } from "react-icons/io5";
import "../styles/style.css";

type Props = {};

const apiUrl = "/api/v1/tasks";

const App = (props: Props) => {
  const [cardData, setCardData] = useState<any[]>([]);
  const [formIsOpen, setFormIsOpen] = useState<Boolean>(true);

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = () => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setCardData(data.tasks))
      .catch((err) => console.log(err));
  };

  const catchError = (error: any) => {
    console.log(error);
  };

  const createTask = (incomingData: any) => {
    console.log("create task input data:" + JSON.stringify(incomingData));
    fetch("/api/v1/tasks", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: incomingData.name,
        info: incomingData.info,
        steps: incomingData.steps,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return catchError(res);
        } else {
          res.json().then((data) => {
            console.log(data);
            setCardData((prev) => {
              return [...prev, data.task];
            });
          });
        }
      })
      .catch(catchError);
  };

  const deleteTask = (id: string) => {
    fetch(`/api/v1/tasks/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((res) => {
        setCardData((data) => data.filter((card) => card._id !== id));
        console.log(`${res.task} successfully deleted!`);
      })
      .catch((err) => console.log(err));
  };

  let Cards;
  if (cardData) {
    Cards = cardData.map((card) => {
      return (
        <Card
          title={card.name}
          info={card.info}
          steps={card.steps}
          id={card._id}
          key={card._id}
          deleteTask={deleteTask}
        />
      );
    });
  }

  return (
    <div className="project-page">
      <div className="project-page__header">
        <h1 className="project-page__header__title">{"MY TASKS"}</h1>
        {/* <h2 className="project-page__header__form-button">set timer</h2> */}
      </div>
      <div className="project-page__divider">
        {"tasks"}
        <AddTaskButton
          size={"auto"}
          className="project-page__add-button"
          onClick={() => setFormIsOpen(true)}
        />
      </div>
      <div className="project-page__content">
        <TaskForm
          formOpen={formIsOpen}
          createTask={createTask}
          closeForm={() => {
            setFormIsOpen(false);
          }}
        />
        <div className="cards">{Cards}</div>
        {/* <button onClick={() => fetchAllTasks()}>fetch data</button> */}
      </div>
    </div>
  );
};

export default App;
