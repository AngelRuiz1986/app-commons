import { REQUESTVALIDATIONTYPE, RequestValidationError } from '@Helpers/errors/types/RequestValidationError';

interface ValidationInput {
  value: any;
  name?: string;
  validOptions: any[]; // Agregamos validOptions aquí
}

export class ValidateIn {

  static validate(value: any, validOptions: any[]): boolean {
    if (Array.isArray(value)) {
      // Si es un array, validamos cada elemento
      return value.every(item => validOptions.includes(item));
    } else {
      // Si no es un array, validamos directamente el valor
      return validOptions.includes(value);
    }
  }

  static validateOrFail(input: ValidationInput): void {
    const { value, name, validOptions } = input; // Desestructuramos validOptions
    const variable = name || 'Value';
    
    if (!this.validate(value, validOptions)) {
      throw new RequestValidationError([{
        message: `${variable} is not one of the valid options: ${validOptions.join(', ')}`,
        field: variable,
        detail: `${variable} is not one of the valid options: ${validOptions.join(', ')}`,
        code: REQUESTVALIDATIONTYPE.is_invalid
      }]);
    }
  }
}