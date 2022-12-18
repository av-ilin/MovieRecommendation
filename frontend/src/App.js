import React, { useEffect, useMemo, useState } from "react";
import Card from "./components/Card";
import "./App.css";
import data from "./anime.json";
import Pagination from "./components/Pagination";
import Button from "./components/Button";

var movieDB = new Array(10).fill(0);
const PageSize = 20;

function App() {
  const [moviesId, setMoviesId] = useState([]);
  const [user, changeUser] = useState({
    Special: 0,
    Action: 0,
    Adventure: 0,
    Cars: 0,
    Comedy: 0,
    Dementia: 0,
    Demons: 0,
    Drama: 0,
    Ecchi: 0,
    Fantasy: 0,
    Game: 0,
    Harem: 0,
    Hentai: 0,
    Historical: 0,
    Horror: 0,
    Josei: 0,
    Kids: 0,
    Magic: 0,
    "Martial Arts": 0,
    Mecha: 0,
    Military: 0,
    Mystery: 0,
    Parody: 0,
    Police: 0,
    Psychological: 0,
    Romance: 0,
    Samurai: 0,
    School: 0,
    "Sci-Fi": 0,
    Seinen: 0,
    Shoujo: 0,
    "Shoujo Ai": 0,
    Shounen: 0,
    "Shounen Ai": 0,
    "Slice of Life": 0,
    Space: 0,
    Sports: 0,
    "Super Power": 0,
    Supernatural: 0,
    Thriller: 0,
    Vampire: 0,
    Yaoi: 0,
    Yuri: 0,
  });
  const [recomendationsList, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  function setReview(id, genres_review) {
    let ids = [...moviesId];
    ids.push(id);
    let user_vector = { ...user };

    for (let [genre, review] of Object.entries(genres_review)) {
      user_vector[genre] += parseInt(review);
    }
    changeUser(user_vector);
  }

  async function createReq() {
    // "proxy": "http://127.0.0.1:3001",
    const res = await fetch("http://127.0.0.1:3001/movie-rec/api", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(user),
    });
    const response = await res.json();
    // console.log(response);
    setList([...response, ...recomendationsList]);
  }

  const rec_list = useMemo(() => {
    return data.filter((m) => recomendationsList.includes(m.anime_id));
  }, [recomendationsList]);

  return (
    <div className="container">

      <div className="list">
        {currentTableData.map((item) => {
          return (
            <Card
              key={item.anime_id}
              onClick={setReview}
              disabled={moviesId.includes(item.anime_id)}
              isShowReview
              {...item}
            />
          );
        })}
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      <div className="list">
        <Button onClick={() => createReq()}>Оценить</Button>

        {rec_list.map((anime) => {
          // let card = data.find((item) => data.anime_id === m);
          return <Card key={anime.anime_id} {...anime} isShowReview={false} />;
        })}
      </div>
    </div>
  );
}

export default App;
