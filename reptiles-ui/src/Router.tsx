import { useEffect, useState } from 'react'
import { HomePage } from './pages/Home';
import { DashboardPage } from './pages/Dashboard';
import { SignupPage } from './pages/Signup';
import useToken from './components/Auth';

export const Router = () => {
  const [page, setPage] = useState(window.location.hash.replace('#', ''));
  const { token, setToken} = useToken();


  // this synchronizes the application state with the browser location state
  useEffect(() => {
    window.location.hash = page;
  }, [page])

  // this synchronizes the browser location state with our application state
  useEffect(() => {
    const hashChange = () => {
      setPage(window.location.hash.replace('#', ''));
    }
    window.addEventListener("hashchange", hashChange);

    return () => {
      window.removeEventListener("hashchange", hashChange);
    }
    
    setToken(useToken());
  }, [])

  // dynamically select which page to render based on application state
  let component = <div>Not found</div>
  if (page === "home" || (page === "" && !token)) component = <HomePage setPage={setPage} />
  else if (page === "dashboard" || (page === "" && token)) component = <DashboardPage setPage={setPage} token={token}/>
  else if (page === "sign-up") component = <SignupPage setToken={setToken} setPage={setPage} token={token}/>

  const logout = () => {
    setToken("");
    window.location.reload;
  };

  return (
    <div>
      <header>
        <nav className="navbar">
        {token ? (
          <ul>
            <li><a onClick={() => setPage("home")}>Home</a></li>
            <li><a href="#">Dashboard</a></li>
          </ul>
        ) : (
          <ul>
            <li><a onClick={() => setPage("home")}>Home</a></li>
            <li><a onClick={() => setPage("sign-up")}>Sign Up</a></li>
            <li><a onClick={() => setPage("login")}>Login</a></li>
          </ul>
        ) }
        { token ? (
          <ul className="right-side">
            <li><a onClick={() => logout()}>logout</a></li>
          </ul>
        ) : (
          ""
        )

        }
        </nav>
      </header>
      {component}
    </div>
  );
}

export default Router;