"use client";

import React, { useEffect, useState } from "react";

export default function Terminal({
    settings,
    inputSize,
}: {
    settings: { depth: number; childCount: number };
    inputSize: number;
}) {
    const [input, setInput] = useState("");
    const [folder, setFolder] = useState<string[]>([]);
    const [history, setHistory] = useState<string[]>([]);

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
                setHistory(folder);
                break;

            default:
                break;
        }

        setInput("");
    }

    function renderTree(index: number, depth: number) {
        if (index >= history.length) return null;

        const children = Array.from({length: settings.childCount}, (_, n) => settings.childCount * index + (n + 1));

        return (
            <React.Fragment key={index}>
                <p style={{ paddingLeft: 32 * depth }}>{history[index]}</p>
                {children.map(childIndex => (
                    renderTree(childIndex, depth + 1)
                ))}
            </React.Fragment>
        );
    }

    return (
        <div className="flex-1">
            <div className="border border-white h-full flex flex-col gap-5 p-5">
                <h1 className="font-bold">Basic Terminal</h1>

                <div className="flex flex-col gap-2">{renderTree(0, 0)}</div>

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
