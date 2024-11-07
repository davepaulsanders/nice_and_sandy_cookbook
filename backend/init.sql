CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    img TEXT NOT NULL,
    href TEXT NOT NULL,
    label TEXT NOT NULL,
    alt TEXT NOT NULL,
	category_id INTEGER,
	is_pinned BOOLEAN,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL
);
