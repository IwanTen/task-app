import { useState } from "react";
import { IoMdClose as CloseIcon } from "react-icons/io";

type Props = {
  id: string;
  title: string;
  info: string;
  deleteTask: (id: string) => any;
};

const Card: React.FC<Props> = (Props) => {
  const deleteCard = () => {
    Props.deleteTask(Props.id);
  };
  return (
    <div className="card">
      <div className="card__header">
        <h2 className="card__header__title">{Props.title}</h2>
        <CloseIcon className="close-button" onClick={deleteCard} />
      </div>
      <p className="card__info">{Props.info}</p>
    </div>
  );
};

export default Card;
