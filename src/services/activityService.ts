import api from '@/lib/api';
import { flashcardService } from './flashcard.service';

export const activityService = {
  // Re-export flashcard service
  ...flashcardService,

  // Get all activities
  getAllActivities: async () => {
    const response = await api.get('/activities');
    return response.data;
  },

  // Other activity methods can be added here as needed
};
