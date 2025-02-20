import { useEffect, useRef, useState } from "react";

import Grid from "@mui/material/Grid2";

import axios from "axios";
import Card from "./card";
import { axiosReq } from "../axios/authRequest";


export default function CardList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const lastpage = useRef(null)

  // Fetch users
  const GetUsers = async () => {
    if (loading || page == null) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/user?page=${page}&size=${10}`,
        {
          headers: {
            accesstoken: localStorage.getItem("accesstoken"),
          },
        }
      );
      if (response.status === 200) {
      // const response = await axiosReq({reqType:"get",})
        setUsers((prevUsers) => [...prevUsers, ...response.data.data]);
        setPage(response.data.pagination.nextPage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const checkdisplay=()=>{
    const abc = lastpage.is_displayed()
    console.log(abc)
  }

  useEffect(() => {
    GetUsers();
  }, []);

  return (
    <>
      {
        <Grid
          sx={{ justifyContent: "center", width: 1, marginTop: 3 }}
          container
          spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          columns={{ xs: 1, sm: 3, md: 3, lg: 4 }}
          
        >
          {users.map((user, index) => {
            return (
              <>
                <div key={index} ref={index == (user.length - 1) ? checkdisplay:null} >
                  <Card
                    key={user.userId}
                    name={user.name}
                    email={user.email}
                    avatar={user.avatar}
                  />
                </div>
              </>
            );
          })}
          {loading && <div>Loding...</div>}
        </Grid>
      }
    </>
  );
}
