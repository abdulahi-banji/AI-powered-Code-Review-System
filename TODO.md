# Codebase Cleaning TODO

## Approved Plan Steps (progress tracked)

### 1. Create this TODO.md [✅ Done]

### 2. Update .gitignore [✅ Done]
- Add `**/*.db`
- Add `backend/venv/`
- Ensure backend/ can be ignored/removed

### 3. Remove duplicate/unused files [✅ Done]
- rm requirements.txt (root)
- rm api/requirements.txt  
- rm backend/database.py
- rm api/review/route.js (duplicate JS route)

### 4. Remove backend/ directory entirely (duplicate/legacy) [✅ Done]
- rm -rf backend/ (contains duplicate main.py, unused DB py, venv, dbs)

### 5. Fix render.yaml merge conflict [✅ Done]

### 6. Update README.md (remove reqs.txt refs, backend refs) [✅ Done]
### 8. Commit: "Clean codebase: removed duplicates (backend/, reqs.txt x2, route.js), fixed gitignore/DBs, render.yaml"

### 9. Test: npm run dev (frontend), uvicorn api.main:app --reload
### 10. [attempt_completion]

### 7. git add/rm -r --cached *.db if needed [Skipped - no tracked DBs]

### 8. Commit [Ready]

