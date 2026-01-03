import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { code_snippet, language } = await request.json();
    
    if (!code_snippet || !code_snippet.trim()) {
      return Response.json(
        { error: "Code snippet cannot be empty" },
        { status: 400 }
      );
    }

    const prompt = `You are a strict senior software engineer performing a professional code review.

Analyze the following ${language} code.

Return ONLY valid JSON with this exact structure:

{
  "bugs": [
    {
      "line": 10,
      "severity": "high",
      "description": "Bug explanation",
      "suggestion": "How to fix it"
    }
  ],
  "optimizations": [
    {
      "line": 15,
      "type": "performance",
      "description": "Optimization opportunity",
      "suggestion": "Improved approach"
    }
  ],
  "best_practices": [
    {
      "category": "readability",
      "description": "Best practice recommendation"
    }
  ],
  "score": 0
}

Rules:
- Score must be from 0 to 100
- Be strict and realistic
- Use accurate line numbers
- If code quality is poor, score low
- Do NOT include markdown or explanations

Code:
${code_snippet}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert code reviewer." },
        { role: "user", content: prompt },
      ],
      temperature: 0.9,
    });

    let raw = response.choices[0].message.content.trim();
    
    if (raw.startsWith("```")) {
      raw = raw.split("```")[1].replace(/^json\s*/gm, "").trim();
    }
    
    const result = JSON.parse(raw);
    result.bugs = result.bugs || [];
    result.optimizations = result.optimizations || [];
    result.best_practices = result.best_practices || [];
    result.score = result.score || 70;
    
    return Response.json(result);
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

