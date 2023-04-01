import { useEffect, useState } from 'react'
import { HomePage } from './pages/Home';
import { DashboardPage } from './pages/Dashboard';
import { SignupPage } from './pages/Signup';
import { useAuth } from './hooks/useAuth';
import { useApi } from './hooks/useApi';
import { LoginPage } from './pages/login';
import { RouterProvider,  createBrowserRouter } from 'react-router-dom';
import { serialize } from 'v8';

export const Router = () => {
  const [page, setPage] = useState(window.location.hash.replace('#', ''));
  const { token, setToken} = useAuth();


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
    
    // setToken(useApi());
  }, [])

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/home",
      element: <HomePage />
    },
    {
      path: "/sign-up",
      element: <SignupPage />
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/dashboard",
      element: <DashboardPage />
    }
  ]);

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
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
          </ul>
        ) : (
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/sign-up">Sign Up</a></li>
            <li><a href="/login">Login</a></li>
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
      <RouterProvider router={routes} />
    </div>
  );
}

export default Router;