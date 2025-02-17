import { useEffect, useState, useRef, useCallback } from "react";
import Card from "./card";
import Grid from "@mui/material/Grid2";
import axios from "axios";

export default function CardList() {

  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); 
  const observer = useRef(); 

  // Fetch users
  const GetUsers = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/user?page=${page}`
      );

      if (response.status === 200) {
        setUsers((prevUsers) => [...prevUsers, ...response.data]);
        setPage((prevPage) => prevPage + 1);

        if (response.data.length === 0) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Infinite Scroll
  const lastUserRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          GetUsers();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    GetUsers();
  }, []);
  
  return (
    <>
      {
        <Grid
          sx={{ justifyContent: "center", width: 1, marginTop: 3 }}
          container
          spacing={{sx:1,sm:2,md:3,lg:4}}
          columns={{ xs: 1, sm: 3, md: 3, lg: 4 }}
        >
          {users.map((user, index) => {
            return (
              <>
                <div ref={index === users.length - 1 ? lastUserRef : null}>
                  <Card key={user.userId} name={user.name} email={user.email} />
                </div>
              </>
            );
          })}
        </Grid>
      }
    </>
  );
}
