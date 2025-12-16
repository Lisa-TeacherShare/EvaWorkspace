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
 * Generates a structured lesson plan by calling the backend API.
 */
export const generateLessonPlan = async (topic: string, subject: string, level: string, duration: string): Promise<LessonPlan> => {
    try {
        const response = await fetch('/api/ai/lesson-plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add auth headers if needed, usually handled by interceptor
            },
            body: JSON.stringify({ topic, subject, level, duration }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate lesson plan');
        }

        return await response.json();
    } catch (error) {
        console.error('Error generating lesson plan:', error);
        throw error;
    }
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
