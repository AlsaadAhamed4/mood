'use client'

import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

const Editor = ({ entry }) => {
    const [value, setValue] = useState(entry.content)
    const [loading, setLoading] = useState(false)
    //const [analysis, setAnalysis] = useState(entry.analysis)

    //const {mood, summary, color, subject, negative} = analysis  // sionce I added the analysis in query will get the data here
    const analysisData = [
        { name: 'Subject', value: '', },  // map the above desctructured value to this data. if you want to rethink for activating the open ai API
        { name: 'Summary', value: '', },
        { name: 'Mood', value: '', },
        { name: 'Negative', value: 'False', },
    ]

    useAutosave({
        // by default debounce is 2 sec we can pass interval property
        data: value,
        onSave: async (_value) => {  // changed value
            console.log(entry, _value)
            setLoading(true);
            const updated = await updateEntry(entry.id, _value)
            //setAnalysis(updated.analysis)
            setLoading(false);
        }
    })
    return (
        <div className="w-full h-full grid grid-cols-3">
            <div className="col-span-2">
                {loading && <div>Loading....</div>}
                <textarea className="w-full h-full p-8  text-xl outline-none" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
            <div className="col-span-1 border border-black/10">
                {/* Add the color using styles */}
                <div className="bg-blue-300 px-6 py-10">
                    <h2 className="text-2xl">Analysis</h2>
                </div>
                <div>
                    <ul>
                        {
                            analysisData.map((item) => (
                                <li className="px-2 py-4 border-b border-t border-black/10 flex items-center justify-between" key={item.name}>
                                    <span className="text-lg font-semibold">{item.name}</span>
                                    <span>{item.value}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Editor;