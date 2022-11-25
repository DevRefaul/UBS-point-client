import React, { useContext } from "react";
import { Authentication } from "../../Contexts/Auth/AuthContext";

const Blog = () => {
  const user = useContext(Authentication);
  console.log(user);

  return (
    <div>
      <h2>This is blog page</h2>
    </div>
  );
};

export default Blog;
