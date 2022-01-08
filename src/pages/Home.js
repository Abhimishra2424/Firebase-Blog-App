import React, { useEffect, useState } from "react";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
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

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  return (
    <div className="homePage">
      {postList.map((post) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
              </div>
              <div className="deletePost">
                <button
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                  &#128465;
                </button>
              </div>
            </div>
            <div className="postTextContainer"> {post.post} </div>
            <h3>@{post.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
