const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const initDB = () => {
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS rules (id INTEGER PRIMARY KEY AUTOINCREMENT, rule_string TEXT, ast TEXT)", (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            }
        });
    });
};

const addRule = (ruleString, ast) => {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("INSERT INTO rules (rule_string, ast) VALUES (?, ?)", function(err) {
            if (err) {
                return reject(err);
            }
        });
        stmt.run(ruleString, JSON.stringify(ast), function(err) {
            stmt.finalize();
            if (err) {
                return reject(err);
            }
            resolve(this.lastID);
        });
    });
};

const getRules = (ids = null) => {
    return new Promise((resolve, reject) => {
        let query = "SELECT * FROM rules";
        if (ids) {
            query += " WHERE id IN (" + ids.map(() => '?').join(',') + ")";
        }
        db.all(query, ids || [], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows.map(row => ({
                id: row.id,
                rule_string: row.rule_string,
                ast: JSON.parse(row.ast) // Assuming ast is stored as a JSON string
            })));
        });
    });
};

const closeDB = () => {
    db.close(err => {
        if (err) {
            console.error('Error closing database:', err.message);
        }
    });
};

module.exports = { initDB, addRule, getRules, closeDB };
