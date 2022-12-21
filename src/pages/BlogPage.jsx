import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BlogPage = () => {
  const dispatch = useDispatch();
  const blogData = useSelector((state) => state.app.blog);

  console.log(blogData);

  const { results } = blogData;

  // if (!blogData) {
  //   return <div>BlogData null</div>;
  // }
  //
  // if (!results || !results.length) {
  //   return <div>results null</div>;
  // }

  return (
    <div>
      <h1> Blog page</h1>
      <button
        onClick={() => {
          dispatch({ type: "LOAD_SOME_DATA" });
        }}
      >
        load some data
      </button>
      {/*{results.map((res) => (*/}
      {/*  <div key={res.name}>*/}
      {/*    <p>*/}
      {/*      {res.name} <span>{res.model}</span>*/}
      {/*    </p>*/}
      {/*  </div>*/}
      {/*))}*/}
    </div>
  );
};

export default BlogPage;
