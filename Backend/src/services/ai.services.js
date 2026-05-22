import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("a numerical score representing the overall match between the candidate's profile and the job requirements, typically on a scale from 0 to 100"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("the technical question asked during the interview"),
        intention: z.string().describe("the intention behind asking the question"),
        answer: z.string().describe("the candidate's answer to the technical question") 
    })).describe("a list of technical questions asked during the interview, along with the candidate's answers and the intention behind each question"),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("the behavioral question asked during the interview"),
        intention: z.string().describe("the intention behind asking the question"),
        answer: z.string().describe("the candidate's answer to the behavioral question")
    })).describe("a list of behavioral questions asked during the interview, along with the candidate's answers and the intention behind each question"),

    skillGaps: z.array(z.object({
        skill: z.string().describe("the specific skill gap identified during the interview"),
        severity: z.enum(['low', 'medium', 'high']).describe("the severity of the skill gap, categorized as low, medium, or high")
    })).describe("a list of skill gaps identified during the interview, along with their severity"),

    preparationTips: z.array(z.object({
        day: z.number().describe("the specific day in the preparation timeline for which the tip is relevant"),
        focus: z.string().describe("the specific area of focus for that day, such as technical skills, behavioral skills, or overall interview strategy"),
        tasks: z.string().describe("the specific tasks or activities the candidate should undertake on that day to prepare effectively for the interview")
    })).describe("a list of preparation tips for the candidate, organized by day, with a focus area and specific tasks to complete each day leading up to the interview")
})


export async function generateInterviewReport({
  jobDescription,
  resume,
  selfDescription,
}) {

 
    const prompt = `Generate a interview report for a candidate based on the following details. The report should include an overall match score, a list of technical and behavioral questions that could be asked in the interview along with their intentions and ideal answers, identified skill gaps with severity levels, and a day-by-day preparation plan with specific focus areas and tasks.:
    Resume: ${resume}
    Job Description: ${jobDescription}
    Self Description: ${selfDescription}
    `

   const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config:{
        responseMimeType: "application/json",
        responseJsonSchema: zodToJsonSchema(interviewReportSchema)
    }
   })

   console.log(response.text);
}
