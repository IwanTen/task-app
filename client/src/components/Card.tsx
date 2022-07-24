import { useState } from "react";
import { IoMdClose as CloseIcon } from "react-icons/io";

type Props = {
  id: string;
  title: string;
};

const Card = ({ id, title }: Props) => {
  const deleteCard = () => {
    fetch(`/api/v1/tasks/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => console.log(data.task));
  };
  return (
    <div className="card">
      <div className="card__header">
        <h2 className="card__header__title">{title}</h2>
        <CloseIcon onClick={deleteCard} />
      </div>
      <p className="card__description">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab autem,
        placeat enim consequuntur cupiditate deserunt sint nobis consequatur
        accusantium. Laboriosam consequuntur doloribus hic sunt a quae id
        provident error atque.
      </p>
    </div>
  );
};

export default Card;
