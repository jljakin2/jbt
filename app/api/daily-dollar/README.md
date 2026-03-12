# Daily Dollar API

This API endpoint generates a daily marketing exercise based on a random article from [Marketing Examples](https://marketingexamples.com/).

## Endpoint

`GET /api/daily-dollar`

## How it works

1. Scrapes a random marketing lesson from Marketing Examples
2. Fetches the full article content
3. Uses Claude (via Anthropic API) to generate a practical exercise based on the article
4. Returns the exercise along with metadata about the source article

## Response Format

```json
{
  "message": "Created a new worksheet",
  "data": {
    "content": "URL-encoded markdown content of the exercise",
    "lesson": "Title of the marketing lesson",
    "lessonUrl": "URL to the original article",
    "category": "Category of the lesson",
    "readTime": "Estimated read time"
  }
}
```

## Environment Variables

Requires `ANTHROPIC_API_KEY` to be set in your environment.

## Error Handling

Returns a 500 status code with error details if:
- Web scraping fails
- No marketing lessons are found
- Claude API call fails
- Any other unexpected error occurs
