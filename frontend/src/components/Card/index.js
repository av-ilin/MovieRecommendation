import React, { useState } from "react";
import "./style.css";
import Input from "../Input";
import Button from "../Button";


function Card({
  anime_id,
  name,
  genre,
  type,
  episodes,
  rating,
  members,
  onClick,
  disabled,
  isShowReview,
}) {
  //   const [state, setState] = React.useState(null);
  const [review, reviewSet] = useState(0);
  function setReview() {
    // console.log(genre, genre.split(", "));
    let genres_review = {};
    for (let g of genre.split(", ")) {
      // console.log(g);
      genres_review[g] = review;
    }
    return genres_review;
  }
  return (
    <div className="movie_card" id="bright">
      <div className="info_section">
        <div className="movie_header">
          {/* <img
            className="locandina"
            alt=""
            src="https://movieplayer.net-cdn.it/t/images/2017/12/20/bright_jpg_191x283_crop_q85.jpg"
          /> */}
          <h1>{name}</h1>
          <h4>
            {episodes} серий, Рейтинг {rating}
          </h4>
          <span className="minutes">{type}</span>
          <p className="type">{genre}</p>
        </div>
        {/* <div className="movie_desc">
          <p className="text">
            Далеко-далеко за словесными горами в стране гласных и согласных
            живут рыбные тексты. Диких, власти жизни страна вдали семантика,
            безорфографичный лучше запятой вершину толку, все меня не несколько
            себя. Правилами то путь всемогущая?
          </p>
        </div> */}
      </div>
      <div className="blur_back bright_back">
        <div className="movie_social">
          {isShowReview && (
            <>
              <Input
                value={review}
                onInput={(e) => reviewSet(e.target.value)}
                placeholder="Оценка"
                disabled={disabled}
              />
              <Button
                disabled={review === 0}
                onClick={() => onClick(anime_id, setReview())}
              >
                Запомнить оценку
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
