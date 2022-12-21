import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { PEOPLE_DETAILS } from "../redux/reducers/peopleDetails/actions";
import { selectPeopleDetails } from "../redux/reducers/peopleDetails/selectors";

const Details = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const peopleDetail = useSelector(selectPeopleDetails);

  console.log(peopleDetail);
  const { data, loading } = peopleDetail;

  useEffect(() => {
    dispatch({ type: PEOPLE_DETAILS, payload: { id: param.id } });
  }, []);

  if (!data) {
    return <div>Data is null</div>;
  }

  const { name, skin_color, birth_year } = data;

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>Details page</h1>
          <div>
            <p>Name: {name}</p>
            <p>Skin color: {skin_color}</p>
            <p>Birth year: {birth_year}</p>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default Details;
