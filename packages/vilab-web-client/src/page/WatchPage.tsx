import React, {FC, useEffect, useState} from "react";
import {VideoPlayer} from "@xilab/components-media";
import styled from "styled-components";
import {useParams} from "react-router-dom";

interface RouteParams {
    id: string;
}

interface Video {
    id: string;
    title: string;
    description: string;
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 1.62fr 1fr;
    grid-template-rows: auto auto 1fr;
    grid-column-gap: 1em;
    grid-row-gap: 1em;
`;

const Header = styled.h1`
    font: ${props => props.theme.font.header};
    font-size: 1.5em;
    
    grid-column: 1;
    grid-row: 1;
`;

const Video = styled(VideoPlayer)`
    grid-column: 1;
    grid-row: 2;
`;

const Description = styled.div`
    grid-area: 3 / 1 / 4 / 2;
    
    font: ${props => props.theme.font.body};
    
`;

// TODO make comments component
const Comments = styled.div`
    grid-area: 1 / 2 / 4 / 3;
`;

export const WatchPage: FC = props => {
    const {id} = useParams<RouteParams>();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const videoPath = `https://localhost:5001/api/video/${id}/content/1080`;

    useEffect(() => {
        if (title) return;
        fetch("https://localhost:5001/api/video/" + id)
            .then(data => data.json() as Promise<Video>)
            .then(data => {
                setTitle(data.title);
                setDescription(data.description);
            });
    });

    return (
        <Container>
            <Header>{title}</Header>
            <Video>
                <source src={videoPath} />
            </Video>
            <Description>{description}</Description>
            <Comments>
                <p>Hello!</p>
            </Comments>
        </Container>
    );
};