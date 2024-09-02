import {OpenAI} from 'langchain/llms/openai';
import {StructuredOutputParser} from 'langchain/output_parsers';
import z from 'zod'; // for schema related things

const analysisSchema = z
  .object({
    mood : z.string().describe('the mood of the person who wrote the journal entry.'),
    summary : z.string().describe('Quick summary of the entire entry.'),
    negative : z.boolean().describe('is the journal entry negative? (i.e does it contain negative emotions?).'),
    color: z.boolean().describe('a hexadecimal color code the represents the mood of the entry. Example #0101fe for blue representing hapiness.'),
  });

const parser =  StructuredOutputParser.fromZodSchema(analysisSchema)

export const analyze = async (prompt)=>{
    console.log('entered analyze');
const model = new OpenAI({temperature : 0, modelName: 'gpt-3.5-turbo'}) // basically here we are referencing which model we are using of chat gpt, temparature describes the top opinion from the pool ( 0 means more real ) basically 
const result = await model.call(prompt);
console.log(result, 'this ai response');
}