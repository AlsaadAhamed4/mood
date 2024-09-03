'use client'
import { askQuestion } from "@/utils/api"
import { useState } from "react"

const Question = () => {
    const [value, setValue] = useState("")
    const [loading, setLoading] = useState(false)
    const [response, setAnswer] = useState()

    const handleOnChange = (e) => {
        e.preventDefault()
        setValue(e.target.value)
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const answer = await askQuestion(value)
        setAnswer(answer)
        setValue('')
        setLoading(false)

    }

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <input
                    disabled={loading}
                    className="border border-black/20 px-4 py-2 rounded-lg"
                    value={value} placeholder="Ask your question"
                    type="text"
                    onChange={handleOnChange} />
                <button disabled={loading} type="submit" className="bg-blue-400 px-4 py-2 rounded-lg">Ask</button>
            </form>
            {loading && <div>Loading....</div>}
            {response && <div>{response}</div>}
        </div>
    )
}

export default Question;