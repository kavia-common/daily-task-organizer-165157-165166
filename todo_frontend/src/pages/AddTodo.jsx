import React, { useState } from "react";
import Layout from "../components/Layout";
import styles from "./FormPages.module.css";

/**
 * PUBLIC_INTERFACE
 * AddTodo: Form to add a new task with Title and Detail fields.
 * Props:
 * - onAdd: function({title, detail}) -> void
 */
export default function AddTodo({ onAdd }) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAdd) onAdd({ title, detail });
    setTitle("");
    setDetail("");
  };

  return (
    <Layout title="Add Task" showBack>
      <form onSubmit={handleSubmit}>
        <div className={styles.fieldGroup} style={{ marginTop: 34 }}>
          <label className={styles.fieldLabel} htmlFor="add-title">Title</label>
          <div className={styles.fieldUnderline}>
            <input
              id="add-title"
              className={styles.fieldInput}
              type="text"
              placeholder="Enter ToDo Title"
              aria-label="ToDo Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.fieldGroup} style={{ marginTop: 32 }}>
          <label className={styles.fieldLabel} htmlFor="add-detail">Detail</label>
          <div className={styles.fieldUnderline}>
            <input
              id="add-detail"
              className={styles.fieldInput}
              type="text"
              placeholder="Enter ToDo Detail"
              aria-label="ToDo Detail"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.buttonBlock}>
          <button className={styles.ctaBtn} aria-label="Add todo" type="submit">
            <span className={styles.ctaText}>ADD</span>
          </button>
        </div>
      </form>
    </Layout>
  );
}
