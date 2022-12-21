import React, { useEffect } from "react";
import { LOAD_USERS } from "../redux/reducers/people/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectPeople } from "../redux/reducers/people/selectors";
import PeopleTablePagination from "./PeopleTablePagination";
import { Link } from "react-router-dom";

const PeopleTable = () => {
  const dispatch = useDispatch();
  const people = useSelector(selectPeople);
  const { loading, data, page, search } = people;
  console.log(people);

  useEffect(() => {
    dispatch({
      type: LOAD_USERS,
      payload: { page: people.page, search: people.search },
    });
  }, []);

  const changePage = (newPage) => {
    dispatch({
      type: LOAD_USERS,
      payload: {
        page: newPage,
        search,
      },
    });
  };

  const searchHandler = (e) => {
    dispatch({
      type: LOAD_USERS,
      payload: {
        page: 1,
        search: e.target.value,
      },
    });
  };

  return (
    <div style={{ padding: "15px" }}>
      <h1>Star Wars People</h1>
      <form>
        <input
          type="text"
          placeholder="search People..."
          value={search}
          onChange={searchHandler}
        />
      </form>
      <button
        onClick={() =>
          dispatch({ type: LOAD_USERS, payload: { page: 1, search: "" } })
        }
      >
        click
      </button>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          <table border={1} width="100%" cellPadding={2} cellSpacing={0}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Birth year</th>
                <th>Eye color</th>
                <th>Gender</th>
                <th>Hair color</th>
                <th>Height</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data?.results.map((person) => {
                const id = person.url.replaceAll(/\D/g, "");
                const {
                  name,
                  birth_year,
                  hair_color,
                  height,
                  eye_color,
                  gender,
                } = person;
                return (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{birth_year}</td>
                    <td>{eye_color}</td>
                    <td>{gender}</td>
                    <td>{hair_color}</td>
                    <td>{height}</td>
                    <td>
                      <Link to={`/people/${id}`}>Details</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <PeopleTablePagination
            page={page}
            total={data?.count}
            onChange={changePage}
          />
        </>
      )}
    </div>
  );
};

export default PeopleTable;
