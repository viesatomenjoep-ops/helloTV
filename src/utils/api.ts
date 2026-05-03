import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-1db0fc10`;

async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`API Error on ${endpoint}:`, error);
    throw new Error(`API request failed: ${error}`);
  }

  return response.json();
}

export const api = {
  // Dashboard
  getDashboardStats: () => apiFetch('/dashboard/stats'),

  // CRM
  getCustomers: () => apiFetch('/crm/customers'),
  createCustomer: (data: any) => apiFetch('/crm/customers', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateCustomer: (id: string, data: any) => apiFetch(`/crm/customers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // Quotes
  getQuotes: () => apiFetch('/quotes'),
  createQuote: (data: any) => apiFetch('/quotes', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateQuote: (id: string, status: string) => apiFetch(`/quotes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  }),

  // Orders
  getOrders: () => apiFetch('/orders'),
  createOrder: (data: any) => apiFetch('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateOrder: (id: string, status: string) => apiFetch(`/orders/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  }),

  // Inventory
  getInventory: () => apiFetch('/inventory'),
  createInventoryItem: (data: any) => apiFetch('/inventory', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateInventoryItem: (id: string, data: any) => apiFetch(`/inventory/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // Sales
  getSalesPerformance: () => apiFetch('/sales/performance'),
  recordSale: (data: any) => apiFetch('/sales', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Staff
  getStaff: () => apiFetch('/staff'),
  createStaff: (data: any) => apiFetch('/staff', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Notifications
  testNotification: () => apiFetch('/notifications/test', { method: 'POST' }),
  getNotifications: () => apiFetch('/notifications'),
};
