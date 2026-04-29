"use client";

import { useState } from "react";

export default function DismissibleBanner({ message }: { message: string }) {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div className="fixed top-28 right-10 z-50 flex items-center gap-3 text-green-400 text-sm py-3 bg-green-900/30 rounded-lg border border-green-700/50 px-4">
            <span>{message}</span>
            <button
                onClick={() => setVisible(false)}
                className="text-green-400 hover:text-green-200 transition-colors text-lg leading-none"
                aria-label="Dismiss"
            >
                &times;
            </button>
        </div>
    );
}
