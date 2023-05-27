export const UnauthorizedError: string = 'unauthorized operation';
export const BadRequestError: string = 'bad request';
export const InternalServerError: string = 'internal server error';
export const UnknownStatusCode: string = 'unknown status code';

export interface Filter<T> {
    page: number
    pageSize: number
    target: T
}

export interface Results<T> {
    page: number;
    pageSize: number;
    count: number
    entries: T[]
}

export interface ServerResponse {
    message: string
};