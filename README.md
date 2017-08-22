# 20-20

Jason Lerner
Andrew Atkinson
Ezra Shamie
Darryn Wu

# Description

Media availability can broaden our perspectives. However, with advancements in consumer targeting, news organizations have increasingly directed their political slants. 20-20 aggregates and provides comprehensive information, showcasing relevant content in a modern web application and chrome extension.

20-20 offers three key product attributes:
- Distribution of aligned and contrasting articles for a given article
- Community to share insights and opinions via comments and articles
- Comprehensive source for current topics and trending articles across news sources


## Contribution guide

The contribution process is...

1. Make an issue (or multiple issues)
2. Make a PR that references that issue
3. Get it code reviewed by someone on the team, address any comments
4. Merge into master (with merge commit)

### Code style guide

- Pay attention to the linter!
- Don't use semicolons
- Two spaces
- Trailing commas where possible
- `const` or `let` over `var`
- Use `require` and `module.exports` in `.js` files
- Use `import` and `export` in `.jsx` files, unless `require` makes for cleaner code
- Put import statements at top
- Put the default export at bottom
- Consider splitting up any file larger than 50 lines
- Define container components and presentational components in separate files
- Use the ["ducks" pattern](https://github.com/erikras/ducks-modular-redux) for redux
- Name files using lowercase-and-dashes instead of camelCase or PascalCase, except for when the default export is a class, then use PascalCase
- Define react components as pure functions (instead of classes) whenever possible

### Commit message guide

[See here](https://seesparkbox.com/foundry/semantic_commit_messages)
