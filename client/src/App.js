import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

function App() {
  const { email, setEmail } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("http://localhost:4000/user", { withCredentials: true })
      .then((response) => {
        setEmail(response.data.email);
      });
  }, []);
  //it will run only once , coz the dependency array is empty

  function logout() {
    axios
      .post("http://localhost:4000/logout", {}, { withCredentials: true })
      .then(() => {
        setEmail("");
        // console.log(email);
      });
  }

  return (
    <div>
      <div>
        <h3>Authentication Page using NodeJS & JsonWebTokens (JWT)</h3>
      </div>
      <hr />
      <div>
        {!!email && (
          <div>
            Logged in as {email} |
            <button onClick={() => logout()}>LogOut</button>
          </div>
        )}
        {!email && <div>Not Logged in</div>}
        {/* bt now problem is , that if we are refreshing the page, we loses our state , and logged out of page--> now to solve this */}
      </div>
      <hr />
      <div>
        <Link to={"/"}>Home</Link> |<Link to={"/login"}>Login</Link> |
        <Link to={"/register"}>Register</Link>
        <hr />
      </div>
      <Routes>
        <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/register"} element={<Register />} />
        <Route exact path={"/login"} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
