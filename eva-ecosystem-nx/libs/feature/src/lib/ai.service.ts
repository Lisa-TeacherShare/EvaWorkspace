// Filename: libs/feature/src/lib/ai.service.ts

export interface AIAction {
    type: 'WARNING_LETTER' | 'CREATE_TEST' | 'UNKNOWN';
    payload?: any;
    response: string;
}

/**
 * Simulates parsing a natural language command using an AI model.
 * @param input The user's command string.
 * @returns A promise resolving to an AIAction.
 */
export interface LessonPlan {
    topic: string;
    subject: string;
    level: string;
    duration: string;
    objectives: string[];
    materials: string[];
    introduction: string;
    mainActivity: string;
    assessment: string;
}

/**
 * Simulates generating a structured lesson plan.
 */
export const generateLessonPlan = async (topic: string, subject: string, level: string, duration: string): Promise<LessonPlan> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
        topic,
        subject,
        level,
        duration,
        objectives: [
            `Understand the core concepts of ${topic}.`,
            `Apply ${topic} to real-world scenarios.`,
            `Analyze different aspects of ${topic}.`
        ],
        materials: [
            'Whiteboard and markers',
            'Projector (optional)',
            'Student textbooks',
            'Worksheets'
        ],
        introduction: `Begin by asking students what they already know about ${topic}. Write their answers on the board to create a mind map. Introduce the key vocabulary for the lesson.`,
        mainActivity: `Divide students into small groups. Assign each group a sub-topic related to ${topic}. Have them research and present their findings to the class. Facilitate a discussion on the connections between the sub-topics.`,
        assessment: `Distribute a short quiz with 5 multiple-choice questions to assess understanding. Assign a homework task where students must write a one-page summary of what they learned about ${topic}.`
    };
};

export const parseCommand = async (input: string): Promise<AIAction> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('warning') || lowerInput.includes('letter') || lowerInput.includes('debt')) {
        return {
            type: 'WARNING_LETTER',
            response: `SUBJECT: URGENT - OUTSTANDING SCHOOL FEES

Dear Parent/Guardian,

We noticed that your ward's school fees for the current term remain unpaid. 
Please be advised that access to the upcoming CBT exams will be restricted until the balance is cleared.

Kindly treat as urgent.

Signed,
The Bursar.`
        };
    }

    if (lowerInput.includes('test') || lowerInput.includes('exam') || lowerInput.includes('question')) {
        return {
            type: 'CREATE_TEST',
            response: `Generated Physics Test (JSS1):

1. What is the unit of Force?
   A) Joule  B) Newton  C) Watt  D) Pascal

2. Which of these is a scalar quantity?
   A) Velocity  B) Acceleration  C) Speed  D) Displacement

3. Define Matter.

(7 more questions generated...)`
        };
    }

    if (lowerInput.includes('lesson') || lowerInput.includes('plan')) {
        return {
            type: 'UNKNOWN', // For now, direct them to the dedicated page
            response: "To generate a detailed lesson plan, please use the 'Lesson Architect' module from the sidebar."
        };
    }

    return {
        type: 'UNKNOWN',
        response: "I'm sorry, I didn't understand that command. Try 'Generate warning letter' or 'Create a physics test'."
    };
};
