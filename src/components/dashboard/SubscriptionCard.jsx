'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import useSubscription from '@/hooks/useSubscription';
import { CalendarIcon, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SubscriptionCard() {
  const router = useRouter();
  const { subscription, isLoading, cancelSubscription, isCancelling } = useSubscription();
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const getPlanDetails = (planId) => {
    const plans = {
      free: {
        name: 'Free',
        description: 'Basic plan for individual developers',
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      },
      pro: {
        name: 'Pro',
        description: 'Advanced features for serious developers',
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      },
      enterprise: {
        name: 'Enterprise',
        description: 'Complete solution for development teams',
        color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
      },
    };

    return plans[planId] || {
      name: 'Unknown',
      description: 'Plan details not available',
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    };
  };

  const handleCancelSubscription = async () => {
    await cancelSubscription();
    setShowCancelDialog(false);
  };

  const handleUpgrade = () => {
    router.push('/checkout');
  };

  if (isLoading) {
    return (
      <Card className="w-full h-[220px] animate-pulse">
        <CardHeader className="pb-2">
          <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-4 bg-muted rounded w-4/6"></div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="h-9 bg-muted rounded w-full"></div>
        </CardFooter>
      </Card>
    );
  }

  const planDetails = subscription ? getPlanDetails(subscription.plan) : getPlanDetails('free');

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">Subscription</CardTitle>
            <CardDescription>Manage your DevTrack plan</CardDescription>
          </div>
          <Badge className={planDetails.color}>
            {planDetails.name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {subscription ? (
          <div className="space-y-4">
            <div className="flex items-center text-sm">
              <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
              <span>
                Your {planDetails.name} plan is active
              </span>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span>
                {subscription.billingPeriod === 'yearly' ? 'Yearly' : 'Monthly'} billing · 
                Renews on {formatDate(subscription.endDate)}
              </span>
            </div>
            
            {subscription.plan !== 'enterprise' && (
              <div className="text-sm mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleUpgrade}
                >
                  {subscription.plan === 'free' ? 'Upgrade Plan' : 'Manage Plan'}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center text-sm">
              <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
              <span>
                You are currently on the Free plan
              </span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Upgrade to Pro or Enterprise for advanced features and unlimited projects.
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-1">
        {subscription && subscription.plan !== 'free' && (
          <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                Cancel subscription
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel your subscription?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will lose access to premium features at the end of your current billing period. 
                  Your plan will be downgraded to the Free plan.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleCancelSubscription}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  disabled={isCancelling}
                >
                  {isCancelling ? 'Cancelling...' : 'Yes, Cancel'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        
        {(!subscription || subscription.plan === 'free') && (
          <Button onClick={handleUpgrade} className="w-full">
            Upgrade to Pro
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}