import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Standard API error structure
 */
export interface APIError {
  message: string;
  code?: string;
  status: number;
  details?: unknown;
}

/**
 * API Client class for centralized HTTP communication
 */
class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add request metadata
        config.metadata = {
          startTime: Date.now(),
          requestId: this.generateRequestId(),
        };

        // Add authentication header if token exists
        const token = this.getAuthToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        // Calculate request duration
        if (response.config.metadata) {
          const duration = Date.now() - (response.config.metadata as { startTime: number }).startTime;
          // Log request duration in development
          if (process.env.NODE_ENV === 'development') {
            console.log(
              `[API] ${response.config.method?.toUpperCase()} ${response.config.url} - ${duration}ms`
            );
          }
        }
        return response;
      },
      (error: AxiosError<unknown>) => {
        return Promise.reject(this.transformError(error));
      }
    );
  }

  /**
   * Transform Axios error to standard API error
   */
  private transformError(error: AxiosError<unknown>): APIError {
    const apiError: APIError = {
      message: 'An unexpected error occurred',
      status: error.response?.status || 0,
    };

    if (error.response) {
      // Server responded with error status
      const data = error.response.data as { message?: string; code?: string; details?: unknown };
      apiError.message = data?.message || `Request failed with status ${error.response.status}`;
      apiError.code = data?.code;
      apiError.details = data?.details;

      // Handle specific error statuses
      switch (error.response.status) {
        case 401:
          apiError.message = 'Authentication required. Please log in.';
          break;
        case 403:
          apiError.message = 'You do not have permission to perform this action.';
          break;
        case 404:
          apiError.message = 'The requested resource was not found.';
          break;
        case 500:
          apiError.message = 'Server error. Please try again later.';
          break;
      }
    } else if (error.request) {
      // Request was made but no response received
      apiError.message = 'Network error. Please check your connection.';
      apiError.status = 0;
    } else {
      // Error setting up the request
      apiError.message = error.message || 'Failed to make request.';
    }

    return apiError;
  }

  /**
   * Generate unique request ID
   */
  private generateRequestId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get authentication token from localStorage
   */
  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  /**
   * Generic GET request
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  /**
   * Generic POST request
   */
  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  /**
   * Generic PUT request
   */
  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  /**
   * Generic DELETE request
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  /**
   * Generic PATCH request
   */
  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }
}

// Export singleton instance
export const apiClient = new APIClient();

// Export class for testing
export { APIClient };

// Extend AxiosRequestConfig to include metadata
declare module 'axios' {
  interface AxiosRequestConfig {
    metadata?: {
      startTime: number;
      requestId: string;
    };
  }
}
