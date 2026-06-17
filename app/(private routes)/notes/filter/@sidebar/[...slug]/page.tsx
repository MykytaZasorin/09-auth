import SidebarDefault from "../default";

interface SidebarPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function SidebarPage({ params }: SidebarPageProps) {
  // Розгортаємо асинхронні params для Next.js 15
  const resolvedParams = await params;

  // Рендеримо наш дефолтний сайдбар, передаючи йому чисті дані
  return <SidebarDefault params={resolvedParams} />;
}
