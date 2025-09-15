'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import axios from 'axios';
import { motion } from 'framer-motion';

const pricingPlans = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Perfect for individual developers',
    features: [
      'Up to 3 projects',
      'Up to 10 tasks per project',
      'Basic calendar view',
      'Email support',
    ],
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 12,
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
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 49,
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
  },
};

export default function CheckoutComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/checkout');
    }

    const planId = searchParams.get('plan');
    if (planId && pricingPlans[planId]) {
      setSelectedPlan(pricingPlans[planId]);
    } else {
      setSelectedPlan(pricingPlans.free);
    }
  }, [searchParams, status, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculatePrice = () => {
    if (!selectedPlan) return 0;
    
    if (selectedPlan.id === 'free') return 0;
    
    const basePrice = selectedPlan.price;
    if (billingPeriod === 'yearly') {
      return (basePrice * 0.8 * 12).toFixed(2);
    }
    return basePrice.toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedPlan.id === 'free') {
      // For free plan, just update the user's subscription
      try {
        setLoading(true);
        await axios.post('/api/subscriptions', {
          plan: selectedPlan.id,
          billingPeriod,
          amount: 0,
        });
        
        toast.success('You have successfully subscribed to the Free plan!');
        router.push('/dashboard');
      } catch (error) {
        console.error('Subscription error:', error);
        toast.error('Failed to process your subscription. Please try again.');
      } finally {
        setLoading(false);
      }
      return;
    }
    
    // Validate form for paid plans
    if (!formData.cardName || !formData.cardNumber || !formData.expiryDate || !formData.cvv) {
      toast.error('Please fill in all payment details');
      return;
    }
    
    // Simple validation for card number format
    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error('Please enter a valid 16-digit card number');
      return;
    }
    
    try {
      setLoading(true);
      
      // simulation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save subscription to database
      await axios.post('/api/subscriptions', {
        plan: selectedPlan.id,
        billingPeriod,
        amount: calculatePrice(),
      });
      
      toast.success(`You have successfully subscribed to the ${selectedPlan.name} plan!`);
      router.push('/dashboard');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to process your payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || !selectedPlan) {
    return (
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 bg-muted rounded w-64 mb-4"></div>
            <div className="h-4 bg-muted rounded w-40 mb-8"></div>
            <div className="h-64 bg-muted rounded w-full max-w-md"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Complete Your Subscription</h1>
        <p className="text-muted-foreground mb-8">You&apos;re just a few steps away from enhancing your development workflow</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        <motion.div 
          className="md:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>
                {selectedPlan.id === 'free' 
                  ? 'No payment required for the Free plan' 
                  : 'Enter your payment information to complete your subscription'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {selectedPlan.id !== 'free' && (
                  <>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input 
                          id="cardName" 
                          name="cardName" 
                          placeholder="John Smith" 
                          value={formData.cardName}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input 
                          id="cardNumber" 
                          name="cardNumber" 
                          placeholder="1234 5678 9012 3456" 
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input 
                            id="expiryDate" 
                            name="expiryDate" 
                            placeholder="MM/YY" 
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input 
                            id="cvv" 
                            name="cvv" 
                            placeholder="123" 
                            value={formData.cvv}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                  </>
                )}
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-base">Billing Period</Label>
                    <RadioGroup 
                      defaultValue={billingPeriod} 
                      onValueChange={setBillingPeriod}
                      className="flex flex-col space-y-1 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly" className="font-normal">
                          Monthly
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yearly" id="yearly" />
                        <Label htmlFor="yearly" className="font-normal">
                          Yearly <span className="text-xs text-emerald-500 font-bold">Save 20%</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : selectedPlan.id === 'free' ? 'Activate Free Plan' : `Pay $${calculatePrice()}`}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                {selectedPlan.name} Plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">{selectedPlan.name} Plan</span>
                  <span>${calculatePrice()}</span>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {billingPeriod === 'yearly' ? 'Billed annually' : 'Billed monthly'}
                </div>
                
                <Separator />
                
                <div className="font-medium text-lg flex justify-between">
                  <span>Total</span>
                  <span>${calculatePrice()}</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                <h4 className="font-medium">Plan Features:</h4>
                <ul className="text-sm space-y-1">
                  {selectedPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start text-sm text-muted-foreground">
              <p>Need help? <a href="/contact" className="text-primary hover:underline">Contact support</a></p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
