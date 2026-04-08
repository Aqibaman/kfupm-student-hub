import Link from "next/link";
import { ActionLink, CardGrid, DataList, PageIntro, SectionTitle, SoftCard } from "@/components/hub";
import { getNavIconByTitle } from "@/lib/nav-icons";
import { ReactNode } from "react";

export function ModuleHome({
  title,
  description,
  actions,
  stats,
  backHref = "/dashboard",
  actionSlot
}: {
  title: string;
  description: string;
  actions: Array<{ label: string; href: string; variant?: "primary" | "secondary" | "danger" }>;
  stats?: Array<{ label: string; value: string; detail: string }>;
  backHref?: string;
  actionSlot?: ReactNode;
}) {
  const Icon = getNavIconByTitle(title);

  return (
    <div className="space-y-6">
      <PageIntro title={title} description={description} backHref={backHref} icon={Icon ? <Icon className="h-7 w-7 text-brand-700" /> : null} />
      {stats?.length ? (
        <CardGrid cols="md:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => (
            <SoftCard key={stat.label}>
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">{stat.value}</p>
              <p className="mt-2 text-sm text-slate-500">{stat.detail}</p>
            </SoftCard>
          ))}
        </CardGrid>
      ) : null}
      <SoftCard>
        <SectionTitle title="Quick Actions" subtitle="Jump directly into the most common tasks for this service." />
        <div className="flex flex-wrap gap-3">
          {actionSlot}
          {actions.map((action) => (
            <ActionLink key={action.href} href={action.href} label={action.label} variant={action.variant ?? "primary"} />
          ))}
        </div>
      </SoftCard>
    </div>
  );
}

export function SimpleFormPage({
  title,
  description,
  children,
  backHref
}: {
  title: string;
  description: string;
  children: ReactNode;
  backHref: string;
}) {
  const Icon = getNavIconByTitle(title);

  return (
    <div className="space-y-6">
      <PageIntro title={title} description={description} backHref={backHref} icon={Icon ? <Icon className="h-7 w-7 text-brand-700" /> : null} />
      <SoftCard>{children}</SoftCard>
    </div>
  );
}

export function ListPanel({
  title,
  subtitle,
  items,
  actions
}: {
  title: string;
  subtitle?: string;
  items: Array<{ title: string; meta?: string; value?: string; description?: string }>;
  actions?: Array<{ href: string; label: string; variant?: "primary" | "secondary" | "danger" }>;
}) {
  return (
    <SoftCard>
      <SectionTitle title={title} subtitle={subtitle} />
      <DataList items={items} />
      {actions?.length ? (
        <div className="mt-5 flex flex-wrap gap-3">
          {actions.map((action) => (
            <ActionLink key={action.href} href={action.href} label={action.label} variant={action.variant ?? "secondary"} />
          ))}
        </div>
      ) : null}
    </SoftCard>
  );
}

export function TableCard({
  title,
  subtitle,
  headers,
  rows
}: {
  title: string;
  subtitle?: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <SoftCard>
      <SectionTitle title={title} subtitle={subtitle} />
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              {headers.map((header) => (
                <th key={header} className="px-3 py-3 font-medium">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-b border-slate-100 last:border-b-0">
                {row.map((cell, cellIndex) => (
                  <td key={`${cell}-${cellIndex}`} className="px-3 py-4 text-slate-700">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SoftCard>
  );
}

export function ActionTiles({
  items
}: {
  items: Array<{ title: string; description: string; href: string }>;
}) {
  return (
    <CardGrid cols="md:grid-cols-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group rounded-[24px] border border-white/80 bg-white/92 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-200 hover:bg-brand-50/40 hover:shadow-[0_20px_40px_rgba(0,133,64,0.14)]"
        >
          <h3 className="inline-flex items-center gap-3 text-xl font-semibold text-slate-950">
            {(() => {
              const ItemIcon = getNavIconByTitle(item.title);
              return ItemIcon ? <ItemIcon className="h-5 w-5 text-brand-700 transition group-hover:text-brand-800" /> : null;
            })()}
            <span>{item.title}</span>
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-500">{item.description}</p>
          <p className="mt-4 text-sm font-semibold text-brand-700 transition group-hover:text-brand-800">Open page</p>
        </Link>
      ))}
    </CardGrid>
  );
}
