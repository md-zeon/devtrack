'use client';

import { Suspense } from 'react';
import CheckoutComponent from './components/Checkout';

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutComponent />
    </Suspense>
  );
}
