import React, {FC} from 'react';
import {VideoPlayer} from "@xilab/components-media";
import {ThemeProvider} from "styled-components";
import {Default} from "@xilab/themes";

console.log("default theme is", Default);

const App: FC = () => {
    return (
        <ThemeProvider theme={Default}>
            <VideoPlayer width={720} height={405}>
                <source src="http://dl5.webmfiles.org/big-buck-bunny_trailer.webm" />
            </VideoPlayer>
        </ThemeProvider>
    )
};

export default App;
