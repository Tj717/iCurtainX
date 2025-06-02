# Data Directory

This directory contains large data files used by the application, organized with a flexible categorization system.

## Structure

The data directory uses a flexible categorization system where each directory can have multiple properties and tags. The structure is defined in `index.ts`.

```
data/
├── index.ts         # Directory metadata and helper functions
├── collections/     # Example directory for collections
└── ...             # Other directories as needed
```

## Usage

### Importing Data
```typescript
// Import the directory catalog and helper functions
import { directoryCatalog, findDirectoriesByProperty, getAllPropertyValues } from '@/data';

// Find directories by property
const blindsDirectories = findDirectoriesByProperty('mainCategory', 'Products');

// Get all unique values for a property
const allCategories = getAllPropertyValues('mainCategory');
```

### Directory Properties

Each directory can have multiple properties:
- `mainCategory`: Primary category (e.g., "Products", "Categories")
- `subCategories`: Array of sub-categories
- `tags`: Array of tags for flexible categorization
- `description`: Description of the directory contents
- `lastUpdated`: Last update timestamp
- Custom properties can be added as needed

## Best Practices

1. Always add new directories to the `directoryCatalog` in `index.ts`
2. Use meaningful property values
3. Add relevant tags for better searchability
4. Keep descriptions clear and concise
5. Update the `lastUpdated` property when modifying directory contents

## Data Loading

For large datasets, consider:
- Implementing pagination
- Using server-side data fetching
- Implementing data caching strategies
- Using Next.js data fetching methods (getStaticProps, getServerSideProps) 