import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import styles from "./FormPages.module.css";
import { useNavigate, useParams } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * EditTodo: Form to edit an existing task.
 * Props:
 * - loadTodo: function(id) -> {title, detail}
 * - onUpdate: function(id, {title, detail}) -> void
 */
export default function EditTodo({ loadTodo, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    if (loadTodo && id) {
      const t = loadTodo(id);
      if (t) {
        setTitle(t.title || "");
        setDetail(t.detail || "");
      }
    }
  }, [id, loadTodo]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (onUpdate && id) {
      onUpdate(id, { title, detail });
    }
    navigate("/");
  };

  return (
    <Layout title="Edit Task" showBack>
      <form onSubmit={handleUpdate}>
        <div className={styles.fieldGroup} style={{ marginTop: 34 }}>
          <label className={styles.fieldLabel} htmlFor="todo-title">Title</label>
          <div className={styles.fieldUnderline}>
            <input
              id="todo-title"
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
          <label className={styles.fieldLabel} htmlFor="todo-detail">Detail</label>
          <div className={styles.fieldUnderline}>
            <input
              id="todo-detail"
              className={styles.fieldInput}
              type="text"
              placeholder="Enter ToDo Detail"
              aria-label="ToDo Detail"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.buttonRow}>
          <button className={styles.ctaBtn} aria-label="Update todo" type="submit">
            <span className={styles.ctaText}>Update</span>
          </button>
          <button
            className={styles.ctaBtn}
            aria-label="Cancel editing"
            type="button"
            onClick={() => navigate(-1)}
          >
            <span className={styles.ctaText}>Cancel</span>
          </button>
        </div>
      </form>
    </Layout>
  );
}
