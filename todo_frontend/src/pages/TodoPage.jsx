import React, { useMemo } from "react";
import Layout from "../components/Layout";
import layoutStyles from "../components/Layout.module.css";
import cardStyles from "../components/Card.module.css";
import styles from "./TodoPage.module.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * TodoPage: Displays the list of todos with All/Completed filters and actions.
 * Accepts optional initial todos via props, otherwise uses demo data.
 */
export default function TodoPage({ todos, onToggle, onDelete }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "all";

  // Demo fallback data
  const data = useMemo(() => {
    const base = todos && Array.isArray(todos) && todos.length
      ? todos
      : [
          { id: "1", title: "TODO TITLE", subtitle: "TODO SUB TITLE", status: "active" },
          { id: "2", title: "TODO TITLE", subtitle: "TODO SUB TITLE", status: "active" },
          { id: "3", title: "TODO TITLE", subtitle: "TODO SUB TITLE", status: "completed" },
          { id: "4", title: "TODO TITLE", subtitle: "TODO SUB TITLE", status: "active" }
        ];
    return base;
  }, [todos]);

  const filtered = data.filter(t => filter === "all" ? true : t.status === "completed");

  return (
    <Layout
      title="TODO APP"
      rightSlot={<div className={styles.appBarCalendar} aria-hidden="true" title="Calendar" />}
    >
      <nav className={styles.bottomNav} aria-label="Todo filters">
        <Link
          className={`${styles.navBtn} ${styles.all} ${filter === "all" ? styles.active : ""}`}
          to="/?filter=all"
          aria-pressed={filter === "all" ? "true" : "false"}
          aria-label="All"
        >
          <span className={`${styles.icon} ${styles.playlist}`} aria-hidden="true" />
          <span className={styles.label}>All</span>
        </Link>
        <Link
          className={`${styles.navBtn} ${styles.completed} ${filter === "completed" ? styles.active : ""}`}
          to="/?filter=completed"
          aria-pressed={filter === "completed" ? "true" : "false"}
          aria-label="Completed"
        >
          <span className={`${styles.icon} ${styles.tick}`} aria-hidden="true" />
          <span className={styles.label}>Completed</span>
        </Link>
      </nav>

      <section className={layoutStyles.content} id="todo-list">
        {filtered.map((t) => (
          <article className={cardStyles.card} data-status={t.status} key={t.id} style={{ opacity: t.status === "completed" ? 0.6 : 1 }}>
            <div className={cardStyles.cardRow}>
              <div className={cardStyles.titles}>
                <h2 className={cardStyles.title}>{t.title}</h2>
                <p className={cardStyles.subtitle}>{t.subtitle}</p>
              </div>
              <div className={cardStyles.actions}>
                <button
                  className={`${cardStyles.iconBtn} ${cardStyles.iconEdit}`}
                  aria-label="Edit todo"
                  onClick={() => navigate(`/edit/${t.id}`)}
                />
                <button
                  className={`${cardStyles.iconBtn} ${cardStyles.iconDelete}`}
                  aria-label="Delete todo"
                  onClick={() => (onDelete ? onDelete(t.id) : null)}
                />
                <button
                  className={`${cardStyles.iconBtn} ${cardStyles.iconCheck}`}
                  aria-label="Mark as done"
                  onClick={() => (onToggle ? onToggle(t.id) : null)}
                />
              </div>
            </div>
          </article>
        ))}
      </section>

      <button
        className={styles.fabAdd}
        id="fab-add"
        aria-label="Add New ToDo"
        onClick={() => navigate("/add")}
      />
    </Layout>
  );
}
