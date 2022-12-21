import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BlogPage = () => {
  const blogData = useSelector((state) => state.app.blog);

  console.log(blogData);

  return <div>BlogPage</div>;
};

export default BlogPage;
