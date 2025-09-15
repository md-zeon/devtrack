'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Check, X } from 'lucide-react';
import SubscriptionHistory from '@/components/dashboard/SubscriptionHistory';
import useSubscription from '@/hooks/useSubscription';

const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    description: 'Perfect for individual developers',
    features: [
      'Up to 3 projects',
      'Up to 10 tasks per project',
      'Basic calendar view',
      'Email support',
    ],
    notIncluded: [
      'Team collaboration',
      'Advanced analytics',
      'Priority support',
      'Custom fields',
      'API access',
    ],
    cta: 'Current Plan',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$12',
    period: '/month',
    description: 'For serious developers and small teams',
    features: [
      'Unlimited projects',
      'Unlimited tasks',
      'Advanced calendar view',
      'Team collaboration (up to 5 members)',
      'Basic analytics',
      'Priority email support',
      'Custom fields',
    ],
    notIncluded: [
      'Advanced analytics',
      'API access',
      'White-label options',
    ],
    cta: 'Upgrade Now',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$49',
    period: '/month',
    description: 'For development teams and agencies',
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'Advanced analytics',
      'Dedicated support',
      'API access',
      'White-label options',
      'Custom integrations',
      'SSO authentication',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function SubscriptionPage() {
  const router = useRouter();
  const { subscription, isLoading } = useSubscription();
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const handlePlanSelect = (planId) => {
    if (subscription && subscription.plan === planId) {
      return; // Already on this plan
    }
    
    router.push(`/checkout?plan=${planId}`);
  };

  const calculatePrice = (basePrice) => {
    if (basePrice === '$0') return '$0';
    
    const numericPrice = parseInt(basePrice.replace('$', ''));
    if (billingPeriod === 'yearly') {
      return `$${(numericPrice * 0.8 * 12).toFixed(0)}`;
    }
    return basePrice;
  };

  const getCurrentPlanId = () => {
    if (!subscription) return 'free';
    return subscription.plan;
  };

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Subscription Management</h1>
        <p className="text-muted-foreground">
          Manage your DevTrack subscription and billing history
        </p>
      </div>

      <Tabs defaultValue="plans" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="history">Billing History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="plans" className="space-y-6">
          <div className="flex justify-center mb-8">
            <div className="bg-muted p-1 rounded-full flex items-center">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  billingPeriod === 'monthly'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  billingPeriod === 'yearly'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                Yearly <span className="text-xs text-emerald-500 font-bold">Save 20%</span>
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => {
              const isCurrentPlan = getCurrentPlanId() === plan.id;
              
              return (
                <Card 
                  key={plan.id} 
                  className={`relative ${
                    plan.popular ? 'border-primary shadow-lg' : 'border-border'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-4xl font-extrabold">
                        {calculatePrice(plan.price)}
                      </span>
                      {plan.period && (
                        <span className="ml-1 text-muted-foreground">
                          {billingPeriod === 'yearly' ? '/year' : plan.period}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      
                      {plan.notIncluded.map((feature) => (
                        <li key={feature} className="flex items-start text-muted-foreground">
                          <X className="h-5 w-5 text-muted-foreground/50 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      variant={isCurrentPlan ? 'outline' : plan.popular ? 'default' : 'outline'}
                      disabled={isCurrentPlan}
                      onClick={() => handlePlanSelect(plan.id)}
                    >
                      {isCurrentPlan ? 'Current Plan' : plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          
          <div className="mt-8 bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">Need a custom plan?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you need specific features or have unique requirements, we can create a custom plan for your team.
            </p>
            <Button variant="outline" onClick={() => router.push('/contact')}>
              Contact Sales
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <SubscriptionHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}