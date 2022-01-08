import React, { useState } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, post);
  };

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
        <button className="createPostBtn" onClick={handleSubmit}>
          Create Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
