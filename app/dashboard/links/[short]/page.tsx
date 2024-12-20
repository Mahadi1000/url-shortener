import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { getLink } from "@/lib/actions/links";
import { extractMetaData, previewLink } from "@/lib/actions/preview-link";
import LinkDetailChart from "@/components/Link/LinkDetailChart";
import { getLinkChartDetail } from "@/lib/getLinkChartDetail";
import UpdateUrl from "@/components/Link/UpdateUrl";
import CustomBarChart from "@/components/charts/CustomBarChart";
import DetailCard from "@/components/Link/DetailCard";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import CustomLineChart from "@/components/charts/CustomLineChart";
import HoverLink from "@/components/Link/HoverLink";
import {
  formaliseDay,
  formaliseYear,
  formaliseMonth,
  getUrlTopReferreDomain,
  getUrlTopLocations,
  getUrlTopDevices,
  getTopBrowser,
  minus1Year,
} from "@/lib";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

type Props = {
  params: { short: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const shortCode = params.short;
  try {
    const { success, data } = await getLink(shortCode);
    if (success && data) {
      const images = [];
      const meta_Data = await extractMetaData(data.original!);
      const metaData = JSON.parse(JSON.stringify(meta_Data, null, 3));
      if (metaData.og) {
        if (metaData.og.image) {
          images.push(metaData.og.image);
        }
      }

      const previewRes = await previewLink(data.original);

      const shortUrl = process.env.URL + "/" + data?.short;
      const previousImages = (await parent).openGraph?.images || [...images];

      return {
        metadataBase: new URL(process.env.URL as string),
        title: previewRes.title ?? data.original,
        description: previewRes.description,
        icons: [{ rel: "icon", url: data?.original as string }],
        openGraph: {
          title: previewRes.title,
          description: previewRes.description,
          url: shortUrl,
          siteName: "URL-Shortener",
          images: [process.env.URL + "/logo.png", ...previousImages],
        },
      };
    }

    return {
      metadataBase: new URL(process.env.URL as string),
      title: "Url-Shortener | Link",
      description: "Url-Shortener",
    };
  } catch (e) {
    return {
      title: "Url-Shortener | Link",
      description: "Url-Shortener",
    };
  }
}

const LinkDetail = async ({ params, searchParams }: Props) => {
  const { short } = params;

  const link = await getLink(short);

  if (!link.success) {
    return (
      <div className="flex w-full h-full items-center justify-center font-bold font-poppins flex-col gap-5">
        <div className="max-w-md space-y-8">
          <div className="flex items-center flex-col gap-3">
            <AlertTriangle size={32} className="text-red-300" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 text">
              Oops! Page not found.
            </h2>
          </div>

          <div className="mt-8 space-y-6">
            <p className="mt-2 text-center text-sm text-gray-600">
              We couldn&apos;t find the page you&apos;re looking for. Click the
              button below to return to the homepage.
            </p>
            <Button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Link href={"/dashboard/links/"}>Return to Links Page</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const dayDetail = await getLinkChartDetail(short, "day");
  const monthDetail = await getLinkChartDetail(short, "month");
  const yearDetail = await getLinkChartDetail(short, "year");

  const topReferr = await getUrlTopReferreDomain(short);
  const topCountries = await getUrlTopLocations(short);
  const topDevices = await getUrlTopDevices(short);
  const topBrowsers = await getTopBrowser(short);

  const currentDate = new Date();

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  return (
    <div className={"flex-1 w-full h-full flex flex-col space-y-2"}>
      <div className={"w-full flex flex-col gap-5"}>
        <div className="w-full mx-auto grid gap-2">
          <h1 className="font-semibold text-3xl">Short URL Details</h1>
          <div className="flex items-center sm:flex-row text-sm gap-2 w-full">
            <a
              className="font-medium truncate text-xs sm:text-sm max-w-xs"
              href={process.env.URL + "/" + short}
              target="_blank"
            >
              {/* <HoverLink url={process.env.URL+"/"+short}/> */}
              {link && link?.data && link?.data?.original && (
                <HoverLink url={link?.data?.original!} />
              )}
            </a>
            <Separator className="h-5" orientation="vertical" />
            <Badge className="font-semibold" variant="secondary">
              {link.data?.clicks.length} Clicks
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-col md:flex-row w-full">
          <div className={"max-w-md"}>
            {link.data && <UpdateUrl link={link.data} />}
          </div>
          {/*<LinkDetailChart linkId={short}/>*/}

          <div className="flex flex-1 flex-col gap-4 h-full">
            <CustomLineChart
              xDataKey={"timestamp"}
              data={formaliseDay(dayDetail)}
              datakey={"clicks"}
              fill={"#000"}
              className={"flex-1 w-[400px] max-w-[500px] max-h-[400px]"}
              tooltip={true}
            />
          </div>
        </div>
      </div>

      <div
        className={
          "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full"
        }
      >
        {topReferr.length > 0 && (
          <DetailCard
            title={"Top Referrers"}
            description={"Clicks"}
            items={topReferr}
          />
        )}
        {topCountries.length > 0 && (
          <DetailCard
            title={"Top Locations"}
            description={"Clicks"}
            items={topCountries}
          />
        )}
        {topDevices.length > 0 && (
          <DetailCard
            title={"Top Devices"}
            description={"Clicks"}
            items={topDevices}
          />
        )}

        {topBrowsers.length > 0 && (
          <DetailCard
            title={"Top Browsers"}
            description={"Clicks"}
            items={topBrowsers}
          />
        )}
      </div>

      <div
        className={
          "py-3 dark-theme rounded-sm px-2 w-full grid grid-cols-1 lg:grid-cols-3 h-1/2 items-center"
        }
      >
        <div className={"h-full flex flex-col flex-1"}>
          <h6>Day</h6>
          <CustomBarChart
            tooltip={false}
            className={"flex-1 w-[400px] max-w-[500px] max-h-[400px]"}
            data={formaliseDay(dayDetail)}
            barSize={40}
            xDataKey={"timestamp"}
            dataKey={"clicks"}
          />
          {/* <CustomLineChart xDataKey={"timestamp"} data={formaliseDay(dayDetail)} datakey={"clicks"} fill={"#000"} className={"flex-1 w-[400px] max-w-[500px] max-h-[400px]"} tooltip={false}/> */}
        </div>
        <div className={"h-full flex flex-col flex-1"}>
          <h6>Month</h6>
          <CustomBarChart
            tooltip={false}
            className={"flex-1 w-[400px] max-w-[500px] max-h-[400px]"}
            data={formaliseMonth(monthDetail)}
            barSize={30}
            xDataKey={"timestamp"}
            dataKey={"clicks"}
          />
          {/*<CustomLineChart xDataKey={"timestamp"} data={monthDetail} datakey={"clicks"} fill={"#000"} className={"flex-1 w-[400px] max-w-[500px] max-h-[400px]"} tooltip/>*/}
        </div>
        <div className={"h-full flex flex-col flex-1"}>
          <h6>Year</h6>
          <CustomBarChart
            tooltip={false}
            className={"flex-1 w-[400px] max-w-[500px] max-h-[400px]"}
            data={formaliseYear(yearDetail)}
            barSize={30}
            xDataKey={"timestamp"}
            dataKey={"clicks"}
          />
        </div>
      </div>
    </div>
  );
};

export default LinkDetail;
