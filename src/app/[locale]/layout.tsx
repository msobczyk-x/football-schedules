import "@/app/globals.css";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import PageHeader from "@/components/common/PageHeader";
import { unstable_ViewTransition as ViewTransition } from "react";
import QueryProvider from "@/components/common/QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={`dark antialiased ${inter.className}`}>
      <body className="bg-custom-background ">
        <QueryProvider>
          <NuqsAdapter>
            <NextIntlClientProvider>
              <div className="w-full flex flex-col max-w-2xl mx-auto items-center h-screen px-4 md:px-0 relative">
                <PageHeader />
                <ViewTransition>
                  <main className="w-full">{children}</main>
                </ViewTransition>
              </div>
            </NextIntlClientProvider>
          </NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
}
