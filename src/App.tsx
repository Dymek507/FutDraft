import React, { useEffect, lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, createHashRouter } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { uiActions } from "./store/ui-slice";
import { doc, getDoc } from "@firebase/firestore";
import loadable from '@loadable/component'
import { createTheme, LinearProgress, ThemeProvider } from "@mui/material";
import { db } from "./firebaseConfig";
import { useAppDispatch } from "./store/app/hooks";
import { logOut } from "./store/ui-actions";

import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// import HomeScreen from "./pages/Home/HomeScreen";
import NewPacks from "./pages/Packs/NewPacks";
import MyPacks from "./pages/Packs/MyPacks";
// import MyPlayers from "./pages/MyPlayers/MyPlayers";
import SquadPage from "./pages/Squad/SquadPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Login/RegisterPage";
// import Admin from "./pages/Admin/Admin";
import Layout from "./layouts/Layout";

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: React.CSSProperties['color'];
    };
  }

  interface BreakpointOverrides {
    xxs: true;
  }

  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }

  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }



}

const HomeScreen = loadable(() => import('./pages/Home/HomeScreen'))
const MyPlayers = loadable(() => import('./pages/MyPlayers/MyPlayers'))
const Admin = loadable(() => import('./pages/Admin/Admin'))

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: "new-packs", element: <NewPacks /> },
      { path: "my-packs", element: <MyPacks /> },
      { path: "my-players", element: <MyPlayers /> },
      { path: "squad", element: <SquadPage /> },
      { path: "admin", element: <Admin /> },
      {
        path: "/account",
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  const dispatch = useAppDispatch();
  const auth = getAuth();


  const fetchUserData = async (uId: string) => {
    if (uId !== null) {
      const userDocRef = doc(db, `users/${uId}`);
      try {
        const userDoc = await getDoc(userDocRef);

        const userData = userDoc.data();

        dispatch(
          uiActions.login({
            logged: true,
            userData: {
              login: userData?.login,
              uId: uId,
              money: userData?.money,
              result: userData?.results,
              goals: userData?.goals,
            },
          })
        );
      } catch (error) {
        console.log("Błąd" + error);
      }
    }
  };

  useEffect(() => {
    const authentication = onAuthStateChanged(auth, async (user) => {
      if (user !== null) {
        const uid = user?.uid;
        if (uid) {
          await fetchUserData(uid);
        }
      } else {
        dispatch(logOut);
      }
    });

    return authentication();
  }, [auth, dispatch]);



  const theme = createTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "rgba(12,52,86,0.85)",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f50057",
        dark: "#ad0340",
        contrastText: "#fff",
      },
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
    },
    breakpoints: {
      values: {
        xxs: 0,
        xs: 420,
        sm: 640,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<div className="w-screen">
          <LinearProgress />
        </div>}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </>
  );
}

export default App;
