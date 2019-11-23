import React, {FC} from "react";
import {VideoPlayer} from "@xilab/components-media/dist";

export const WatchPage: FC = props => {
    return (
        <VideoPlayer width={720} height={405}>
            <source src="http://dl5.webmfiles.org/big-buck-bunny_trailer.webm" />
        </VideoPlayer>
    );
};