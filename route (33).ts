@import "tailwindcss";

:root {
  --background: #0b0b0b;
  --foreground: #ffffff;

  --card: rgba(255, 255, 255, 0.08);
  --card-border: rgba(255, 255, 255, 0.12);

  --primary: #ff6b00;
  --primary-2: #ff8c00;
  --muted: rgba(255, 255, 255, 0.7);
  --muted-2: rgba(255, 255, 255, 0.55);
  --success: #22c55e;
  --danger: #ef4444;
}

html.light {
  --background: #ffffff;
  --foreground: #0b0b0b;
  --card: rgba(17, 24, 39, 0.06);
  --card-border: rgba(17, 24, 39, 0.12);
  --muted: rgba(11, 11, 11, 0.72);
  --muted-2: rgba(11, 11, 11, 0.58);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-2: var(--primary-2);
  --color-card: var(--card);
  --color-card-border: var(--card-border);
  --color-muted: var(--muted);
  --color-muted-2: var(--muted-2);
  --color-success: var(--success);
  --color-danger: var(--danger);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0b0b0b;
    --foreground: #ffffff;
  }
}

body {
  background: radial-gradient(
      1200px 600px at 20% 15%,
      rgba(255, 107, 0, 0.24),
      transparent 55%
    ),
    radial-gradient(
      900px 500px at 85% 30%,
      rgba(255, 140, 0, 0.14),
      transparent 55%
    ),
    var(--background);
  color: var(--foreground);
}

/* Utility classes (keep in CSS to avoid Tailwind plugin overhead) */
.glass {
  background: var(--card);
  border: 1px solid var(--card-border);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.orange-glow {
  box-shadow: 0 0 0 1px rgba(255, 107, 0, 0.35),
    0 0 45px rgba(255, 107, 0, 0.18);
}

.text-muted {
  color: var(--muted);
}

.text-muted-2 {
  color: var(--muted-2);
}
