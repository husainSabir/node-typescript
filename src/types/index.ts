// Add your custom types here
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
  timestamp: string;
}

