import {OpenAI} from 'langchain/llms/openai'

export const analyze = async (prompt)=>{
    console.log('entered analyze');
const model = new OpenAI({temperature : 0, modelName: 'gpt-3.5-turbo'}) // basically here we are referencing which model we are using of chat gpt
const result = await model.call(prompt);
console.log(result, 'this ai response');
}