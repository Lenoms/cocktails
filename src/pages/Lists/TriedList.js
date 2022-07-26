import React, { useEffect, useState } from "react";
import "./Lists.css";
import { getDatabase, ref, get, child } from "firebase/database";
import TriedCocktailItem from "../../components/TriedCocktailItem/TriedCocktailItem";
import { motion } from "framer-motion";
import { RouteAnimation } from "../../animations/RouteAnimation";
import { Spinner } from "react-bootstrap";
import { sortList } from "../../services/sorter.service";
import { searchQueryMatch } from "../../services/search.service";
import { downloadBackUp } from "../../services/backup.service";

function TriedList({ sortBy, searchQuery }) {
  const [data, setData] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [searchQueryTerm, setSearchQueryTerm] = useState();
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCocktails() {
      const dbRef = ref(getDatabase());
      get(child(dbRef, "cocktails/tried"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setData(Object.values(snapshot.val()));
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    fetchCocktails();
  }, []);

  useEffect(() => {
    var sortedList = sortList(data, sortBy);
    setDisplayList(sortedList.slice());

    //Analytics stuff interested.
    // let daniel_sum = 0;
    // let dani_sum = 0;
    // for (let i = 0; i < data.length; i++) {
    //   daniel_sum += parseInt(data[i].danielGrade);
    //   dani_sum += parseInt(data[i].daniGrade);
    // }

    // console.log(
    //   `Daniel Total Grade: ${daniel_sum}, Avg: ${
    //     daniel_sum / data.length
    //   }, Dani Total Grade: ${dani_sum}, Avg: ${dani_sum / data.length}`
    // );

    // console.log("Data: ", data);

    // TO BACK UP
    // if (data.length != 0) {
    //   downloadBackUp(data);
    // }
  }, [sortBy, data]);

  useEffect(() => {
    setSearchQueryTerm(searchQuery);
  }, [searchQuery]);

  function filterCallback(item) {
    return searchQueryMatch(searchQueryTerm, item);
  }

  if (loading) {
    return <Spinner animation="border" />;
  } else {
    return (
      <motion.div
        className="list"
        initial={RouteAnimation.initial}
        animate={RouteAnimation.animate}
        exit={RouteAnimation.exit}
      >
        {displayList
          .map(function (item) {
            return (
              <TriedCocktailItem
                key={item.cocktailName}
                item={item}
                sortBy={sortBy}
              ></TriedCocktailItem>
            );
          })
          .filter((item) => filterCallback(item))}
      </motion.div>
    );
  }
}

export default TriedList;
