import React, {FC, useCallback, useRef, useState} from "react";
import styled from "styled-components";
import lineIterator from "../lineIterator";

const Header = styled.h1`
    font: ${props => props.theme.font.header};
    font-size: 1.6em;
`;

export const UploadPage: FC = props => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const file = useRef<HTMLInputElement>(null);

    const upload = useCallback(async () => {
        if (file.current === null) return;
        if (file.current.files === null) return;

        console.log("init video");
        const {video, uploadUrl}: {video: string, uploadUrl: string} =
            await fetch(new Request("https://localhost:5001/api/video", {
                method: "POST",
                body: JSON.stringify({title, description}),
                headers: {
                    "Content-Type": "application/json"
                }
            })).then(res => res.json());

        // send the file to uploadUrl
        console.log("upload video");
        const response = await fetch(new Request("https://localhost:5001" + uploadUrl, {
            method: "POST",
            body: file.current.files[0]
        }));
        for await (const line of lineIterator(response)) {
            const progress = parseFloat(line);
            console.log(progress);
        }
        console.log("done");

    }, [title, description]);

    return (
        <>
            <Header>Upload</Header>
            /* TODO add input component to forms */
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
            <input type="file" ref={file} />
            <button onClick={upload}>Upload</button>
        </>
    );
};