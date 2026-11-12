import React, { useEffect, useMemo, useState } from "react";

const KEYS = {
  tables: "snooker_tables",
  income: "snooker_income",
  expenses: "snooker_expenses",
  udhar: "snooker_udhar",
  bookings: "snooker_bookings",
  history: "snooker_history",
};

const freshPlayers = () => [
  { name: "", charge: 0, paid: 0, score: 0 },
  { name: "", charge: 0, paid: 0, score: 0 },
];

const defaultTables = () =>
  Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    name: `Table ${i + 1}`,
    status: "UNACTIVE",
    mode: "frame",
    game: "Single Frame",
    red: "6 Red",
    rate: 100,
    discount: 0,
    startedAt: null,
    players: freshPlayers(),
  }));

const readStore = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const money = (value) =>
  `Rs. ${Number(value || 0).toLocaleString("en-PK")}`;

const elapsed = (start) =>
  start ? Math.max(0, Math.floor((Date.now() - start) / 1000)) : 0;

const timeText = (seconds) =>
  [Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), seconds % 60]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");

function TableCard({ table, onOpen, onStart, onStop, onTransfer, clock }) {
  const active = table.status === "ACTIVE";

  return (
    <article className={`sn-table-card ${active ? "is-active" : ""}`}>
      <div className="sn-table-card-top">
        <div>
          <span className="sn-small-label">SNOOKER TABLE</span>
          <h3>{table.name}</h3>
        </div>
        <span className={`sn-status ${active ? "active" : "inactive"}`}>
          {table.status}
        </span>
      </div>

      <div className="sn-table-surface">
        {["p1", "p2", "p3", "p4", "p5", "p6"].map((p) => (
          <span key={p} className={`sn-table-pocket ${p}`} />
        ))}
        <span className="sn-table-center-line" />
        <span className="sn-table-number">
          {String(table.id).padStart(2, "0")}
        </span>
      </div>

      <div className="sn-table-timer">
        <span>PLAYING TIME</span>
        <strong>
          {active ? timeText(elapsed(table.startedAt)) : "00:00:00"}
        </strong>
      </div>

      <div className="sn-table-details">
        <div><span>Game</span><b>{table.mode === "numbri" ? "Numbri Game" : table.game}</b></div>
        {table.mode !== "numbri" && (
          <div><span>Red Balls</span><b>{table.red}</b></div>
        )}
        <div>
          <span>Rate</span>
          <b>{money(table.mode === "numbri" ? 12 : table.rate)}{table.mode === "numbri" ? " / min" : ""}</b>
        </div>
        <div><span>Discount</span><b>{money(table.discount)}</b></div>
      </div>

      <div className="sn-card-game-options">
        <span className="sn-small-label">GAME OPTIONS</span>
        <div className="sn-game-chips">
          <button
            className={table.mode === "frame" && table.game === "Single Frame" ? "chosen" : ""}
            onClick={() => onOpen(table.id, "Single Frame")}
          >
            Single
          </button>
          <button
            className={table.mode === "frame" && table.game === "Double Frame" ? "chosen" : ""}
            onClick={() => onOpen(table.id, "Double Frame")}
          >
            Double
          </button>
          <button
            className={table.mode === "numbri" ? "chosen" : ""}
            onClick={() => onOpen(table.id, "Numbri Game")}
          >
            Numbri
          </button>
        </div>
      </div>

      <div className="sn-table-actions">
        {!active ? (
          <button className="sn-btn sn-btn-green" onClick={() => onStart(table.id)}>
            Start Game
          </button>
        ) : (
          <button className="sn-btn sn-btn-red" onClick={() => onStop(table.id)}>
            Stop & Bill
          </button>
        )}
        <button className="sn-btn sn-btn-outline" onClick={() => onOpen(table.id)}>
          View Details
        </button>
      </div>

      <button
        className="sn-transfer-link"
        onClick={() => onTransfer(table.id)}
        disabled={!active}
      >
        ⇄ Transfer Table
      </button>
    </article>
  );
}

function Metric({ title, value, note }) {
  return (
    <div className="sn-metric">
      <span>{title}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}

export default function Snooker() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("snookerLoggedIn") === "true"
  );
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [tables, setTables] = useState(() => readStore(KEYS.tables, defaultTables()));
  const [income, setIncome] = useState(() => readStore(KEYS.income, []));
  const [expenses, setExpenses] = useState(() => readStore(KEYS.expenses, []));
  const [udhar, setUdhar] = useState(() => readStore(KEYS.udhar, []));
  const [bookings, setBookings] = useState(() => readStore(KEYS.bookings, []));
  const [history, setHistory] = useState(() => readStore(KEYS.history, []));

  const [activeTab, setActiveTab] = useState("Dashboard");
  const [selectedTable, setSelectedTable] = useState(null);
  const [modal, setModal] = useState("");
  const [clock, setClock] = useState(Date.now());
  const [notice, setNotice] = useState("");
  const [transferTo, setTransferTo] = useState("2");

  const [expenseForm, setExpenseForm] = useState({
    title: "", amount: "", date: today(),
  });
  const [ledgerForm, setLedgerForm] = useState({
    name: "", amount: "", note: "", type: "Given",
  });
  const [bookingForm, setBookingForm] = useState({
    name: "", phone: "", table: "Table 1", date: today(), time: "", note: "",
  });

  useEffect(() => {
    const id = setInterval(() => setClock(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => localStorage.setItem(KEYS.tables, JSON.stringify(tables)), [tables]);
  useEffect(() => localStorage.setItem(KEYS.income, JSON.stringify(income)), [income]);
  useEffect(() => localStorage.setItem(KEYS.expenses, JSON.stringify(expenses)), [expenses]);
  useEffect(() => localStorage.setItem(KEYS.udhar, JSON.stringify(udhar)), [udhar]);
  useEffect(() => localStorage.setItem(KEYS.bookings, JSON.stringify(bookings)), [bookings]);
  useEffect(() => localStorage.setItem(KEYS.history, JSON.stringify(history)), [history]);

  const selected = tables.find((t) => t.id === selectedTable);

  const updateTable = (id, updates) => {
    setTables((old) => old.map((t) => t.id === id ? { ...t, ...updates } : t));
  };

  const todayIncome = income
    .filter((x) => x.date === today())
    .reduce((sum, x) => sum + Number(x.amount || 0), 0);

  const todayExpenses = expenses
    .filter((x) => x.date === today())
    .reduce((sum, x) => sum + Number(x.amount || 0), 0);

  const activeTables = tables.filter((t) => t.status === "ACTIVE").length;
  const pendingBookings = bookings.filter(
    (x) => x.date === today() && x.status === "Pending"
  ).length;
  const pendingUdhar = udhar.reduce(
    (sum, x) => sum + Math.max(0, Number(x.given || 0) - Number(x.returned || 0)),
    0
  );

  const monthlyIncome = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      return {
        label: d.toLocaleDateString("en", { weekday: "short" }),
        amount: income.filter((x) => x.date === key)
          .reduce((sum, x) => sum + Number(x.amount || 0), 0),
      };
    });
  }, [income]);

  const maxIncome = Math.max(1, ...monthlyIncome.map((x) => x.amount));

  const login = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("snookerLoggedIn", "true");
      setLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Username ya password ghalat hai.");
    }
  };

  const logout = () => {
    localStorage.removeItem("snookerLoggedIn");
    setLoggedIn(false);
    setPassword("");
  };

  const startTable = (id) => {
    const table = tables.find((t) => t.id === id);
    if (!table) return;
    updateTable(id, { status: "ACTIVE", startedAt: Date.now() });
    setNotice(`${table.name} start ho gaya.`);
  };

  const stopTable = (id) => {
    const table = tables.find((t) => t.id === id);
    if (!table || table.status !== "ACTIVE") return;

    const seconds = elapsed(table.startedAt);
    const minutes = Math.ceil(seconds / 60);
    const base = table.mode === "numbri"
      ? minutes * 12
      : Number(table.rate || 0);
    const total = Math.max(0, base - Number(table.discount || 0));

    const entry = {
      id: Date.now(),
      date: today(),
      table: table.name,
      game: table.mode === "numbri" ? "Numbri Game" : `${table.game} - ${table.red}`,
      duration: timeText(seconds),
      amount: total,
      players: table.players,
    };

    setIncome((old) => [entry, ...old]);
    setHistory((old) => [entry, ...old]);
    updateTable(id, {
      ...defaultTables()[0],
      id,
      name: table.name,
      status: "UNACTIVE",
      startedAt: null,
    });
    setNotice(`${table.name} band ho gaya. Bill: ${money(total)}`);
  };

  const openTable = (id, gameChoice) => {
    setSelectedTable(id);
    if (gameChoice) {
      const table = tables.find((t) => t.id === id);
      if (table) {
        if (gameChoice === "Numbri Game") {
          updateTable(id, {
            mode: "numbri", game: "Numbri Game", red: "N/A", rate: 12,
          });
        } else {
          const red = table.red === "10 Red" ? "10 Red" : "6 Red";
          const rate = gameChoice === "Double Frame"
            ? (red === "6 Red" ? 200 : 300)
            : (red === "6 Red" ? 100 : 150);
          updateTable(id, { mode: "frame", game: gameChoice, red, rate });
        }
      }
    }
    setModal("table");
  };

  const changeGame = (field, value) => {
    if (!selected) return;

    if (field === "mode" && value === "numbri") {
      updateTable(selected.id, {
        mode: "numbri", game: "Numbri Game", red: "N/A", rate: 12,
      });
      return;
    }

    if (field === "mode" && value === "frame") {
      updateTable(selected.id, {
        mode: "frame", game: "Single Frame", red: "6 Red", rate: 100,
      });
      return;
    }

    const game = field === "game" ? value : selected.game;
    const red = field === "red" ? value : selected.red;
    const rates = {
      "Single Frame": { "6 Red": 100, "10 Red": 150 },
      "Double Frame": { "6 Red": 200, "10 Red": 300 },
    };
    updateTable(selected.id, {
      mode: "frame", game, red, rate: rates[game][red],
    });
  };

  const updatePlayer = (index, field, value) => {
    if (!selected) return;
    const players = selected.players.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );
    updateTable(selected.id, { players });
  };

  const scoreChange = (index, amount) => {
    if (!selected) return;
    const players = selected.players.map((p, i) =>
      i === index ? { ...p, score: Number(p.score || 0) + amount } : p
    );
    updateTable(selected.id, { players });
  };

  const receivePayment = (index) => {
    if (!selected) return;
    const player = selected.players[index];
    const due = Math.max(0, Number(player.charge || 0) - Number(player.paid || 0));
    const raw = prompt(`Payment receive hui? Remaining: ${money(due)}`);
    if (raw === null) return;
    const amount = Number(raw);
    if (!Number.isFinite(amount) || amount <= 0) return;

    const players = selected.players.map((p, i) =>
      i === index ? { ...p, paid: Number(p.paid || 0) + amount } : p
    );
    updateTable(selected.id, { players });
    setIncome((old) => [{
      id: Date.now(), date: today(), table: selected.name,
      game: "Player Payment", amount, player: player.name || `Player ${index + 1}`,
    }, ...old]);
    setNotice(`${money(amount)} payment receive ho gayi.`);
  };

  const addExpense = (e) => {
    e.preventDefault();
    if (!expenseForm.title || Number(expenseForm.amount) <= 0) return;
    setExpenses((old) => [{
      id: Date.now(), ...expenseForm, amount: Number(expenseForm.amount),
    }, ...old]);
    setExpenseForm({ title: "", amount: "", date: today() });
    setNotice("Expense add ho gaya.");
  };

  const addLedger = (e) => {
    e.preventDefault();
    const amount = Number(ledgerForm.amount);
    if (!ledgerForm.name.trim() || amount <= 0) return;

    setUdhar((old) => {
      const existing = old.find(
        (x) => x.name.toLowerCase() === ledgerForm.name.trim().toLowerCase()
      );
      if (existing) {
        return old.map((x) => x.id === existing.id ? {
          ...x,
          given: Number(x.given || 0) + (ledgerForm.type === "Given" ? amount : 0),
          returned: Number(x.returned || 0) + (ledgerForm.type === "Returned" ? amount : 0),
          note: ledgerForm.note || x.note,
        } : x);
      }
      return [{
        id: Date.now(), name: ledgerForm.name.trim(),
        given: ledgerForm.type === "Given" ? amount : 0,
        returned: ledgerForm.type === "Returned" ? amount : 0,
        note: ledgerForm.note,
      }, ...old];
    });
    setLedgerForm({ name: "", amount: "", note: "", type: "Given" });
    setNotice("Udhaar ledger update ho gaya.");
  };

  const addBooking = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.date || !bookingForm.time) return;
    setBookings((old) => [{
      id: Date.now(), ...bookingForm, status: "Pending",
    }, ...old]);
    setBookingForm({
      name: "", phone: "", table: "Table 1", date: today(), time: "", note: "",
    });
    setNotice("Booking request add ho gayi.");
  };

  const updateBookingStatus = (id, status) => {
    setBookings((old) => old.map((b) => b.id === id ? { ...b, status } : b));
  };

  const transferTable = () => {
    if (!selected) return;
    const targetId = Number(transferTo);
    const target = tables.find((t) => t.id === targetId);

    if (!target || target.id === selected.id || target.status === "ACTIVE") {
      setNotice("Koi available destination table select karein.");
      return;
    }

    setTables((old) => old.map((t) => {
      if (t.id === selected.id) {
        return { ...defaultTables()[0], id: t.id, name: t.name };
      }
      if (t.id === targetId) {
        return { ...selected, id: targetId, name: target.name };
      }
      return t;
    }));
    setModal("");
    setNotice(`${selected.name} se ${target.name} par game transfer ho gaya.`);
  };

  const exportBackup = () => {
    const data = { tables, income, expenses, udhar, bookings, history };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `snooker-backup-${today()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (data.tables) setTables(data.tables);
        if (data.income) setIncome(data.income);
        if (data.expenses) setExpenses(data.expenses);
        if (data.udhar) setUdhar(data.udhar);
        if (data.bookings) setBookings(data.bookings);
        if (data.history) setHistory(data.history);
        setNotice("Backup restore ho gaya.");
      } catch {
        setNotice("Backup file valid JSON nahi hai.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const navItems = [
    "Dashboard", "Tables", "Bookings", "Income",
    "Expenses", "Udhaar Ledger", "Game History", "Backup & Restore",
  ];

  if (!loggedIn) {
    return (
      <div className="sn-login-page">
        <form className="sn-login-box" onSubmit={login}>
          <div className="sn-login-mark">♧</div>
          <span className="sn-small-label">JASS SNOOKER CLUB</span>
          <h1>OWNER LOGIN</h1>
          <p>Sign in to manage your club</p>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          {loginError && <div className="sn-error">{loginError}</div>}
          <button className="sn-btn sn-btn-gold sn-login-submit">
            LOGIN TO DASHBOARD
          </button>
          <small className="sn-login-hint">Default login: admin / admin123</small>
        </form>
      </div>
    );
  }

  return (
    <div className="sn-app">
      <header className="sn-topbar">
        <div className="sn-brand">
          <div className="sn-brand-icon">♧</div>
          <div>
            <b>JASS SNOOKER CLUB</b>
            <small>MANAGEMENT SYSTEM</small>
          </div>
        </div>
        <div className="sn-topbar-right">
          <span className="sn-live-dot" />
          <span>SYSTEM ONLINE</span>
          <span className="sn-date">{new Date(clock).toLocaleString()}</span>
          <button className="sn-btn sn-btn-outline sn-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <nav className="sn-navbar">
        {navItems.map((item) => (
          <button
            key={item}
            className={activeTab === item ? "selected" : ""}
            onClick={() => setActiveTab(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <main className="sn-main">
        <div className="sn-page-heading">
          <div>
            <span className="sn-small-label">CLUB CONTROL CENTER</span>
            <h1>{activeTab}</h1>
            <p>Manage tables, games, payments and daily operations.</p>
          </div>
          <div className="sn-heading-date">{today()}</div>
        </div>

        {notice && (
          <div className="sn-notice">
            {notice}
            <button onClick={() => setNotice("")}>×</button>
          </div>
        )}

        {activeTab === "Dashboard" && (
          <>
            <section className="sn-metrics">
              <Metric title="TODAY INCOME" value={money(todayIncome)} note="Payments received today" />
              <Metric title="TODAY EXPENSES" value={money(todayExpenses)} note="Expenses recorded today" />
              <Metric title="NET INCOME" value={money(todayIncome - todayExpenses)} note="Income minus expenses" />
              <Metric title="ACTIVE TABLES" value={`${activeTables} / 5`} note="Currently running tables" />
              <Metric title="PENDING BOOKINGS" value={pendingBookings} note="Today's pending requests" />
              <Metric title="TOTAL UDHAAR" value={money(pendingUdhar)} note="Outstanding balance" />
            </section>

            <section className="sn-panel">
              <div className="sn-panel-heading">
                <div>
                  <span className="sn-small-label">PERFORMANCE</span>
                  <h2>Last 7 Days Income</h2>
                </div>
                <strong>{money(todayIncome)}</strong>
              </div>
              <div className="sn-chart">
                {monthlyIncome.map((item) => (
                  <div className="sn-chart-column" key={item.label}>
                    <span>{money(item.amount)}</span>
                    <div className="sn-chart-track">
                      <div style={{ height: `${(item.amount / maxIncome) * 100}%` }} />
                    </div>
                    <small>{item.label}</small>
                  </div>
                ))}
              </div>
            </section>

            <section className="sn-panel">
              <div className="sn-panel-heading">
                <div>
                  <span className="sn-small-label">LIVE TABLE STATUS</span>
                  <h2>Club Tables</h2>
                </div>
                <strong>{activeTables} Active</strong>
              </div>
              <div className="sn-table-grid">
                {tables.map((table) => (
                  <TableCard
                    key={table.id}
                    table={table}
                    clock={clock}
                    onOpen={openTable}
                    onStart={startTable}
                    onStop={stopTable}
                    onTransfer={(id) => {
                      setSelectedTable(id);
                      setTransferTo(String(tables.find((t) => t.id !== id && t.status !== "ACTIVE")?.id || ""));
                      setModal("transfer");
                    }}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === "Tables" && (
          <section className="sn-panel">
            <div className="sn-panel-heading">
              <div><span className="sn-small-label">TABLE MANAGEMENT</span><h2>All 5 Tables</h2></div>
              <strong>{activeTables} / 5 Active</strong>
            </div>
            <div className="sn-table-grid">
              {tables.map((table) => (
                <TableCard
                  key={table.id}
                  table={table}
                  clock={clock}
                  onOpen={openTable}
                  onStart={startTable}
                  onStop={stopTable}
                  onTransfer={(id) => {
                    setSelectedTable(id);
                    setTransferTo(String(tables.find((t) => t.id !== id && t.status !== "ACTIVE")?.id || ""));
                    setModal("transfer");
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {activeTab === "Bookings" && (
          <div className="sn-two-column">
            <section className="sn-panel">
              <span className="sn-small-label">NEW RESERVATION</span>
              <h2>Add Booking</h2>
              <form className="sn-form" onSubmit={addBooking}>
                <label>Customer Name<input required value={bookingForm.name} onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })} /></label>
                <label>Phone Number<input value={bookingForm.phone} onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })} /></label>
                <label>Table<select value={bookingForm.table} onChange={(e) => setBookingForm({ ...bookingForm, table: e.target.value })}>{tables.map((t) => <option key={t.id}>{t.name}</option>)}</select></label>
                <label>Date<input type="date" required value={bookingForm.date} onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })} /></label>
                <label>Time<input type="time" required value={bookingForm.time} onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })} /></label>
                <label>Note<textarea value={bookingForm.note} onChange={(e) => setBookingForm({ ...bookingForm, note: e.target.value })} /></label>
                <button className="sn-btn sn-btn-gold">Add Booking</button>
              </form>
            </section>
            <section className="sn-panel">
              <span className="sn-small-label">RESERVATION RECORD</span>
              <h2>Booking Requests</h2>
              <div className="sn-record-list">
                {bookings.length === 0 && <div className="sn-empty">Abhi koi booking nahi hai.</div>}
                {bookings.map((b) => (
                  <div className="sn-record" key={b.id}>
                    <div>
                      <b>{b.name} · {b.table}</b>
                      <small>{b.date} at {b.time} {b.phone ? `· ${b.phone}` : ""}</small>
                      <small>{b.note}</small>
                    </div>
                    <select value={b.status} onChange={(e) => updateBookingStatus(b.id, e.target.value)}>
                      <option>Pending</option><option>Confirmed</option><option>Cancelled</option>
                    </select>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "Income" && (
          <section className="sn-panel">
            <div className="sn-panel-heading"><div><span className="sn-small-label">REVENUE RECORDS</span><h2>Income History</h2></div><strong>{money(todayIncome)} Today</strong></div>
            <div className="sn-table-wrap">
              <table className="sn-data-table">
                <thead><tr><th>Date</th><th>Table</th><th>Game</th><th>Duration</th><th>Amount</th></tr></thead>
                <tbody>
                  {income.map((x) => <tr key={x.id}><td>{x.date}</td><td>{x.table || "-"}</td><td>{x.game || "-"}</td><td>{x.duration || "-"}</td><td>{money(x.amount)}</td></tr>)}
                </tbody>
              </table>
              {income.length === 0 && <div className="sn-empty">Abhi income record nahi hai.</div>}
            </div>
          </section>
        )}

        {activeTab === "Expenses" && (
          <div className="sn-two-column">
            <section className="sn-panel">
              <span className="sn-small-label">COST CONTROL</span><h2>Add Expense</h2>
              <form className="sn-form" onSubmit={addExpense}>
                <label>Expense Title<input required value={expenseForm.title} onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })} /></label>
                <label>Amount (Rs.)<input required type="number" min="1" value={expenseForm.amount} onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })} /></label>
                <label>Date<input type="date" value={expenseForm.date} onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })} /></label>
                <button className="sn-btn sn-btn-gold">Save Expense</button>
              </form>
            </section>
            <section className="sn-panel">
              <span className="sn-small-label">EXPENSE RECORDS</span><h2>Recent Expenses</h2>
              <div className="sn-record-list">
                {expenses.length === 0 && <div className="sn-empty">Abhi expense nahi hai.</div>}
                {expenses.map((x) => <div className="sn-record" key={x.id}><div><b>{x.title}</b><small>{x.date}</small></div><strong className="sn-red-text">{money(x.amount)}</strong></div>)}
              </div>
            </section>
          </div>
        )}

        {activeTab === "Udhaar Ledger" && (
          <div className="sn-two-column">
            <section className="sn-panel">
              <span className="sn-small-label">CUSTOMER ACCOUNT</span><h2>Update Ledger</h2>
              <form className="sn-form" onSubmit={addLedger}>
                <label>Customer Name<input required value={ledgerForm.name} onChange={(e) => setLedgerForm({ ...ledgerForm, name: e.target.value })} /></label>
                <label>Transaction Type<select value={ledgerForm.type} onChange={(e) => setLedgerForm({ ...ledgerForm, type: e.target.value })}><option>Given</option><option>Returned</option></select></label>
                <label>Amount (Rs.)<input required type="number" min="1" value={ledgerForm.amount} onChange={(e) => setLedgerForm({ ...ledgerForm, amount: e.target.value })} /></label>
                <label>Note<input value={ledgerForm.note} onChange={(e) => setLedgerForm({ ...ledgerForm, note: e.target.value })} /></label>
                <button className="sn-btn sn-btn-gold">Update Ledger</button>
              </form>
            </section>
            <section className="sn-panel">
              <span className="sn-small-label">CUSTOMER BALANCES</span><h2>Udhaar Accounts</h2>
              <div className="sn-record-list">
                {udhar.length === 0 && <div className="sn-empty">Abhi ledger empty hai.</div>}
                {udhar.map((x) => {
                  const balance = Number(x.given || 0) - Number(x.returned || 0);
                  return <div className="sn-record" key={x.id}><div><b>{x.name}</b><small>Given: {money(x.given)} · Returned: {money(x.returned)}</small><small>{x.note}</small></div><strong>{money(balance)}</strong></div>;
                })}
              </div>
            </section>
          </div>
        )}

        {activeTab === "Game History" && (
          <section className="sn-panel">
            <span className="sn-small-label">COMPLETED GAMES</span><h2>Game History</h2>
            <div className="sn-table-wrap">
              <table className="sn-data-table">
                <thead><tr><th>Date</th><th>Table</th><th>Game</th><th>Duration</th><th>Amount</th></tr></thead>
                <tbody>{history.map((x) => <tr key={x.id}><td>{x.date}</td><td>{x.table}</td><td>{x.game}</td><td>{x.duration || "-"}</td><td>{money(x.amount)}</td></tr>)}</tbody>
              </table>
              {history.length === 0 && <div className="sn-empty">Game history empty hai.</div>}
            </div>
          </section>
        )}

        {activeTab === "Backup & Restore" && (
          <section className="sn-panel sn-backup-panel">
            <span className="sn-small-label">DATA SECURITY</span>
            <h2>Backup & Restore</h2>
            <p>Apne tables, income, expenses, bookings, udhaar aur game history ka backup JSON file mein save karein. Zaroorat par isi file ko restore bhi kar sakte hain.</p>
            <button className="sn-btn sn-btn-gold" onClick={exportBackup}>Download Backup</button>
            <label className="sn-upload-label">Restore Backup<input type="file" accept=".json,application/json" onChange={importBackup} /></label>
            <p className="sn-warning">Note: Restore karne se current records backup file ke records se replace ho jayenge.</p>
          </section>
        )}
      </main>

      {modal === "table" && selected && (
        <div className="sn-modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setModal("")}>
          <section className="sn-modal">
            <button className="sn-modal-close" onClick={() => setModal("")}>×</button>
            <span className="sn-small-label">TABLE CONTROL</span>
            <h2>{selected.name} Details</h2>

            <div className="sn-mode-switch">
              <button className={selected.mode === "frame" ? "chosen" : ""} onClick={() => changeGame("mode", "frame")}>Frame Game</button>
              <button className={selected.mode === "numbri" ? "chosen" : ""} onClick={() => changeGame("mode", "numbri")}>Numbri Game</button>
            </div>

            {selected.mode === "frame" ? (
              <>
                <div className="sn-field-grid">
                  <label className="sn-field">Game Type
                    <select value={selected.game} onChange={(e) => changeGame("game", e.target.value)}>
                      <option>Single Frame</option><option>Double Frame</option>
                    </select>
                  </label>
                  <label className="sn-field">Red Balls
                    <select value={selected.red} onChange={(e) => changeGame("red", e.target.value)}>
                      <option>6 Red</option><option>10 Red</option>
                    </select>
                  </label>
                  <label className="sn-field">Custom Price (Rs.)
                    <input type="number" min="0" value={selected.rate} onChange={(e) => updateTable(selected.id, { rate: Number(e.target.value) })} />
                  </label>
                  <label className="sn-field">Discount (Rs.)
                    <input type="number" min="0" value={selected.discount} onChange={(e) => updateTable(selected.id, { discount: Number(e.target.value) })} />
                  </label>
                </div>
              </>
            ) : (
              <>
                <div className="sn-numbri-rate"><span>NUMBRI GAME RATE</span><strong>Rs. 12 / Minute</strong><small>Timer ke mutabiq bill calculate hoga.</small></div>
                <label className="sn-field">Discount (Rs.)
                  <input type="number" min="0" value={selected.discount} onChange={(e) => updateTable(selected.id, { discount: Number(e.target.value) })} />
                </label>
              </>
            )}

            <div className="sn-player-grid">
              {selected.players.map((player, index) => (
                <div className="sn-player-card" key={index}>
                  <span className="sn-small-label">PLAYER {index + 1}</span>
                  <label>Player Name<input value={player.name} onChange={(e) => updatePlayer(index, "name", e.target.value)} placeholder="Player name" /></label>
                  <label>Player Charges (Rs.)<input type="number" min="0" value={player.charge} onChange={(e) => updatePlayer(index, "charge", Number(e.target.value))} /></label>
                  <label>Paid (Rs.)<input type="number" min="0" value={player.paid} onChange={(e) => updatePlayer(index, "paid", Number(e.target.value))} /></label>
                  <div className="sn-player-balance">
                    <span>Remaining</span>
                    <b>{money(Math.max(0, Number(player.charge || 0) - Number(player.paid || 0)))}</b>
                  </div>
                  <div className="sn-score-row">
                    <span>Score</span><b>{player.score}</b>
                    <button onClick={() => scoreChange(index, 1)}>WIN +</button>
                    <button className="sn-score-lose" onClick={() => scoreChange(index, -1)}>LOSE −</button>
                  </div>
                  <button className="sn-btn sn-btn-outline" onClick={() => receivePayment(index)}>Receive Payment</button>
                </div>
              ))}
            </div>

            <div className="sn-modal-footer">
              <div><span>Current Game Rate</span><strong>{money(selected.mode === "numbri" ? 12 : selected.rate)}{selected.mode === "numbri" ? " / min" : ""}</strong></div>
              <button className="sn-btn sn-btn-gold" onClick={() => setModal("")}>Save Details</button>
            </div>
            {selected.status === "ACTIVE" && (
              <button className="sn-btn sn-btn-red sn-modal-stop" onClick={() => { stopTable(selected.id); setModal(""); }}>
                Stop Game & Generate Bill
              </button>
            )}
          </section>
        </div>
      )}

      {modal === "transfer" && selected && (
        <div className="sn-modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setModal("")}>
          <section className="sn-modal sn-transfer-modal">
            <button className="sn-modal-close" onClick={() => setModal("")}>×</button>
            <span className="sn-small-label">TABLE MANAGEMENT</span>
            <h2>Transfer {selected.name}</h2>
            <label className="sn-field">Destination Table
              <select value={transferTo} onChange={(e) => setTransferTo(e.target.value)}>
                {tables.filter((t) => t.id !== selected.id && t.status !== "ACTIVE")
                  .map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </label>
            <button className="sn-btn sn-btn-gold" onClick={transferTable}>Confirm Transfer</button>
          </section>
        </div>
      )}
    </div>
  );
}