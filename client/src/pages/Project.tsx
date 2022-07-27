import { useState, useEffect } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import TaskForm from "../components/TaskForm";
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

  // console.log(`task successfully created ${JSON.stringify(data)}`);

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

  // useEffect(() => console.log(cardData), [cardData]);

  let Cards;
  if (cardData) {
    Cards = cardData.map((card) => {
      return (
        <Card
          title={card.name}
          info={card.info}
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
        <h1 className="project-page__header__title">MY PROJECT</h1>
        <h2
          className="project-page__header__form-button"
          onClick={() => setFormIsOpen(!formIsOpen)}
        >
          create new task
        </h2>
      </div>
      <TaskForm
        formOpen={formIsOpen}
        createTask={createTask}
        closeForm={() => {
          console.log("close form");
          setFormIsOpen(!formIsOpen);
        }}
      />
      <div className="cards">{Cards}</div>
      <button onClick={() => fetchAllTasks()}>fetch data</button>
    </div>
  );
};

export default App;
