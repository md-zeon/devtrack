'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import useSubscription from '@/hooks/useSubscription';
import { Receipt, Calendar } from 'lucide-react';

export default function SubscriptionHistory() {
  const { history, isLoading } = useSubscription();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getPlanBadge = (plan) => {
    const badges = {
      free: <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Free</Badge>,
      pro: <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Pro</Badge>,
      enterprise: <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">Enterprise</Badge>,
    };

    return badges[plan] || <Badge variant="outline">Unknown</Badge>;
  };

  if (isLoading) {
    return (
      <Card className="w-full h-[300px] animate-pulse">
        <CardHeader className="pb-2">
          <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-24"></div>
                  <div className="h-3 bg-muted rounded w-32"></div>
                </div>
                <div className="h-6 bg-muted rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Billing History</CardTitle>
        <CardDescription>Your subscription and payment history</CardDescription>
      </CardHeader>
      <CardContent>
        {history && history.length > 0 ? (
          <div className="space-y-1">
            {history.map((item) => (
              <div 
                key={item._id} 
                className="flex justify-between items-center py-3 border-b last:border-0"
              >
                <div className="space-y-1">
                  <div className="flex items-center">
                    <Receipt className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">
                      {getPlanBadge(item.plan)}
                      <span className="ml-2">
                        {item.billingPeriod === 'yearly' ? 'Yearly' : 'Monthly'}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-2" />
                    {formatDate(item.createdAt)}
                  </div>
                </div>
                <div className="font-medium">
                  {item.amount > 0 ? formatCurrency(item.amount) : 'Free'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            <p>No billing history available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}