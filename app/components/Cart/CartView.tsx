'use client';
import React, { useCallback, useState } from 'react';
import { formatPrice } from '@app/utils/price-formatter';
import { CartItem } from '@app/components/CartItem/CartItem';
import { useCart } from '@app/hooks/useCart';
import { useUI } from '@app/components/Provider/context';
import { useWixClient } from '@app/hooks/useWixClient';
import { Spinner } from 'flowbite-react';
import { currentCart } from '@wix/ecom';

export const CartView = ({ layout = 'mini' }: { layout?: 'full' | 'mini' }) => {
  const wixClient = useWixClient();
  const { closeSidebar, openModalNotPremium } = useUI();
  const { data, isLoading } = useCart();
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const subTotal = formatPrice(
    data && {
      amount:
        data.lineItems?.reduce((acc, item) => {
          return (
            acc +
            Number.parseFloat(item.price?.amount ?? '0') * (item.quantity ?? 0)
          );
        }, 0) ?? 0,
      currencyCode: data.currency,
    }
  );

  const goToCheckout = useCallback(async () => {
    closeSidebar();
    setRedirecting(true);
    try {
      const checkout =
        await wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });
      const { redirectSession } =
        await wixClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId: checkout.checkoutId },
          callbacks: {
            postFlowUrl: window.location.origin,
            thankYouPageUrl: `${window.location.origin}/stores-success`,
            cartPageUrl: `${window.location.origin}/cart`,
          },
        });
      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (e: any) {
      if (
        e.details.applicationError.code ===
        'SITE_MUST_ACCEPT_PAYMENTS_TO_CREATE_CHECKOUT'
      ) {
        openModalNotPremium();
      }
      setRedirecting(false);
    }
  }, [
    closeSidebar,
    openModalNotPremium,
    wixClient.currentCart,
    wixClient.redirects,
  ]);

  const isMini = layout === 'mini';
  return;
};
