export interface IScanner {
    code: string;
    operation: 'EMIT' | 'ENTER' | 'AUTOCLEAN'
}