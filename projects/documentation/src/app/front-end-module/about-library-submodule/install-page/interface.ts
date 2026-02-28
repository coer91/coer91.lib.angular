export interface IStep {
    title: string;
    target: string;
    image: string;
    directions: string[];
    codes: { 
        copyMessage: string;
        description: string;
        code: string;
    }[]
}