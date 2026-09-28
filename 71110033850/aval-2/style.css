:root {
  --primary: #6c5ce7;
  --primary-dark: #5848d6;
  --background: #f7f8fc;
  --card: #ffffff;
  --text: #1e2330;
  --muted: #697386;
  --border: #e6e8ef;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background: var(--background);
  color: var(--text);
  line-height: 1.6;
}

header {
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.navbar {
  max-width: 1150px;
  margin: auto;
  padding: 18px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar h1 {
  font-size: 25px;
}

.navbar h1 span {
  color: var(--primary);
}

.navbar ul {
  list-style: none;
  display: flex;
  gap: 28px;
}

.navbar a {
  text-decoration: none;
  color: var(--text);
  font-weight: 600;
  transition: 0.2s;
}

.navbar a:hover {
  color: var(--primary);
}

#tema {
  border: 0;
  background: #f0efff;
  padding: 9px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
}

.hero {
  max-width: 1150px;
  margin: auto;
  min-height: 600px;
  padding: 80px 25px;
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 70px;
  align-items: center;
}

.tag,
.section-title span {
  color: var(--primary);
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 2px;
}

.hero h2 {
  font-size: clamp(42px, 6vw, 70px);
  line-height: 1.05;
  margin: 20px 0;
}

.hero h2 strong {
  color: var(--primary);
}

.hero p {
  color: var(--muted);
  max-width: 600px;
  font-size: 18px;
  margin-bottom: 30px;
}

.btn {
  display: inline-block;
  background: var(--primary);
  color: white;
  text-decoration: none;
  padding: 14px 23px;
  border-radius: 10px;
  font-weight: bold;
  transition: 0.2s;
}

.btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.hero-card {
  background: linear-gradient(145deg, #6c5ce7, #8e7dff);
  color: white;
  border-radius: 25px;
  padding: 45px;
  box-shadow: 0 25px 60px rgba(108, 92, 231, 0.3);
}

.hero-card .icon {
  font-size: 55px;
  margin-bottom: 25px;
}

.hero-card h3 {
  font-size: 28px;
  margin-bottom: 10px;
}

.hero-card p {
  color: #eeeaff;
  font-size: 16px;
}

.section {
  max-width: 1150px;
  margin: auto;
  padding: 90px 25px;
}

.section-title {
  text-align: center;
  margin-bottom: 45px;
}

.section-title h2 {
  font-size: 38px;
  margin: 8px 0;
}

.section-title p {
  color: var(--muted);
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.stat-card,
.profession-card,
.steps > div {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 28px;
  transition: 0.25s;
}

.stat-card:hover,
.profession-card:hover,
.steps > div:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.07);
}

.stat-card > div {
  font-size: 32px;
  margin-bottom: 12px;
}

.stat-card h3 {
  margin-bottom: 8px;
}

.stat-card p,
.profession-card p,
.steps p {
  color: var(--muted);
}

.controls {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.controls input,
.controls select {
  width: 100%;
  border: 1px solid var(--border);
  background: white;
  border-radius: 10px;
  padding: 14px 16px;
  font-size: 15px;
  outline: none;
}

.controls input:focus,
.controls select:focus {
  border-color: var(--primary);
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.profession-card .emoji {
  font-size: 38px;
  margin-bottom: 15px;
}

.profession-card h3 {
  margin-bottom: 5px;
}

.area {
  display: inline-block;
  margin: 15px 0;
  padding: 5px 10px;
  border-radius: 20px;
  background: #efedff;
  color: var(--primary);
  font-size: 12px;
  font-weight: bold;
}

.profession-card .salary {
  font-weight: bold;
  color: #20a46b;
}

.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.steps strong {
  color: var(--primary);
  font-size: 28px;
}

.steps h3 {
  margin: 10px 0;
}

footer {
  text-align: center;
  padding: 30px;
  background: #171a25;
  color: #aeb3c2;
}

/* Modo escuro */
body.dark {
  --background: #11131b;
  --card: #1a1d27;
  --text: #f4f5f8;
  --muted: #a5aaba;
  --border: #2b2f3c;
}

body.dark header {
  background: rgba(17, 19, 27, 0.95);
}

body.dark .navbar a {
  color: #f4f5f8;
}

body.dark .controls input,
body.dark .controls select {
  background: #1a1d27;
  color: white;
}

body.dark #tema {
  background: #28233f;
}

/* Responsivo */
@media (max-width: 800px) {
  .navbar ul {
    display: none;
  }

  .hero {
    grid-template-columns: 1fr;
    padding-top: 60px;
  }

  .stats,
  .cards,
  .steps {
    grid-template-columns: 1fr;
  }

  .controls {
    flex-direction: column;
  }

  .hero-card {
    padding: 30px;
  }
}
