//NOTE "Authorization(Logging In)"
import { Card, Form, Button, Alert } from "react-bootstrap";
import {useState} from 'react';
import { authenticateUser } from "@/lib/authenticate";
import { useRouter } from "next/router";

import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { searchHistoryAtom } from "@/store";
import { getFavourites } from "@/lib/userData";
import { getHistory } from "@/lib/userData";


export default function Login(props){

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  //warning message
  const [warning, setWarning] = useState("");
  const router = useRouter();

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function handleSubmit(e){
    e.preventDefault();
    try {
      await authenticateUser(userName, password);
      await updateAtoms();
      router.push('/favourites');
    } catch(err){
      setWarning(err.message);
    }
  }

  //updates both the favourites and history
  async function updateAtoms(){
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  return (
    <>
      <br />
      <Card bg="light">
        <Card.Body><h2>Login</h2>Enter your login information below:</Card.Body>
      </Card>

      <br />
      <Form onSubmit={handleSubmit}>

        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control value={userName} onChange={e => setUserName(e.target.value)} 
                        type="text" id="userName" name="userName" />
        </Form.Group>
        <br />

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control value={password} onChange={e=>setPassword(e.target.value)} 
                        type="password" id="password" name="password" />
        </Form.Group>
        <br />

        <Button variant="primary" className="pull-right" type="submit">Login</Button>

        <br />
        { warning && ( <><br /><Alert variant="danger">{warning}</Alert></> )}
      </Form>
    </>
  );
}