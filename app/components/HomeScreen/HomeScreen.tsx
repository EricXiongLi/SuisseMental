import Image from 'next/image';
import { wixEventsV2 as wixEvents } from '@wix/events';
import { products } from '@wix/stores';
import { Events } from '@app/components/Events/Events';
import testIds from '@app/utils/test-ids';
import { WixMediaImage } from '@app/components/Image/WixMediaImage';

export function HomeScreen({
  events,
  productsForCategories,
}: {
  events: wixEvents.V3Event[];
  productsForCategories: { category: string; product: products.Product }[];
}) {
  return (
    <div className="mx-auto relative">
      <div className="relative">
        <div className="flex sm:flex-row flex-col bg-purple-400">
          <div className="basis-1/2 text-center sm:text-left relative">
            <div
              className="px-10 sm:px-14 py-6 bg-site"
              data-testid={testIds.HOME_PAGE.HEADER}
            >
              <h1 className="text-5xl sm:text-[120px] leading-none animate-fade-in">
                Mind
                <br /> Event
              </h1>
              <h3 className="text-base sm:text-2xl py-6">
                We are always here for u
              </h3>
              <div className="flex text-gray-700 gap-4 justify-center sm:justify-start"></div>
            </div>
            <div className="bg-purple-400 h-[75px] w-full"></div>
          </div>
          <div className="basis-1/2">
            <Image
              src="https://images.unsplash.com/photo-1564121211835-e88c852648ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVudGFsfGVufDB8fDB8fHw"
              alt="TALI$A"
              className="w-full px-10 sm:px-0"
              width={1000}
              height={800}
            />
          </div>
        </div>
        <Image
          className="absolute inset-x-2/4 -translate-x-2/4 -translate-y-[20%] bottom-0 top-[20%] hidden sm:block"
          src="https://images.unsplash.com/photo-1604881991720-f91add269bed?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lbnRhbCUyMGhlYWx0aHxlbnwwfHwwfHx8MA%3D%3D"
          alt="TALI$A"
          width={202}
          height={245}
        />
      </div>
      {events?.length ? (
        <div className="bg-purple-400 text-site pt-16 sm:p-20">
          <Events events={events} />
        </div>
      ) : (
        <div className="text-3xl w-full text-center p-9 box-border max-w-4xl mx-auto">
          No events found. Click{' '}
          <a
            href="https://manage.wix.com/account/site-selector?actionUrl=https%3A%2F%2Fmanage.wix.com%2Fdashboard%2F%7BmetaSiteId%7D%2Fevents%3FreferralInfo%3DHeadless"
            target="_blank"
            rel="noreferrer"
            className="text-purple-500"
          >
            here
          </a>{' '}
          to go to the business dashboard to add events. Once added, they will
          appear here.
        </div>
      )}
      {productsForCategories.length ? (
        <div className="flex gap-2 sm:gap-14 px-14 flex-col sm:flex-row">
          <div className="text-custom-1 text-center sm:text-left pt-10 sm:py-20 basis-1/2">
            <h1 className="uppercase text-4xl sm:text-7xl text-center sm:text-left text-black">
              Mind Event
            </h1>
            {productsForCategories[1]?.product?.media?.mainMedia ? (
              <div className="mt-10 sm:mt-[300px]">
                <a href="/shop" className="h-auto max-w-full inline-block">
                  <WixMediaImage
                    media={
                      productsForCategories[1]?.product!.media!.mainMedia!
                        .image!.url!
                    }
                    width={800}
                    height={800}
                    alt={
                      productsForCategories[1]?.product!.media!.mainMedia!
                        .image!.altText!
                    }
                  />
                </a>
                <span className="font-bold text-2xl sm:text-5xl block text-center mt-[-15px] sm:mt-[-30px] text-black relative z-10">
                  <a href="/shop">{productsForCategories[1]?.category}</a>
                </span>
              </div>
            ) : null}
          </div>
          <div className="basis-1/2">
            {productsForCategories[0]?.product?.media?.mainMedia ? (
              <div className="mt-10 sm:mt-[220px]">
                <a href="/shop" className="h-auto max-w-full inline-block">
                  <WixMediaImage
                    media={
                      productsForCategories[0]?.product!.media!.mainMedia!
                        .image!.url!
                    }
                    width={800}
                    height={800}
                    alt={
                      productsForCategories[0]?.product!.media!.mainMedia!
                        .image!.altText!
                    }
                  />
                </a>
                <span className="font-bold text-2xl sm:text-5xl block text-center mt-[-15px] sm:mt-[-30px] relative z-10">
                  <a href="/shop">{productsForCategories[0]?.category}</a>
                </span>
              </div>
            ) : null}
            {productsForCategories[2]?.product?.media?.mainMedia ? (
              <div className="mt-10 sm:mt-40">
                <a href="/shop" className="h-auto max-w-full inline-block">
                  <WixMediaImage
                    media={
                      productsForCategories[2]?.product?.media!.mainMedia!
                        .image!.url!
                    }
                    width={800}
                    height={800}
                    alt={
                      productsForCategories[2]?.product!.media!.mainMedia!
                        .image!.altText!
                    }
                  />
                </a>
                <span className="font-bold text-2xl sm:text-5xl block text-center mt-[-15px] sm:mt-[-30px] relative z-10">
                  <a href="/shop">{productsForCategories[2]?.category}</a>
                </span>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div> </div>
      )}
    </div>
  );
}
