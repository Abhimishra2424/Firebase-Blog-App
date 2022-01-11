import React, { useCallback, useEffect, useState } from "react";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const Home = ({ isAuth }) => {
  const classes = useStyles();
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const [loading, setLoading] = useState(true);

  const getallPosts = useCallback(async () => {
    
    try {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [postsCollectionRef]);

  useEffect(() => {
    getallPosts();
  }, [getallPosts]);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  return (
    <div>
      {loading ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <div className="homePage">
          {postList.map((post) => {
            return (
              <div className="post">
                <div className="postHeader" key={post.id}>
                  <div className="title">
                    <h1> {post.title}</h1>
                  </div>
                  {/* agar user same rahega to hi delete button 
                {/* agar user same rahega to hi delete button 
                  {/* agar user same rahega to hi delete button 
                 show hoga agar nahin 
                 hai to delete button hide hoga */}
                  <div className="deletePost">
                    {isAuth && post.author.id === auth.currentUser.uid && (
                      <button onClick={() => deletePost(post.id)}>
                        Delete
                      </button>
                    )}
                  </div>
                </div>
                <div className="postTextContainer"> {post.post} </div>
                <h3>@{post.author.name}</h3>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
