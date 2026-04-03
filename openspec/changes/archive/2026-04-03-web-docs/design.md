## Context

This is a Next.js 16 application built with TypeScript, featuring a multi-language e-commerce platform for Hmong traditional clothing with integrated community features and live chat functionality. The application uses:

- **Framework**: Next.js App Router with React 19
- **Styling**: Tailwind CSS v4 with Ant Design v6
- **State Management**: Zustand with middleware (devtools, persist)
- **Internationalization**: next-intl supporting 8 languages
- **Architecture**: Feature-based modular structure

The codebase is well-organized but lacks centralized documentation describing the overall architecture, data entities, and project planning.

## Goals / Non-Goals

**Goals:**
- Create comprehensive project documentation at `docs/web-docs.md`
- Document the technology stack and architectural decisions
- Define all data entities used across the application
- Describe the feature modules and their relationships
- Provide a clear project overview for stakeholders and developers

**Non-Goals:**
- Creating API documentation (separate task)
- Writing user-facing documentation
- Documenting third-party library internals
- Creating inline code documentation

## Decisions

### Documentation Structure

**Decision:** Use a single comprehensive markdown file (`web-docs.md`) organized into clear sections.

**Rationale:**
- Easy to maintain and update
- Can be converted to other formats (PDF, HTML) if needed
- Simple navigation within the file using headings
- Git-friendly for tracking changes

### Content Organization

The documentation will be organized into the following sections:

1. **Project Overview**
   - Purpose and goals
   - Target audience
   - Supported languages

2. **Technology Stack**
   - Framework and runtime
   - UI libraries
   - State management
   - Internationalization
   - Development tools

3. **Architecture**
   - Project structure (app directory, components, features)
   - Routing strategy
   - Module organization
   - Data flow patterns

4. **Data Entities**
   - User-related entities
   - Product entities
   - Chat entities
   - Community entities
   - Admin entities

5. **Feature Modules**
   - Live Chat System
   - Product Catalog
   - Community Platform
   - Admin Dashboard
   - Authentication & Authorization

6. **State Management**
   - Store definitions
   - Middleware configuration
   - Data persistence strategy

7. **Internationalization**
   - Supported locales
   - Translation structure
   - Locale detection and routing

### Entity Documentation Format

Each entity will be documented with:
- **Description**: What the entity represents
- **Properties**: All fields with types and descriptions
- **Usage**: Where and how it's used in the application
- **Relationships**: Related entities

Example:
```markdown
### User
**Description**: Represents a user of the application

**Properties**:
- `id: string` - Unique user identifier
- `name: string` - User's display name
- `email: string` - User's email address
- `locale: string` - Preferred language locale
- `role: UserRole` - User's role (admin, user)

**Usage**: Used across authentication, profile management, and permissions
```

## Risks / Trade-offs

**Risk:** Documentation may become outdated as the codebase evolves
- **Mitigation**: Include a "Last Updated" timestamp and encourage updates during changes

**Trade-off:** Single file vs. multiple documentation files
- **Single file**: Easier to navigate and maintain, but may become large
- **Multiple files**: Better for large projects, but more complex to manage
- **Decision**: Single file is appropriate for current project size

**Risk:** Entity definitions may not match actual TypeScript interfaces
- **Mitigation**: Reference actual type definitions from `src/types/` and feature modules

## Migration Plan

1. Create `docs/` directory if it doesn't exist
2. Create `docs/web-docs.md` with the defined structure
3. Populate each section based on codebase analysis
4. Review for completeness and accuracy
5. Add to git with appropriate commit message

**No code changes required** - this is documentation-only work.

## Open Questions

1. Should the documentation include diagrams (architecture, entity relationships)?
   - **Answer**: Can add ASCII diagrams or references to external diagram tools in future

2. Should API endpoints be documented in this file?
   - **Answer**: No - API documentation should be separate (can be added later)

3. Should this include deployment and setup instructions?
   - **Answer**: Yes - include a brief "Getting Started" section
