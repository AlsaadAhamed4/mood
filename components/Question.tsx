'use client'
import { useState } from "react"

const Question = () => {
    const [value, setValue] = useState("")

    const handleOnChange = (e) => {
        e.preventDefault();
        setValue(e.target.value)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <input
                    className="border border-black/20 px-4 py-2 rounded-lg"
                    value={value} placeholder="Ask your question"
                    type="text"
                    onChange={handleOnChange} />
                <button type="submit" className="bg-blue-400 px-4 py-2 rounded-lg">Ask</button>
            </form>
        </div>
    )
}

export default Question;