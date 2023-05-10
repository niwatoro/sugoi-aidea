import Script from "next/script";
import { FC } from "react";

type Props = {
  gaTrackingId: string;
};
export const GoogleAnalytics: FC<Props> = ({ gaTrackingId }) => {
  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}></Script>
      <Script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gaTrackingId}');
        `}
      </Script>
    </>
  );
};
