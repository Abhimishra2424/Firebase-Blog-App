import React, { useCallback, useEffect, useState } from "react";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  table: {
    minWidth: 650,
  },
}));

const Home = ({ isAuth }) => {
  const classes = useStyles();
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const [loading, setLoading] = useState(true);
  const [selectedData, setSelectedData] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  const funfortakingData = (row) => {
    setSelectedData(row);
    setShowModal(true);
  };

  return (
    <div>
      {loading ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>SR NO</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {postList.length
                ? postList.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.author.name}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => funfortakingData(row)}
                        >
                          View Post
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        {isAuth && row.author.id === auth.currentUser.uid && (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => deletePost(row.id)}
                          >
                            Delete
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                : "no data"}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <ModalView
        selectedData={selectedData}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

const ModalView = ({ selectedData, setShowModal, showModal }) => {
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: "60%",
      height: "50%",
      textAlign: "center",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={showModal}
      onClose={() => setShowModal(false)}
    >
      <div className={classes.paper} style={modalStyle}>
        <div style={{ width: "100%" }}>
          <p>{selectedData.post}</p>
        </div>
      </div>
    </Modal>
  );
};

export default Home;
