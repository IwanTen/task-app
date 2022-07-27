import { useState, useEffect } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import Create from "../components/Create";
import "./styles/style.css";

type Props = {};

const apiUrl = "/api/v1/tasks";

const App = (props: Props) => {
  const [cardData, setCardData] = useState<any[]>([]);

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
    <div>
      <Header />

      <div className="content">
        <Create createTask={createTask} />
        <div className="cards">{Cards}</div>
        <button onClick={() => fetchAllTasks()}>fetch data</button>
      </div>
    </div>
  );
};

export default App;
