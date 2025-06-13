import { supabase } from './supabase';

// Mock API functions for demonstration
export const userApi = {
  async getCurrentUser() {
    return null;
  },

  async updateProfile(userId: string, updates: any) {
    return {};
  },

  async updateWalletBalance(userId: string, amount: number) {
    return;
  }
};

export const specializationsApi = {
  async getAll() {
    return [];
  },

  async getPopular() {
    return [];
  }
};

export const doctorsApi = {
  async getAll(limit?: number) {
    return [];
  },

  async getBySpecialization(specializationId: string) {
    return [];
  },

  async getById(id: string) {
    return null;
  },

  async getTopRated(limit: number = 5) {
    return [];
  }
};

export const diagnosticCentersApi = {
  async getAll() {
    return [];
  },

  async getById(id: string) {
    return null;
  },

  async getNearby(city: string, limit: number = 10) {
    return [];
  }
};

export const testsApi = {
  async getByCenter(centerId: string) {
    return [];
  },

  async getPopular(limit: number = 10) {
    return [];
  },

  async search(query: string) {
    return [];
  }
};

export const appointmentsApi = {
  async create(appointment: any) {
    return {};
  },

  async getUserAppointments(userId: string) {
    return [];
  },

  async updateStatus(id: string, status: string) {
    return;
  }
};

export const testBookingsApi = {
  async create(booking: any) {
    return {};
  },

  async getUserBookings(userId: string) {
    return [];
  }
};

export const transactionsApi = {
  async create(transaction: any) {
    return {};
  },

  async getUserTransactions(userId: string, limit?: number) {
    return [];
  }
};

export const reviewsApi = {
  async create(review: any) {
    return {};
  },

  async getDoctorReviews(doctorId: string, limit?: number) {
    return [];
  },

  async getCenterReviews(centerId: string, limit?: number) {
    return [];
  }
};

export const donationsApi = {
  async create(donation: any) {
    return {};
  },

  async getUserDonations(userId: string) {
    return [];
  }
};

export const assistanceApi = {
  async create(request: any) {
    return {};
  },

  async getActive(limit?: number) {
    return [];
  },

  async getUserRequests(userId: string) {
    return [];
  }
};

export const authApi = {
  async signUp(email: string, password: string, userData: any) {
    return {};
  },

  async signIn(email: string, password: string) {
    return {};
  },

  async signOut() {
    return;
  },

  async resetPassword(email: string) {
    return;
  }
};