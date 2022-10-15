# Baby Boilerplate

Install it and run (development):

```bash
npm ci
npm start
```

## Structure
- `constants/index` - configure application constants
- `constants/menu` - configure site menu
- `constants/routes` - configure site routes

## SSR (isomorphic, root: @server/document) - current
```bash
npm run build
npm run start:prod
```

## SPA (root: ./src/index.html)
```bash
npm run build:spa
serve -s build/public
```

## SSG (root: each .html in build/public)
```typescript
/**
 * NOTE: Please uncomment lines with ssg comment in:
 * @see asyncRouteComponentWrapper
 */
```
```bash
npm run build
serve build/public
```

## Local development
Configure environments variables through `.env.local`.   
Use `NODE_TLS_REJECT_UNAUTHORIZED=0` inside `.env.local` for skip SSL verification (WARNING: use it only for local development).

## Git workflow

**NOTE: see .github for understand CI/CD**

1. Clone repo
2. Create new branch from `dev`
3. Create Pull Request from your branch to `dev`
4. Squash commit into `dev` after code review and approvals.

Beta release:

1. Create Pull Request from `dev` to `staging`
2. Merge commits into `staging` after tests.

Release:

1. Create Pull Request from `staging` to `prod`
2. Merge commits into `prod` after tests.
