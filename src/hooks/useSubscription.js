import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export default function useSubscription() {
  const queryClient = useQueryClient();

  // Fetch current subscription and history
  const { 
    data: subscriptionData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const { data } = await axios.get('/api/subscriptions');
      return data;
    },
    retry: 1,
  });

  // Create or update subscription
  const { mutate: updateSubscription, isPending: isUpdating } = useMutation({
    mutationFn: async (subscriptionData) => {
      const { data } = await axios.post('/api/subscriptions', subscriptionData);
      return data;
    },
    onSuccess: () => {
      toast.success('Subscription updated successfully');
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] }); // Also refresh profile data
    },
    onError: (error) => {
      console.error('Subscription update error:', error);
      toast.error('Failed to update subscription. Please try again.');
    },
  });

  // Cancel subscription
  const { mutate: cancelSubscription, isPending: isCancelling } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete('/api/subscriptions');
      return data;
    },
    onSuccess: () => {
      toast.success('Subscription cancelled successfully');
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('Subscription cancellation error:', error);
      toast.error('Failed to cancel subscription. Please try again.');
    },
  });

  // Helper function to check if user has access to a specific feature
  const hasAccess = (feature) => {
    if (!subscriptionData || !subscriptionData.subscription) {
      return false;
    }

    const { plan } = subscriptionData.subscription;
    
    // Define feature access by plan
    const featureAccess = {
      // Free plan features
      'projects:create': true, // All plans can create projects
      'projects:max': plan === 'free' ? 3 : Infinity,
      'tasks:max': plan === 'free' ? 10 : Infinity,
      'team:max': plan === 'free' ? 1 : plan === 'pro' ? 5 : Infinity,
      
      // Pro plan features
      'analytics:basic': plan === 'pro' || plan === 'enterprise',
      'customFields': plan === 'pro' || plan === 'enterprise',
      
      // Enterprise plan features
      'analytics:advanced': plan === 'enterprise',
      'api:access': plan === 'enterprise',
      'whiteLabel': plan === 'enterprise',
    };
    
    return featureAccess[feature] || false;
  };

  return {
    subscription: subscriptionData?.subscription,
    history: subscriptionData?.history || [],
    isLoading,
    error,
    updateSubscription,
    cancelSubscription,
    isUpdating,
    isCancelling,
    refetch,
    hasAccess,
  };
}