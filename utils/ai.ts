import { PromptTemplate } from 'langchain';
import {OpenAI} from 'langchain/llms/openai';
import {StructuredOutputParser} from 'langchain/output_parsers';
import z from 'zod'; // for schema related things

const analysisSchema = z
  .object({
    mood : z.string().describe('the mood of the person who wrote the journal entry.'),
    summary : z.string().describe('Quick summary of the entire entry.'),
    subject : z.string().describe('the subject of the journal entry'),
    negative : z.boolean().describe('is the journal entry negative? (i.e does it contain negative emotions?).'),
    color: z.boolean().describe('a hexadecimal color code the represents the mood of the entry. Example #0101fe for blue representing hapiness.'),
  });

const parser =  StructuredOutputParser.fromZodSchema(analysisSchema)

const getPrompt = async (content) => {
    const format_instructions = parser.getFormatInstructions() // we format the prompt in a json object etc etc
  
    const prompt = new PromptTemplate ({
      template:
        'Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',  // we are saying that we need it this way
      inputVariables: ['entry'], 
      partialVariables: { format_instructions }, // same name as we have to define it.
    })
  
    const input = await prompt.format({
      entry: content,
    })
  
    return input
  }

export const analyze = async (content)=>{
    const input = await getPrompt(content); // formatting  and calling the open AI via zod  
    console.log('entered analyze');
    const model = new OpenAI({temperature : 0, modelName: 'gpt-3.5-turbo'}) // basically here we are referencing which model we are using of chat gpt, temparature describes the top opinion from the pool ( 0 means more real ) basically 
    const result = await model.call(input);
    //console.log(result, 'this ai response');
    try {
        return parser.parse(result) // parsing the stringify to json using the zod parser
    } catch (error) {
        console.error(error)  // basically handling when parser fails to parse this might happen 
    }
}