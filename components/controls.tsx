"use client";

import { useState } from "react";

export default function Control({
    inputSize,
    setSettings,
}: {
    inputSize: number;
    setSettings: (depth: number, childCount: number) => void;
}) {
    const [depth, setDepth] = useState(1);
    const [childCount, setChildCount] = useState(2);

    return (
        <div className="flex flex-col gap-5 flex-1">
            <h2 className="font-bold">Settings</h2>
            <div>
                <label htmlFor="">Folder depth: </label>
                <br />
                <input
                    type="number"
                    min={0}
                    className="outline focus:outline-white p-1"
                    value={depth}
                    onChange={(e) => setDepth(e.target.valueAsNumber)}
                />
            </div>
            <div>
                <label htmlFor="">Child of each folders: </label>
                <br />
                <input
                    type="number"
                    min={0}
                    className="outline focus:outline-white p-1"
                    value={childCount}
                    onChange={(e) => setChildCount(e.target.valueAsNumber)}
                />
            </div>
            <p>Total folders (input size): {inputSize}</p>
            <button
                onClick={() => setSettings(depth, childCount)}
                className="bg-white text-black font-bold py-2 px-5 self-start hover:bg-zinc-200 active:bg-zinc-300 cursor-pointer"
            >
                Update
            </button>
        </div>
    );
}
