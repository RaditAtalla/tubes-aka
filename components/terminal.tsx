"use client";

import { useState } from "react";

export default function Terminal({
    settings,
}: {
    settings: { depth: number; childCount: number };
}) {
    const [history, setHistory] = useState<{
        commands: string[];
        results: string[];
    }>({ commands: [], results: [] });
    const [input, setInput] = useState("");

    function addHistory(input: string, data: any) {
        if (input != "" && data) {
            setHistory((prev) => ({
                commands: [...prev.commands, input],
                results: [...prev.results, data],
            }));
            setInput("");
        }
    }

    function executeCommand(command: string) {
        switch (command) {
            case "list":
                const temp: string[] = [];
                for (let i = 1; i <= settings.childCount; i++) {
                    temp.push("folder " + i + " - ");
                }

                addHistory(command, temp);
                break;

            case "meow":
                addHistory(command, "folder B");
                break;

            default:
                addHistory(command, "Unknown command");
                break;
        }
    }

    return (
        <div className="flex-1">
            <div className="border border-white h-full flex flex-col gap-5 p-5">
                <h1 className="font-bold">Basic Terminal</h1>

                <div className="flex flex-col gap-2">
                    {history.commands.map((_, index) => (
                        <div key={index}>
                            <p>
                                <span className="font-bold">@</span>{" "}
                                {history.commands[index]}
                            </p>
                            <p key={index}>
                                <span className="font-bold">@</span>{" "}
                                {history.results[index]}
                            </p>
                        </div>
                    ))}
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
                            if (e.key == "Enter") executeCommand(input);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
