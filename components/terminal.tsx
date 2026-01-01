"use client";

import { useEffect, useState } from "react";

export default function Terminal({ inputSize }: { inputSize: number }) {
    const [input, setInput] = useState("");
    const [folder, setFolder] = useState<string[]>([]);
    const [history, setHistory] = useState<(string | string[])[]>([]);

    useEffect(() => {
        const folders = [];
        let ascii = 65;
        for (let i = 0; i < inputSize; i++) {
            folders.push("Folder " + String.fromCharCode(ascii++));
        }

        setFolder(folders);
    }, [inputSize]);

    function executeCommand() {
        switch (input) {
            case "list":
                setHistory((prev) => [...prev, input, folder]);
                console.log(folder);
                break;

            default:
                break;
        }

        setInput("");
    }

    return (
        <div className="flex-1">
            <div className="border border-white h-full flex flex-col gap-5 p-5">
                <h1 className="font-bold">Basic Terminal</h1>

                <div className="flex flex-col gap-2">
                    {/* [A, [B, C, [D, E]]] */}
                    {history.map((item, i) => {
                        if (typeof item != "string") {
                            return item.map((h, j) => {
                                return <p key={j}>{h}</p>;
                            });
                        } else {
                            return <p key={i}>{item}</p>;
                        }
                    })}
                </div>

                <div className="flex">
                    <p className="font-bold">@</p>
                    <input
                        type="text"
                        placeholder="Enter command here..."
                        autoFocus
                        id="input-field"
                        className="focus:outline-none flex-1 ps-2"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") executeCommand();
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
