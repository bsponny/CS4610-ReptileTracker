import { useEffect, useState } from 'react'
import { HomePage } from './pages/Home';
import { DashboardPage } from './pages/Dashboard';
import { SignupPage } from './pages/Signup';

export const Router = () => {
  const [page, setPage] = useState(window.location.hash.replace('#', ''));


  // this synchronizes the application state with the browser location state
  useEffect(() => {
    window.location.hash = page
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
  }, [])

  // dynamically select which page to render based on application state
  let component = <div>Not found</div>
  if (page === "home" || page === "") component = <HomePage setPage={setPage} />
  else if (page === "dashboard") component = <DashboardPage />
  else if (page === "sign-up") component = <SignupPage />

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a onClick={() => setPage("home")}>Home</a></li>
            <li><a onClick={() => setPage("sign-up")}>Sign Up</a></li>
            <li><a onClick={() => setPage("login")}>Login</a></li>
            {/* <li><a href="#">Contact</a></li> */}
          </ul>
        </nav>
      </header>
      {component}
    </div>
  );
}

export default Router;