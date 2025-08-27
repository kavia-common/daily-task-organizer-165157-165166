import React, { useMemo } from "react";
import Layout from "../components/Layout";
import layoutStyles from "../components/Layout.module.css";
import cardStyles from "../components/Card.module.css";

/**
 * PUBLIC_INTERFACE
 * CompletedTask: Shows only completed tasks.
 * Props:
 * - todos: [{id,title,subtitle,status}]
 */
export default function CompletedTask({ todos }) {
  const completed = useMemo(() => {
    const base = todos && Array.isArray(todos) ? todos : [
      { id: "1", title: "TODO TITLE", subtitle: "TODO SUB TITLE", status: "completed" },
      { id: "2", title: "TODO TITLE", subtitle: "TODO SUB TITLE", status: "completed" },
      { id: "3", title: "TODO TITLE", subtitle: "TODO SUB TITLE", status: "completed" }
    ];
    return base.filter(t => t.status === "completed");
  }, [todos]);

  return (
    <Layout title="Completed Task" showBack>
      <section className={layoutStyles.content} id="completed-list">
        {completed.map((t, idx) => (
          <article
            className={cardStyles.card}
            key={t.id || idx}
            style={{ marginTop: idx === 0 ? 27 : undefined }}
          >
            <h2 className={cardStyles.title}>{t.title}</h2>
            <p className={cardStyles.subtitle}>{t.subtitle}</p>
          </article>
        ))}
      </section>
    </Layout>
  );
}
