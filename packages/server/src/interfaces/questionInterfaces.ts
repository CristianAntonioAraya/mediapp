export interface IQuestion {
    _id?: string;
    statement: string;
    alternative1: string;
    score1: number;
    alternative2: string;
    score2: number;
    alternative3: string;
    score3: number;
    createdAt?: string;
    updatedAt?: string;
}
