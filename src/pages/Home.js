import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

const Home = () => {
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, [postsCollectionRef]);

  return (
    <div className="homePage">
      {postList.map((post) => {
        return (
          <div className="post">
            <h1>{post.title}</h1>
            <p>{post.post}</p>
            <p>{post.author.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
