import React from "react";
import { ChevronDown } from "lucide-react";
import FAQ_ITEMS_CONST from "../constants/faqs";

export const FAQ_ITEMS = FAQ_ITEMS_CONST;

export default function FAQList({
  limit,
  id = "faq",
  title = "You're not the first to ask",
  description,
  headingAlign = "left",
  showBorderTop = false,
  sectionClassName = "",
  padding = "py-20",
  columns = 1,
  items: itemsProp,
  filter,
  groupByCategory = false,
}) {
  const sourceItems = itemsProp || FAQ_ITEMS;
  const filtered = typeof filter === "function" ? sourceItems.filter(filter) : sourceItems;
  const items = typeof limit === "number" ? filtered.slice(0, limit) : filtered;
  const headingAlignClass = headingAlign === "center" ? "text-center" : "";
  const borderClass = showBorderTop ? "border-t border-black/5 dark:border-white/10" : "";
  const listClass =
    columns >= 2
      ? "grid grid-cols-1 md:grid-cols-2 gap-4"
      : "space-y-4";

  const withTargetBlank = (html = "") =>
    html
      .replace(/<a(?![^>]*target=)([^>]*?)>/gi, '<a target="_blank" rel="noopener noreferrer"$1>')
      .replace(/<a(?=[^>]*target=["']?_blank["']?)(?![^>]*rel=)([^>]*)>/gi, '<a rel="noopener noreferrer"$1>');

  return (
    <section id={id} className={`${padding} ${borderClass} ${sectionClassName}`}>
      <div className="mx-auto max-w-3xl px-6">
        {(title || description) && (
          <div className={`mb-10 ${headingAlignClass}`}>
            {title && (
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black dark:text-white">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-3 text-base text-black/60 dark:text-white/60 max-w-xl">
                {description}
              </p>
            )}
          </div>
        )}

        {groupByCategory ? (
          <div className="space-y-10">
            {Object.entries(
              items.reduce((acc, item) => {
                const key = item.category || "Other";
                acc[key] = acc[key] || [];
                acc[key].push(item);
                return acc;
              }, {})
            ).map(([category, group]) => (
              <div key={category}>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4">{category}</h3>
                <div className={listClass}>
                  {group.map((f) => (
                    <details key={f.q} className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-sm">
                      <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none text-left text-[15px] font-medium text-black dark:text-white">
                        {f.q}
                        <ChevronDown className="w-4 h-4 flex-shrink-0 text-black/40 dark:text-white/40 transition group-open:rotate-180" />
                      </summary>
                      <div className="px-5 pb-5 text-sm text-black/60 dark:text-white/60 leading-relaxed faq-answer">
                        {typeof f.a === "string" ? (
                          <div dangerouslySetInnerHTML={{ __html: withTargetBlank(f.a) }} />
                        ) : (
                          f.a
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={listClass}>
            {items.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-sm">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none text-left text-[15px] font-medium text-black dark:text-white">
                  {f.q}
                  <ChevronDown className="w-4 h-4 flex-shrink-0 text-black/40 dark:text-white/40 transition group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 text-sm text-black/60 dark:text-white/60 leading-relaxed faq-answer">
                  {typeof f.a === "string" ? (
                    <div dangerouslySetInnerHTML={{ __html: withTargetBlank(f.a) }} />
                  ) : (
                    f.a
                  )}
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
