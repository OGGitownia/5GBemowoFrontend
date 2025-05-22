export interface Message {
    id: string;
    question: string;
    answer: string;
    modelName: string;
    tuners: string[];
    askedAt: number;
    answeredAt?: number;
    answered: boolean;
    userId: number;
    chatId: string;
}
