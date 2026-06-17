import Link from "next/link";
import css from "./SidebarNotes.module.css";

interface SidebarDefaultProps {
  params: {
    slug: string[];
  };
}

const TAGS = ["all", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function SidebarDefault({ params }: SidebarDefaultProps) {
  const currentTag = params?.slug?.[0] || "all";

  return (
    <aside className={css.sidebarContainer}>
      <nav>
        <ul className={css.menuList}>
          {TAGS.map((tag) => {
            const isActive = currentTag === tag;

            return (
              <li key={tag} className={css.menuItem}>
                <Link
                  href={`/notes/filter/${tag}`}
                  className={css.menuLink}
                  style={
                    isActive
                      ? {
                          backgroundColor: "#333333",
                          color: "white",
                          fontWeight: "600",
                        }
                      : {}
                  }
                >
                  {tag === "all" ? "All notes" : tag}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
