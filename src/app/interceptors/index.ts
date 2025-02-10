import { authInterceptor } from "./auth.interceptor";

export const HttpInterceptorProviders = [
  authInterceptor
];
