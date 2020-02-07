import React, { useState, useEffect } from 'react';
import './hackernews.css';
import Httpservice from '../httpservice/httpservice';
import NewsList from '../news-list/news-list';
import { Preloader } from '../preloader/preloader';

const Hackernews = () => {
  const [visibleNewsArray, setVisibleNewsArray] = useState([]);
  const [load, setLoad] = useState(false);
  const service = new Httpservice();

  /**
   * первичный запрос списка новостей, точнее их id
   */
  useEffect(() => {
    service
      .getData(
        'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
      )
      .then(allNewsArray => {
        setFirstNewsData(allNewsArray, 100);
      });
  }, []);

  const setFirstNewsData = async (responseArray, numbersOfNews) => {
    await loadNews(responseArray.splice(0, numbersOfNews));
    setLoad(true);
  };

  const loadNews = async newsIdArray => {
    return new Promise((resolve, reject) => {
      newsIdArray.forEach((id, index, arr) => {
        service
          .getData(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
          )
          .then(fullNews => {
            setVisibleNewsArray(prevArray => [...prevArray, fullNews]);
            if (arr.length - 1 === index) {
              resolve();
            }
          });
      });
    });
  };

  const newsCreate = () => {
    const newsList = visibleNewsArray.map(news => (
      <NewsList key={news.id} newsData={news}></NewsList>
    ));
    return newsList;
  };

  return (
    <div className='wrapper'>
      {load ? newsCreate() : <Preloader></Preloader>}
    </div>
  );
};

export default Hackernews;
