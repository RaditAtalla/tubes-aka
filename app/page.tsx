"use client";

import Control from "@/components/controls";
import Terminal from "@/components/terminal";
import { useEffect, useState } from "react";

export default function Home() {
    const [settings, setSettings] = useState({ depth: 1, childCount: 2 });
    const [inputSize, setInputSize] = useState(0);

    useEffect(() => {
        setInputSize(
            (settings.childCount ** (settings.depth + 1) - 1) /
                (settings.childCount - 1)
        );
    }, [settings]);

    return (
        <div className="bg-zinc-900 w-screen min-h-screen p-16 flex flex-col gap-10">
            <Terminal inputSize={inputSize} />

            <div className="flex justify-around flex-1">
                <Control
                    inputSize={inputSize}
                    setSettings={(depth: number, childCount: number) =>
                        setSettings({ depth, childCount })
                    }
                />

                {/* Commands */}
                <div className="flex-1">
                    <h2 className="font-bold mb-5">List of Commands</h2>
                    <ul className="flex flex-col gap-2">
                        <li>
                            list -{" "}
                            <i>print a list of all folder at root level</i>
                        </li>
                        <li>
                            sortDesc - <i>sort the list in descending order</i>
                        </li>
                        <li>
                            sortAsc - <i>sort the list in ascending order</i>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
