'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

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
    cta: 'Get Started',
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

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const router = useRouter();
  const { data: session } = useSession();

  const handlePlanSelect = (planId) => {
    if (!session) {
      router.push('/login?callbackUrl=/checkout?plan=' + planId);
    } else {
      router.push('/checkout?plan=' + planId);
    }
  };

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Choose the perfect plan for your development workflow
          </motion.p>
          
          <div className="flex justify-center mt-8">
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
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative rounded-xl border ${
                plan.popular ? 'border-primary shadow-lg' : 'border-border'
              } overflow-hidden`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold">
                    {billingPeriod === 'yearly' 
                      ? plan.id === 'free' 
                        ? '$0' 
                        : `$${parseInt((plan.price.replace('$', '')) * 0.8 * 12).toFixed(2)}`
                      : plan.price}
                  </span>
                  {plan.period && (
                    <span className="ml-1 text-muted-foreground">
                      {billingPeriod === 'yearly' ? '/year' : plan.period}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-muted-foreground">{plan.description}</p>
                
                <Button 
                  className={`mt-6 w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {plan.cta}
                </Button>
                
                <ul className="mt-6 space-y-3">
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
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Need a custom plan for your enterprise? <a href="/contact" className="text-primary font-medium hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </section>
  );
}