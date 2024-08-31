'use client'

import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

const Editor = ({ entry }) => {
    const [value, setValue] = useState(entry.content)
    const [loading, setLoading] = useState(false)
    useAutosave({
        // by default debounce is 2 sec we can pass interval property
        data: value,
        onSave: async (_value) => {  // changed value
            console.log(entry, _value)
            setLoading(true);
            const updated = await updateEntry(entry.id, _value)
            setLoading(false);
        }
    })
    return (
        <div className="w-full h-full">
            {loading && <div>Loading....</div>}
            <textarea className="w-full h-full p-8  text-xl outline-none" value={value} onChange={(e) => setValue(e.target.value)} />

        </div>
    )
}
export default Editor;