import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ isAuth }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  //   addDoc is a function that takes in a collection name and a document object

  //   ! This is Ref collection Name of the database
  const postsCollectionRef = collection(db, "posts");

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      post,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create Post</h1>
        <div className="inputGp">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            placeholder="Title..."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputGp">
          <label htmlFor="Post">Post</label>
          <textarea
            id="Post"
            rows="10"
            cols="50"
            value={post}
            placeholder="Post..."
            onChange={(e) => setPost(e.target.value)}
          ></textarea>
        </div>
        <button className="createPostBtn" onClick={createPost}>
          Create Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
