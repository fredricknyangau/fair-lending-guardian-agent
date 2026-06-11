import axios from 'axios';
import { 
  LoanApplication, 
  AgentResult, 
  GuardCheckResult, 
  GraceData, 
  AuditLogEntry, 
  CycleMetrics 
} from '../types';

const client = axios.create({
  baseURL: '/api',
  timeout: 120000,
});

if (import.meta.env.DEV) {
  client.interceptors.request.use((config) => {
    console.log(`[DEV ONLY] API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  });
}

export const applyForLoan = async (data: LoanApplication): Promise<AgentResult> => {
  const response = await client.post<AgentResult>('/apply', data);
  return response.data;
};

export const checkGuard = async (message: string, features: Record<string, any>): Promise<GuardCheckResult> => {
  const response = await client.post<GuardCheckResult>('/guard-check', { message, features });
  return response.data;
};

export const getGraceData = async (): Promise<GraceData> => {
  const response = await client.get<GraceData>('/grace-data');
  return response.data;
};

export const getCounterfactual = async (occupation: string, sub_county: string): Promise<{routing_decision: string, score_impact: number}> => {
  const response = await client.get<{routing_decision: string, score_impact: number}>('/counterfactual', {
    params: { occupation, sub_county }
  });
  return response.data;
};

export const getAuditLog = async (): Promise<AuditLogEntry[]> => {
  const response = await client.get<AuditLogEntry[]>('/audit-log');
  return response.data;
};

export const getCycleMetrics = async (): Promise<CycleMetrics> => {
  const response = await client.get<CycleMetrics>('/cycle-metrics');
  return response.data;
};

export const getHealth = async (): Promise<{provider: string, model: string, status: string}> => {
  const response = await client.get<{provider: string, model: string, status: string}>('/health');
  return response.data;
};
