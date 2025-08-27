import React from "react";
import styles from "./Layout.module.css";
import { useNavigate } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Layout wraps screen content with the app's viewport, status bar, app bar, and container.
 * Props:
 * - title: string - title shown in the app bar
 * - showBack: boolean - show a back button that navigates -1
 * - rightSlot: ReactNode - node rendered on the right area of the app bar
 * - children: ReactNode - main content inside the viewport
 */
export default function Layout({ title, showBack = false, rightSlot = null, children }) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <main className={styles.viewport} role="main" aria-label={`${title} screen`}>
        <div className={styles.statusBar} aria-hidden="true">
          <div className={styles.time}>9:41</div>
          <div className={styles.indicators}>•••</div>
        </div>

        <header className={`${styles.appBar}`}>
          {showBack && (
            <button
              className={styles.backButton}
              aria-label="Go back"
              onClick={() => navigate(-1)}
            />
          )}
          <h1 className={styles.appBarTitle}>{title}</h1>
          {rightSlot}
        </header>

        <section className={styles.content}>{children}</section>
      </main>
    </div>
  );
}
