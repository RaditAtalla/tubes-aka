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
    const [folder, setFolder] = useState<any>([]);
    const [history, setHistory] = useState<any>([]);

    useEffect(() => {
        const folders = [];
        for (let i = 0; i < inputSize; i++) {
            const randomAscii = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
            folders.push("Folder " + String.fromCharCode(randomAscii));
        }

        setFolder(folders);
    }, [inputSize]);

    function executeCommand() {
        switch (input) {
            case "list":
                setHistory(folder)
                break;

            case "sort_recursive":
                setFolder(sortRecursive(treeAsArray(folder)).flat())
                break;

            case "sort_iterative":
                setFolder(sortIterative(treeAsArray(folder)).flat())
                break;

            default:
                break;
        }

        setInput("");
    }

    function renderTree(index: number, depth: number) {
        if (index >= history.length) return null;

        const children = Array.from(
            { length: settings.childCount },
            (_, n) => settings.childCount * index + (n + 1)
        );

        return (
            <React.Fragment key={index}>
                <p style={{ paddingLeft: 32 * depth }}>{history[index]}</p>
                {children.map((childIndex) =>
                    renderTree(childIndex, depth + 1)
                )}
            </React.Fragment>
        );
    }

    function treeAsArray(arr: string[]) {
        const result: (string | string[])[] = [arr[0]];

        for (let i = 1; i < arr.length; i += settings.childCount) {
            const pair = arr.slice(i, i + settings.childCount);
            result.push(pair);
        }

        return result;
    }

    function sortRecursive(arr: (string | string[])[]): any {
        return arr.map((item) => {
            if (Array.isArray(item)) {
                return [...item].sort((a, b) =>
                    String(a).localeCompare(String(b))
                );
            }

            return item;
        });
    }

    function sortIterative(arr: (string | string[])[]): any {
        const result = [...arr];

        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            if (Array.isArray(item)) {
                result[i] = [...item].sort((a, b) =>
                    String(a).localeCompare(String(b))
                );
            }
        }
        return result;
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
