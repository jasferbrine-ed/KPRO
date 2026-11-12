@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap");

:root {
  --sn-bg: #06100c;
  --sn-gold: #d5ad55;
  --sn-gold-light: #f4d995;
  --sn-green: #21c477;
  --sn-red: #e45b5b;
  --sn-text: #f2f5ef;
  --sn-muted: #9aa99e;
  --sn-glass: rgba(18, 34, 25, 0.58);
  --sn-border: rgba(224, 187, 101, 0.24);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--sn-bg);
  color: var(--sn-text);
  font-family: "Inter", sans-serif;
}

button,
input,
select,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

.sn-app {
  min-height: 100vh;
  color: var(--sn-text);
  background:
    radial-gradient(ellipse at 15% 0%, rgba(19, 107, 65, 0.2), transparent 38%),
    radial-gradient(ellipse at 90% 30%, rgba(183, 137, 48, 0.08), transparent 35%),
    linear-gradient(135deg, #06100c, #0a1710 55%, #07100c);
}

/* LOGIN SCREEN */

.sn-login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 35px 9%;
  background:
    linear-gradient(90deg, rgba(2, 8, 5, 0.08), rgba(2, 8, 5, 0.38)),
    url("/snooker-login.png") center / cover no-repeat,
    #06100c;
  font-family: "Inter", sans-serif;
}

.sn-login-box {
  width: 100%;
  max-width: 365px;
  padding: 32px;
  border: 1px solid rgba(230, 190, 99, 0.82);
  border-radius: 19px;
  background: rgba(5, 15, 10, 0.30);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.32);
  animation: snLoginIn 0.8s ease both;
}

@keyframes snLoginIn {
  from {
    opacity: 0;
    transform: translateX(35px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.sn-login-mark {
  width: 53px;
  height: 53px;
  display: grid;
  place-items: center;
  margin-bottom: 20px;
  border: 1px solid var(--sn-gold);
  border-radius: 50%;
  color: var(--sn-gold-light);
  font-size: 30px;
  background: rgba(213, 173, 85, 0.08);
}

.sn-login-box h1 {
  margin: 9px 0 5px;
  font-family: "Outfit", sans-serif;
  font-size: 29px;
  letter-spacing: 1px;
}

.sn-login-box p {
  margin: 0 0 24px;
  color: #d0d8d1;
  font-size: 12px;
}

.sn-login-box label,
.sn-form label,
.sn-field,
.sn-player-card label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #d2dbd3;
  font-size: 12px;
  font-weight: 600;
}

.sn-login-box input,
.sn-form input,
.sn-form select,
.sn-form textarea,
.sn-field input,
.sn-field select,
.sn-player-card input {
  width: 100%;
  min-width: 0;
  padding: 12px 13px;
  border: 1px solid rgba(213, 173, 85, 0.25);
  border-radius: 9px;
  outline: none;
  background: rgba(4, 13, 8, 0.68);
  color: #fff;
  font-size: 13px;
  transition: 0.25s ease;
}

.sn-login-box input {
  margin: 8px 0 16px;
  background: rgba(4, 13, 8, 0.38);
}

.sn-login-box input:focus,
.sn-form input:focus,
.sn-form select:focus,
.sn-form textarea:focus,
.sn-field input:focus,
.sn-field select:focus,
.sn-player-card input:focus {
  border-color: var(--sn-gold);
  box-shadow: 0 0 0 3px rgba(213, 173, 85, 0.1);
}

.sn-login-box input::placeholder,
.sn-form input::placeholder,
.sn-player-card input::placeholder {
  color: #87958a;
}

.sn-login-submit {
  width: 100%;
  margin-top: 10px;
}

.sn-login-hint {
  display: block;
  margin-top: 16px;
  color: #d0d7d0;
  text-align: center;
  font-size: 10px;
}

.sn-error {
  margin: 0 0 12px;
  color: #ff9696;
  font-size: 12px;
}

/* HEADER */

.sn-topbar {
  position: relative;
  z-index: 5;
  min-height: 78px;
  padding: 12px 4%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid var(--sn-border);
  background: rgba(7, 19, 12, 0.72);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.sn-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sn-brand-icon {
  width: 45px;
  height: 45px;
  display: grid;
  place-items: center;
  border: 1px solid var(--sn-gold);
  border-radius: 13px;
  color: var(--sn-gold-light);
  background: rgba(213, 173, 85, 0.08);
  font-size: 25px;
  box-shadow: 0 0 22px rgba(213, 173, 85, 0.08);
}

.sn-brand b,
.sn-brand small {
  display: block;
}

.sn-brand b {
  font-family: "Outfit", sans-serif;
  font-size: 16px;
  letter-spacing: 1px;
}

.sn-brand small {
  margin-top: 4px;
  color: var(--sn-muted);
  font-size: 9px;
  letter-spacing: 2px;
}

.sn-topbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--sn-muted);
  font-size: 10px;
  font-weight: 700;
}

.sn-live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--sn-green);
  box-shadow: 0 0 12px var(--sn-green);
  animation: snPulse 1.8s infinite;
}

@keyframes snPulse {
  50% {
    box-shadow: 0 0 3px var(--sn-green), 0 0 15px var(--sn-green);
  }
}

.sn-date {
  margin: 0 10px;
  color: #d1d9d1;
  font-size: 11px;
  font-weight: 500;
}

/* NAVBAR */

.sn-navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 4%;
  overflow-x: auto;
  border-bottom: 1px solid rgba(213, 173, 85, 0.18);
  background: rgba(8, 23, 14, 0.76);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  scrollbar-width: thin;
  scrollbar-color: #82632f transparent;
}

.sn-navbar button {
  position: relative;
  flex: 0 0 auto;
  padding: 13px 16px;
  border: 1px solid transparent;
  border-radius: 9px;
  background: transparent;
  color: #a6b2a8;
  cursor: pointer;
  font-size: 11px;
  font-weight: 700;
  transition: 0.28s ease;
}

.sn-navbar button:hover {
  color: var(--sn-gold-light);
  background: rgba(213, 173, 85, 0.07);
}

.sn-navbar button.selected {
  border-color: rgba(213, 173, 85, 0.42);
  color: #ffe4a5;
  background: linear-gradient(
    135deg,
    rgba(213, 173, 85, 0.18),
    rgba(213, 173, 85, 0.045)
  );
  box-shadow:
    inset 0 0 15px rgba(213, 173, 85, 0.06),
    0 4px 18px rgba(0, 0, 0, 0.15);
}

.sn-navbar button.selected::after {
  position: absolute;
  right: 17px;
  bottom: -9px;
  left: 17px;
  height: 2px;
  border-radius: 10px;
  background: var(--sn-gold-light);
  box-shadow: 0 0 10px var(--sn-gold);
  content: "";
}

/* MAIN CONTENT */

.sn-main {
  width: 100%;
  max-width: 1650px;
  margin: auto;
  padding: 32px 4% 60px;
}

.sn-page-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 25px;
}

.sn-small-label {
  color: var(--sn-gold);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 2px;
}

.sn-page-heading h1 {
  margin: 6px 0;
  font-family: "Outfit", sans-serif;
  font-size: 31px;
  font-weight: 700;
}

.sn-page-heading p {
  margin: 0;
  color: var(--sn-muted);
  font-size: 12px;
}

.sn-heading-date {
  padding: 10px 14px;
  border: 1px solid var(--sn-border);
  border-radius: 9px;
  color: var(--sn-gold-light);
  background: var(--sn-glass);
  font-size: 12px;
  backdrop-filter: blur(12px);
}

.sn-notice {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
  padding: 13px 16px;
  border: 1px solid rgba(33, 196, 119, 0.3);
  border-radius: 10px;
  background: rgba(33, 196, 119, 0.09);
  color: #a8f0c9;
  font-size: 12px;
}

.sn-notice button {
  border: 0;
  background: transparent;
  color: white;
  cursor: pointer;
  font-size: 20px;
}

/* BUTTONS */

.sn-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 39px;
  padding: 10px 15px;
  border: 1px solid transparent;
  border-radius: 9px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 800;
  transition: 0.22s ease;
}

.sn-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.12);
}

.sn-btn:active {
  transform: translateY(0);
}

.sn-btn-gold {
  border-color: #e0bd70;
  background: linear-gradient(135deg, #f3d78f, #bd8b35);
  color: #172015;
  box-shadow: 0 6px 20px rgba(189, 139, 53, 0.13);
}

.sn-btn-green {
  background: linear-gradient(135deg, #26d184, #11884f);
  color: white;
}

.sn-btn-red {
  background: linear-gradient(135deg, #ed6868, #a92d37);
  color: white;
}

.sn-btn-outline {
  border-color: rgba(213, 173, 85, 0.48);
  background: rgba(213, 173, 85, 0.045);
  color: var(--sn-gold-light);
}

.sn-logout {
  min-height: 33px;
  padding: 7px 12px;
}

/* GLASS PANELS */

.sn-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 23px;
}

.sn-metric,
.sn-panel,
.sn-table-card {
  border: 1px solid var(--sn-border);
  background: var(--sn-glass);
  backdrop-filter: blur(17px);
  -webkit-backdrop-filter: blur(17px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.sn-metric {
  position: relative;
  min-height: 125px;
  padding: 19px;
  overflow: hidden;
  border-radius: 15px;
  transition: 0.25s ease;
}

.sn-metric:hover {
  transform: translateY(-3px);
  border-color: rgba(213, 173, 85, 0.48);
}

.sn-metric::after {
  position: absolute;
  top: -35px;
  right: -30px;
  width: 105px;
  height: 105px;
  border: 1px solid rgba(213, 173, 85, 0.17);
  border-radius: 50%;
  content: "";
}

.sn-metric span,
.sn-metric strong,
.sn-metric small {
  display: block;
}

.sn-metric span {
  color: var(--sn-muted);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
}

.sn-metric strong {
  margin: 13px 0 6px;
  color: var(--sn-gold-light);
  font-family: "Outfit", sans-serif;
  font-size: 25px;
}

.sn-metric small {
  color: #829187;
  font-size: 10px;
}

.sn-panel {
  min-width: 0;
  margin-bottom: 22px;
  padding: 23px;
  border-radius: 15px;
  animation: snPanelIn 0.4s ease both;
}

@keyframes snPanelIn {
  from {
    opacity: 0;
    transform: translateY(9px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.sn-panel h2,
.sn-modal h2 {
  margin: 6px 0 20px;
  color: #f1f5ee;
  font-family: "Outfit", sans-serif;
  font-size: 21px;
}

.sn-panel-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 18px;
}

.sn-panel-heading h2 {
  margin-bottom: 0;
}

.sn-panel-heading > strong {
  color: var(--sn-gold-light);
  font-size: 15px;
}

/* TABLE CARDS */

.sn-table-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 17px;
}

.sn-table-card {
  position: relative;
  min-width: 0;
  padding: 17px;
  overflow: hidden;
  border-radius: 15px;
  transition: 0.28s ease;
}

.sn-table-card:hover {
  transform: translateY(-5px);
  border-color: rgba(230, 190, 99, 0.65);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.32);
}

.sn-table-card.is-active {
  border-color: rgba(33, 196, 119, 0.65);
  box-shadow:
    0 0 0 1px rgba(33, 196, 119, 0.08),
    0 15px 35px rgba(0, 0, 0, 0.22);
}

.sn-table-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.sn-table-card-top h3 {
  margin: 5px 0 0;
  font-family: "Outfit", sans-serif;
  font-size: 20px;
}

.sn-status {
  padding: 6px 9px;
  border-radius: 30px;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.6px;
}

.sn-status.active {
  background: rgba(33, 196, 119, 0.14);
  color: #48e49b;
}

.sn-status.inactive {
  background: rgba(160, 170, 160, 0.12);
  color: #a8b4aa;
}

/* SNOOKER TABLE VISUAL */

.sn-table-surface {
  position: relative;
  height: 115px;
  margin: 17px 0;
  overflow: hidden;
  border: 8px solid #63472a;
  border-radius: 9px;
  background:
    radial-gradient(ellipse at center, rgba(38, 150, 91, 0.38), transparent 70%),
    linear-gradient(135deg, #087443, #075632 55%, #06482a);
  box-shadow:
    inset 0 0 0 2px rgba(255, 255, 255, 0.13),
    0 7px 0 #39291b,
    0 12px 18px rgba(0, 0, 0, 0.3);
}

.sn-table-pocket {
  position: absolute;
  z-index: 2;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #07110c;
  box-shadow: inset 0 1px 3px #000;
}

.sn-table-pocket.p1 { top: -3px; left: -3px; }
.sn-table-pocket.p2 { top: -3px; right: -3px; }
.sn-table-pocket.p3 { bottom: -3px; left: -3px; }
.sn-table-pocket.p4 { bottom: -3px; right: -3px; }
.sn-table-pocket.p5 { top: -3px; left: 50%; transform: translateX(-50%); }
.sn-table-pocket.p6 { bottom: -3px; left: 50%; transform: translateX(-50%); }

.sn-table-center-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
}

.sn-table-number {
  position: absolute;
  top: 50%;
  left: 50%;
  color: rgba(255, 255, 255, 0.15);
  font-family: "Outfit", sans-serif;
  font-size: 48px;
  font-weight: 800;
  transform: translate(-50%, -50%);
}

.sn-table-timer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 11px 12px;
  border: 1px solid rgba(213, 173, 85, 0.17);
  border-radius: 9px;
  background: rgba(0, 0, 0, 0.22);
}

.sn-table-timer span {
  color: var(--sn-muted);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1px;
}

.sn-table-timer strong {
  color: var(--sn-gold-light);
  font-family: "Outfit", sans-serif;
  font-size: 19px;
  font-variant-numeric: tabular-nums;
}

.sn-table-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 15px 0;
}

.sn-table-details div {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 9px;
  border: 1px solid rgba(255, 255, 255, 0.035);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.035);
}

.sn-table-details span {
  color: var(--sn-muted);
  font-size: 9px;
}

.sn-table-details b {
  color: #e5ece5;
  font-size: 11px;
}

/* SINGLE / DOUBLE / NUMBRI CHOICES */

.sn-card-game-options {
  margin: 14px 0;
  padding: 11px;
  border: 1px solid rgba(213, 173, 85, 0.16);
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.13);
}

.sn-game-chips {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin-top: 9px;
}

.sn-game-chips button {
  min-width: 0;
  padding: 9px 5px;
  border: 1px solid rgba(213, 173, 85, 0.24);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.035);
  color: #bdc9bf;
  font-size: 10px;
  font-weight: 800;
  transition: 0.2s;
}

.sn-game-chips button:hover,
.sn-game-chips button.chosen {
  border-color: var(--sn-gold);
  background: rgba(213, 173, 85, 0.14);
  color: var(--sn-gold-light);
}

.sn-table-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.sn-table-actions .sn-btn {
  padding: 9px 7px;
  font-size: 10px;
}

.sn-transfer-link {
  display: block;
  margin: 12px auto 0;
  border: 0;
  background: transparent;
  color: var(--sn-gold);
  cursor: pointer;
  font-size: 10px;
  font-weight: 700;
}

.sn-transfer-link:disabled {
  cursor: not-allowed;
  opacity: 0.3;
}

/* INCOME CHART */

.sn-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  gap: 14px;
  min-height: 220px;
  padding: 20px 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sn-chart-column {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  height: 190px;
}

.sn-chart-column > span {
  color: #cbd6ca;
  font-size: 9px;
}

.sn-chart-track {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: min(48px, 70%);
  height: 130px;
  overflow: hidden;
  border-radius: 6px 6px 0 0;
  background: rgba(255, 255, 255, 0.05);
}

.sn-chart-track div {
  width: 100%;
  min-height: 2px;
  border-radius: 6px 6px 0 0;
  background: linear-gradient(180deg, #f0d28a, #9b702a);
  transition: height 0.3s;
}

.sn-chart-column small {
  color: var(--sn-muted);
  font-size: 10px;
}

/* FORMS AND TWO COLUMN LAYOUT */

.sn-two-column {
  display: grid;
  grid-template-columns: minmax(260px, 0.85fr) minmax(0, 1.4fr);
  gap: 20px;
  align-items: start;
}

.sn-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.sn-form textarea {
  min-height: 75px;
  resize: vertical;
}

.sn-form .sn-btn {
  margin-top: 5px;
}

/* RECORDS */

.sn-record-list {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.sn-record {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 13px;
  border: 1px solid rgba(213, 173, 85, 0.13);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.035);
}

.sn-record > div {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.sn-record b {
  color: #e9eee8;
  font-size: 12px;
}

.sn-record small {
  color: var(--sn-muted);
  font-size: 10px;
}

.sn-record > strong {
  flex: 0 0 auto;
  color: var(--sn-gold-light);
  font-size: 12px;
}

.sn-red-text {
  color: #ff8585 !important;
}

.sn-record select {
  max-width: 125px;
  padding: 8px;
  border: 1px solid var(--sn-border);
  border-radius: 7px;
  background: #102018;
  color: white;
  font-size: 10px;
}

/* DATA TABLES */

.sn-table-wrap {
  width: 100%;
  overflow-x: auto;
}

.sn-data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  white-space: nowrap;
}

.sn-data-table th {
  padding: 13px;
  border-bottom: 1px solid var(--sn-border);
  color: var(--sn-gold);
  font-size: 10px;
  letter-spacing: 0.5px;
}

.sn-data-table td {
  padding: 14px 13px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  color: #d5ded6;
  font-size: 11px;
}

.sn-data-table tbody tr:hover {
  background: rgba(213, 173, 85, 0.035);
}

.sn-empty {
  padding: 20px;
  color: var(--sn-muted);
  text-align: center;
  font-size: 12px;
}

/* BACKUP */

.sn-backup-panel {
  max-width: 720px;
}

.sn-backup-panel p {
  color: var(--sn-muted);
  font-size: 12px;
  line-height: 1.7;
}

.sn-upload-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 39px;
  margin-left: 10px;
  padding: 10px 15px;
  border: 1px solid var(--sn-gold);
  border-radius: 9px;
  color: var(--sn-gold-light);
  cursor: pointer;
  font-size: 11px;
  font-weight: 800;
}

.sn-upload-label input {
  display: none;
}

.sn-backup-panel .sn-warning {
  margin-top: 20px;
  color: #e4bd70;
  font-size: 11px;
}

/* MODALS */

.sn-modal-backdrop {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.76);
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
}

.sn-modal {
  position: relative;
  width: 100%;
  max-width: 780px;
  max-height: 92vh;
  padding: 28px;
  overflow-y: auto;
  border: 1px solid rgba(213, 173, 85, 0.43);
  border-radius: 17px;
  background: rgba(13, 29, 19, 0.94);
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 90px rgba(0, 0, 0, 0.6);
  animation: snPanelIn 0.25s ease both;
}

.sn-modal-close {
  position: absolute;
  top: 13px;
  right: 16px;
  width: 32px;
  height: 32px;
  border: 1px solid var(--sn-border);
  border-radius: 50%;
  background: transparent;
  color: white;
  cursor: pointer;
  font-size: 21px;
}

.sn-mode-switch {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 18px;
}

.sn-mode-switch button {
  padding: 12px;
  border: 1px solid var(--sn-border);
  border-radius: 9px;
  background: rgba(0, 0, 0, 0.2);
  color: #b7c3b8;
  cursor: pointer;
  font-size: 11px;
  font-weight: 700;
}

.sn-mode-switch button.chosen {
  border-color: var(--sn-gold);
  background: rgba(213, 173, 85, 0.12);
  color: var(--sn-gold-light);
}

.sn-field {
  margin-bottom: 15px;
}

.sn-field-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 13px;
}

.sn-numbri-rate {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-bottom: 17px;
  padding: 16px;
  border: 1px solid rgba(33, 196, 119, 0.25);
  border-radius: 10px;
  background: rgba(33, 196, 119, 0.07);
}

.sn-numbri-rate span {
  color: var(--sn-muted);
  font-size: 9px;
  letter-spacing: 1px;
}

.sn-numbri-rate strong {
  color: #63e7a6;
  font-family: "Outfit", sans-serif;
  font-size: 22px;
}

.sn-numbri-rate small {
  color: var(--sn-muted);
  font-size: 10px;
}

.sn-player-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 13px;
  margin-top: 10px;
}

.sn-player-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 15px;
  border: 1px solid var(--sn-border);
  border-radius: 11px;
  background: rgba(0, 0, 0, 0.17);
}

.sn-player-balance {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  background: rgba(213, 173, 85, 0.07);
  color: var(--sn-muted);
  font-size: 10px;
}

.sn-player-balance b {
  color: var(--sn-gold-light);
  font-size: 13px;
}

.sn-score-row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  color: var(--sn-muted);
  font-size: 10px;
}

.sn-score-row b {
  margin-right: auto;
  color: var(--sn-gold-light);
  font-size: 17px;
}

.sn-score-row button {
  padding: 7px 9px;
  border: 0;
  border-radius: 6px;
  background: #147e4c;
  color: white;
  cursor: pointer;
  font-size: 9px;
  font-weight: 800;
}

.sn-score-row button.sn-score-lose {
  background: #a92d37;
}

.sn-modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-top: 22px;
  padding-top: 17px;
  border-top: 1px solid var(--sn-border);
}

.sn-modal-footer div {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.sn-modal-footer span {
  color: var(--sn-muted);
  font-size: 10px;
}

.sn-modal-footer strong {
  color: var(--sn-gold-light);
  font-size: 16px;
}

.sn-modal-stop {
  width: 100%;
  margin-top: 13px;
}

.sn-transfer-modal {
  max-width: 430px;
}

/* RESPONSIVE */

@media (max-width: 1100px) {
  .sn-table-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sn-metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .sn-topbar {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
    padding: 14px 5%;
  }

  .sn-topbar-right {
    width: 100%;
    flex-wrap: wrap;
  }

  .sn-navbar {
    padding: 7px 4%;
  }

  .sn-navbar button {
    padding: 11px 12px;
    font-size: 10px;
  }

  .sn-main {
    padding: 24px 4% 45px;
  }

  .sn-page-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .sn-page-heading h1 {
    font-size: 26px;
  }

  .sn-two-column {
    grid-template-columns: 1fr;
  }

  .sn-player-grid {
    grid-template-columns: 1fr;
  }

  .sn-modal {
    padding: 23px 17px;
  }
}

@media (max-width: 520px) {
  .sn-login-page {
    justify-content: center;
    padding: 20px;
    background-position: 38% center;
  }

  .sn-login-box {
    max-width: 350px;
    padding: 27px 23px;
    background: rgba(5, 15, 10, 0.48);
  }

  .sn-metrics {
    grid-template-columns: 1fr 1fr;
    gap: 9px;
  }

  .sn-metric {
    min-height: 112px;
    padding: 13px;
  }

  .sn-metric strong {
    font-size: 19px;
  }

  .sn-metric span {
    font-size: 8px;
  }

  .sn-metric small {
    font-size: 9px;
  }

  .sn-table-grid {
    grid-template-columns: 1fr;
  }

  .sn-panel {
    padding: 16px;
  }

  .sn-field-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .sn-modal-footer {
    align-items: stretch;
    flex-direction: column;
  }

  .sn-modal-footer .sn-btn {
    width: 100%;
  }

  .sn-chart {
    gap: 6px;
  }

  .sn-chart-column > span {
    font-size: 7px;
  }

  .sn-upload-label {
    margin: 10px 0 0;
  }
}