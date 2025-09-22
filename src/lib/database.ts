import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function initializeDatabase() {
  try {
    // Create prices table
    await sql`
      CREATE TABLE IF NOT EXISTS prices (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        price VARCHAR(50) NOT NULL,
        sale_price VARCHAR(50),
        category VARCHAR(100),
        unit VARCHAR(20) DEFAULT 'kg',
        weight VARCHAR(50),
        on_sale BOOLEAN DEFAULT false,
        is_visible BOOLEAN DEFAULT true,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create images table
    await sql`
      CREATE TABLE IF NOT EXISTS images (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        url TEXT NOT NULL,
        blob_url TEXT NOT NULL,
        size_bytes INTEGER,
        file_type VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create index for better performance
    await sql`
      CREATE INDEX IF NOT EXISTS idx_prices_visible ON prices(is_visible)
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_images_name ON images(name)
    `;

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

export { sql };
