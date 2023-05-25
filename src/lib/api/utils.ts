export const UnauthorizedError: string = 'unauthorized operation';
export const BadRequestError: string = 'bad request';
export const InternalServerError: string = 'internal server error';
export const UnknownStatusCode: string = 'unknown status code';


export interface ServerResponse {
    message: string
};