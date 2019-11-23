import React, {FC} from 'react';
import {VideoPlayer} from "@xilab/components-media";
import {ThemeProvider} from "styled-components";
import {Default} from "@xilab/themes";
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {WatchPage} from "./page/WatchPage";
import {UploadPage} from "./page/UploadPage";

console.log("default theme is", Default);

const App: FC = () => {
    return (
        <ThemeProvider theme={Default}>
            <BrowserRouter>
                <Switch>
                    <Route path="/watch/:id">
                        <WatchPage />
                    </Route>
                    <Route path="/upload">
                        <UploadPage />
                    </Route>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    )
};

export default App;
