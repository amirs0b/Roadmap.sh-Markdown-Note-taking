import {catchAsync, HandleERROR} from "vanta-api";
import {GoogleGenerativeAI} from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const checkGrammar = catchAsync(async (req, res, next) => {
    const {text} = req.body;

    if (!text) {
        return next(new HandleERROR("Please provide text to check", 400));
    }

    const model = genAI.getGenerativeModel({model: "gemini-2.5-flash-preview-05-20"});


    const prompt = `
        You are an expert English grammar and spelling checker.
        Analyze the following text and identify any grammatical errors, spelling mistakes, or punctuation issues.
        Respond ONLY with a valid JSON array of objects. Each object should have the following properties:
        - "type": (e.g., "Spelling", "Grammar", "Punctuation")
        - "original": The incorrect word or phrase from the text.
        - "suggestion": A suggested correction.
        - "explanation": A brief explanation of the error.
        
        If there are no errors, return an empty array [].
        
        Here is the text to analyze:
        ---
        ${text}
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const responseText = response.text();


        const corrections = JSON.parse(responseText);

        res.status(200).json({
            status: "success",
            data: {
                corrections
            }
        });

    } catch (error) {
        console.error("Error calling Gemini API or parsing JSON:", error);
        return next(new HandleERROR("Failed to check grammar due to an API error.", 500));
    }
});