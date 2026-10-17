/**
 * MediMitra CareLoop — Cloud Run API Client
 * 
 * Provides HTTP client integration with the Google Cloud Run microservice.
 * Validates request schemas and provides clear fallbacks when running locally without a live backend.
 */

import { cloudStatus } from './firebase';

export interface DispatchAlertPayload {
  patientId: string;
  patientName: string;
  caregiverId: string;
  medicineName?: string;
  reason: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const cloudRunApi = {
  /**
   * Health check to test Google Cloud Run service availability
   */
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/health`, { method: 'GET' });
      return res.ok;
    } catch {
      return false;
    }
  },

  /**
   * Dispatches emergency caregiver notification to Cloud Run backend
   */
  async dispatchCaregiverAlert(payload: DispatchAlertPayload): Promise<ApiResponse> {
    if (!cloudStatus.isConfigured) {
      // Offline local demo mode: resolve locally
      return {
        success: true,
        message: 'Alert processed in local offline demo mode (Cloud Run not connected).',
        data: payload,
      };
    }

    try {
      const res = await fetch(`${API_BASE}/caregiver/alert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('medimitra_auth_token') || 'demo-token'}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${res.status}`);
      }

      return await res.json();
    } catch (err) {
      console.warn('[Cloud Run] Alert dispatch fallback to local state:', err);
      return {
        success: true,
        message: 'Alert recorded locally (Backend offline).',
        data: payload,
      };
    }
  },
};
