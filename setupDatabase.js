const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database (creates a new file if it doesn't exist)
const db = new sqlite3.Database('./projectDb.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

//FUNCTION TO CREATE USERS TABLE

const createUsersTable = () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            userId TEXT PRIMARY KEY NOT NULL,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phoneNumber TEXT UNIQUE NOT NULL
        );
    `;

    db.run(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating users table:', err.message);
        } else {
            console.log('Users table created successfully ');
        }
    });
};


// Function to create properties table
const createPropertiesTable = () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS properties (
            propertyId TEXT PRIMARY KEY UNIQUE NOT NULL,
            propertyTitle TEXT NOT NULL,
            propertyType TEXT NOT NULL,
            description TEXT,
            price DECIMAL(15, 2) NOT NULL,
            ownerId TEXT NOT NULL,
            propertyStatus TEXT,
            address TEXT NOT NULL,
            street TEXT NOT NULL,
            city TEXT NOT NULL,
            state TEXT NOT NULL,
            pinCode TEXT NOT NULL,
            mapLatitude DECIMAL(9, 6),
            mapLongitude DECIMAL(9, 6),
            priceNegotiable INTEGER DEFAULT 0, -- Use INTEGER for boolean
            builtUpArea INT NOT NULL,
            carpetArea INT,
            propertyAge INT,
            wallpaperImage TEXT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (ownerId) REFERENCES users(userId) ON DELETE CASCADE
        );
    `;

    db.run(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating properties table:', err.message);
        } else {
            console.log('Properties table created successfully.');
        }
    });
};



const createChatsTable = () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS chats (
            chatId TEXT PRIMARY KEY NOT NULL,
            propertyId TEXT NOT NULL,
            userId TEXT NOT NULL,
            ownerId TEXT NOT NULL,
            status VARCHAR NOT NULL,
            FOREIGN KEY (propertyId) REFERENCES properties(propertyId) ON DELETE CASCADE,
            FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
            FOREIGN KEY (ownerId) REFERENCES users(userId) ON DELETE CASCADE
        );
    `;

    db.run(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating chats table:', err.message);
        } else {
            console.log('Chats table created successfully.');
        }
    });
};

// Function to create messages table
const createMessagesTable = () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS messages (
            messageId TEXT PRIMARY KEY NOT NULL,
            chatId TEXT NOT NULL,
            senderId TEXT NOT NULL,
            content TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            FOREIGN KEY (chatId) REFERENCES chats(chatId) ON DELETE CASCADE,
            FOREIGN KEY (senderId) REFERENCES users(userId) ON DELETE CASCADE
        );
    `;

    db.run(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating messages table:', err.message);
        } else {
            console.log('Messages table created successfully.');
        }
    });
};





// Function to insert data
/* const insertData = () => {
    const insertQuery = `
        INSERT INTO chats (chat_id, message)
        VALUES (?, ?);
    `;

    const data = [
        ['chat1', 'Hello!'],
        ['chat2', 'How are you?'],
        ['chat3', 'Goodbye!']
    ];

    data.forEach(([chat_id, message]) => {
        db.run(insertQuery, [chat_id, message], (err) => {
            if (err) {
                console.error('Error inserting data:', err.message);
            } else {
                console.log(`Data inserted: ${chat_id} - ${message}`);
            }
        });
    });
};
*/
// Initialize database setup
const setupDatabase = () => {

    createUsersTable();
    createPropertiesTable();
    createChatsTable();
    createMessagesTable();

    // Close the database connection
    db.close((err) => {
        if (err) {
            console.error('Error closing the database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
    });
};

// Execute the setup
setupDatabase();
