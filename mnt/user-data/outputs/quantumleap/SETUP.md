# 🛠️ COMPLETE SETUP GUIDE

## Prerequisites Check

Before starting, verify you have:

### Python 3.10+
```bash
python3 --version
# Should show: Python 3.10.x or higher
```

**Don't have it?**
- **Mac:** Download from https://python.org/downloads/
- **Windows:** Download from https://python.org/downloads/
- **Linux:** `sudo apt install python3.10`

### Node.js 18+
```bash
node --version
# Should show: v18.x.x or higher
```

**Don't have it?**
- Download LTS version from https://nodejs.org/

---

## Backend Setup (15 minutes)

### Step 1: Navigate to Backend
```bash
cd quantumleap/backend
```

### Step 2: Create Virtual Environment
```bash
python3 -m venv venv
```

This creates an isolated Python environment.

### Step 3: Activate Virtual Environment

**Mac/Linux:**
```bash
source venv/bin/activate
```

**Windows:**
```bash
venv\Scripts\activate
```

You should see `(venv)` appear in your terminal.

### Step 4: Install Dependencies
```bash
pip install -r requirements.txt
```

This installs:
- Qiskit (quantum computing framework)
- Flask (web server)
- NumPy, SciPy (math libraries)

**Takes 3-5 minutes**

### Step 5: Start Backend Server
```bash
python app.py
```

**Success looks like:**
```
🚀 QuantumLeap Backend Starting...
✅ Quantum simulator initialized
✅ Server starting on http://localhost:5000
 * Running on http://0.0.0.0:5000
```

**IMPORTANT:** Keep this terminal window open!

---

## Frontend Setup (15 minutes)

### Step 1: Open New Terminal
Don't close the backend terminal - open a NEW one.

### Step 2: Navigate to Frontend
```bash
cd quantumleap/frontend
```

### Step 3: Install Dependencies
```bash
npm install
```

This installs:
- React (UI framework)
- Three.js (3D graphics)
- Axios (API communication)

**Takes 2-3 minutes**

### Step 4: Start Frontend
```bash
npm start
```

**Success looks like:**
```
Compiled successfully!

You can now view quantumleap in the browser.

  Local:            http://localhost:3000
```

**Your browser will automatically open!**

---

## Testing (5 minutes)

### Basic Test
1. You should see: "⚛️ QuantumLeap" header
2. Left side: Gate buttons (H, X, Y, Z, CNOT)
3. Right side: 3D Bloch sphere

### Circuit Test
1. Click **H** button
2. You'll see "H on q0" appear
3. Click **"Run Circuit"**
4. Results appear:
   - Bar chart (~50% |0⟩, ~50% |1⟩)
   - Bloch sphere vector moves to equator

**If this works → You're done! 🎉**

---

## Troubleshooting

### "python3: command not found"
- **Fix:** Install Python from python.org
- **Mac users:** Try `python` instead of `python3`

### "npm: command not found"
- **Fix:** Install Node.js from nodejs.org

### "ModuleNotFoundError: No module named 'qiskit'"
- **Fix:** Virtual environment not activated
- **Solution:** Run `source venv/bin/activate` again

### "Port 5000 already in use"
- **Fix:** Backend already running somewhere
- **Solution:** Close other terminals or run `lsof -ti:5000 | xargs kill`

### "Port 3000 already in use"
- **Fix:** Frontend already running
- **Solution:** Close other terminals or use `PORT=3001 npm start`

### Frontend shows "Network Error"
- **Check:** Is backend running? (should show "Running on...")
- **Check:** Backend URL correct? (http://localhost:5000)
- **Fix:** Restart backend

### Bloch Sphere Not Showing
- **Check:** Browser console (press F12)
- **Fix:** Try different browser (Chrome recommended)
- **Fix:** Clear cache and reload

---

## Daily Usage

### Starting Work (Every Day)

**Terminal 1 (Backend):**
```bash
cd quantumleap/backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python app.py
```

**Terminal 2 (Frontend):**
```bash
cd quantumleap/frontend
npm start
```

### Stopping Work
- Press `Ctrl+C` in both terminals
- Close browser tab

---

## File Structure

```
quantumleap/
├── README.md
├── SETUP.md (this file)
├── backend/
│   ├── app.py (Flask server)
│   ├── requirements.txt (Python packages)
│   └── quantum/
│       ├── circuit_builder.py (Builds circuits)
│       ├── simulator.py (Runs quantum simulation)
│       └── bloch_sphere.py (Calculates 3D coordinates)
└── frontend/
    ├── package.json (Node packages)
    ├── public/
    │   └── index.html
    └── src/
        ├── index.jsx (Entry point)
        ├── App.jsx (Main component)
        └── components/
            ├── CircuitBuilder/ (Gate interface)
            ├── BlochSphere/ (3D visualization)
            └── Results/ (Results display)
```

---

## Next Steps After Setup

1. ✅ Use the app daily (get familiar)
2. ✅ Test every gate combination
3. ✅ Set up GitHub repository
4. ✅ Set up Notion workspace
5. ✅ Start Week 1 tasks from project charter

---

## Getting Help

**Still stuck?**
- Come back to Claude with specific error messages
- Include: What command you ran, what error you got
- Screenshot if helpful

**You've got this! 🚀**
