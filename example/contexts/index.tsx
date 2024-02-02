import React, { type PropsWithChildren } from 'react';
import StoreProvider from './Store';

export default function ContextManager({ children }: PropsWithChildren) {
  return <StoreProvider>{children}</StoreProvider>;
}
