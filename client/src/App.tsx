import { useState, useEffect } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import Create from "./components/Create";
import "./styles/style.css";

type Props = {};

const apiUrl = "/api/v1/tasks";

const App = (props: Props) => {
  const [cardData, setCardData] = useState<any[] | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setCardData(data.tasks))
      .catch((err) => console.log(err));
  };

  // useEffect(() => console.log(cardData), [cardData]);

  let Cards;
  if (cardData) {
    Cards = cardData.map((card) => {
      return <Card title={card.name} id={card._id} key={card._id}></Card>;
    });
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Create />
        <div className="cards">{Cards}</div>
        <button onClick={() => fetchData()}>fetch data</button>
      </div>
    </div>
  );
};

export default App;
