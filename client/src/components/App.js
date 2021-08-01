import React, { Suspense, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "utils/theme";

import NaviBar from "./views/NaviBar/NaviBar";
import Menu from "./views/Menu/Menu";
import MainContent from "./views/MainContent/MainContent";

import { useDispatch } from "react-redux";
import { setBooks } from "_actions/books_actions.js";
import { loadSessionData } from "_actions/user_actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBooks());
    dispatch(loadSessionData());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<div>Loading...</div>}>
        <NaviBar />
        <div className="content">
          <Menu />
          <MainContent />
        </div>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
