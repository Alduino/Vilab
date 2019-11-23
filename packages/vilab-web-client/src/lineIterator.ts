export default async function* lineIterator(response: Response) {
    if (response.body === null) throw new TypeError("Response body is null");

    const decoder = new TextDecoder("utf-8");
    const reader = response.body.getReader();
    let {value: chunk, done: readerDone} = await reader.read();
    let decodedChunk = chunk ? decoder.decode(chunk) : "";

    const matcher = /\n|\r|\r\n/gm;

    let startIndex = 0;

    for (;;) {
        const result = matcher.exec(decodedChunk);

        if (!result) {
            if (readerDone) break;

            const remainder = decodedChunk.substr(startIndex);
            ({value: chunk, done: readerDone} = await reader.read());
            decodedChunk = remainder + (chunk ? decoder.decode(chunk) : "");
            startIndex = matcher.lastIndex = 0;
            continue;
        }

        yield decodedChunk.substring(startIndex, result.index);
        startIndex = matcher.lastIndex;
    }

    if (startIndex < decodedChunk.length) {
        // last line didn't end with a newline
        yield decodedChunk.substr(startIndex);
    }
}