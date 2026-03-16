# Spiritual Gifts Assessment

Standalone web app that delivers a randomized spiritual gifts assessment for churches.
Designed to work independently or with a tight API integration into Trellis.

## Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Database**: Neon (Postgres)
- **Styling**: Tailwind CSS
- **Hosting**: Vercel
- **Repo**: github.com/mheerema/spiritual-gifts

## Theological Framework

Cessationist per Tom Schreiner's *Spiritual Gifts*. Gifts are providentially given by the
Holy Spirit for service in the church. They are often reflected in natural abilities,
temperament, and other assessments (CliftonStrengths, Working Genius). This assessment
provides additional "fine-tuning" alongside those tools.

Not a clinically validated psychometric instrument — a church/ministry tool for directional
insight and conversation starters.

## Assessment Structure

- **8 categories** (hidden from test-takers during the assessment):
  1. Word & Wisdom — teaching, study, biblical explanation
  2. Shepherding & Care — pastoral care, long-term relational investment
  3. Service & Administration — logistics, organization, execution
  4. Evangelistic & Missional — outreach, bridge-building, gospel conversations
  5. Prophetic & Discernment — truth-telling, integrity, doctrinal evaluation
  6. Faith & Intercession — persistent prayer, trust in God's provision
  7. Stewardship & Generosity — giving, hospitality, resource deployment
  8. Creative & Communication — arts, writing, worship, expression

- **192 questions** in the master bank (24 per category)
- **96 questions per run** (12 randomly selected from each category)
- **5-point Likert scale**: Strongly Disagree → Strongly Agree
- Questions are "veiled behavioral" — describe tendencies without naming the gift

## Scoring

- Raw score per category: sum of 12 responses (range 12–60)
- Average score per category: raw / 12
- Rank all 8 categories highest to lowest
- **Primary strengths**: top 2
- **Secondary strengths**: next 2
- **Lower-energy areas**: bottom 2
- Ties: preserve tied scores, secondary sort by display order

## Trellis Integration (Tight API)

### Provisioning Flow
1. Trellis admin or user clicks "Take Spiritual Gifts Assessment" on a profile
2. Trellis calls `POST /api/sessions/provision` on this app with:
   - `participant_name` (from Trellis profile)
   - `participant_email` (from Trellis profile)
   - `callback_url` (Trellis endpoint to receive results)
   - `callback_token` (signed JWT or HMAC for auth)
   - `external_id` (Trellis profile ID for correlation)
3. This app creates a session and returns `{ session_url }` — a unique URL
4. Trellis redirects the user to `session_url`
5. User completes the assessment on this app

### Results Callback
On submission, this app POSTs results to the `callback_url`:
```json
{
  "external_id": "<trellis-profile-id>",
  "callback_token": "<original-token>",
  "completed_at": "2026-03-16T...",
  "scores": [
    { "category": "Word & Wisdom", "raw_score": 48, "average_score": 4.0, "rank": 1 },
    ...
  ],
  "primary_gifts": ["Word & Wisdom", "Prophetic & Discernment"],
  "session_id": "<this-app-session-id>"
}
```

### Trellis Receives Results
Trellis endpoint (e.g., `POST /api/profiles/[id]/assessments/spiritual-gifts/callback`):
- Validates `callback_token`
- Upserts into the `assessments` table with type `spiritual_gifts`
- Stores `{ gifts: [...], ranked: [...], session_id }` in the results JSONB

### Standalone Mode
The app also works without Trellis:
- Users visit the app directly, optionally enter name/email/church/group
- Complete the assessment and see results
- No callback — results stored locally only
- Admin can export CSV of completed assessments

## User Experience

### Assessment Flow
1. Landing page — purpose, instructions, scale explanation, disclaimer
2. Questionnaire — paginated (12 per page), progress bar, auto-save
3. Submit — validates all 96 answered
4. Results — bar chart, gift detail cards, next-step guidance

### UX Requirements
- Mobile-first, responsive
- Auto-save on every response (survive refresh/close)
- Resume in-progress sessions
- Clean, calm, credible aesthetic — appropriate for church use
- Category names hidden during assessment (anti-gaming)

## Results Display

Each category has editable content:
- **Public name** — shown to user after completion
- **Description** — what this gift looks like in practice
- **Strengths** — contributions to the body
- **Cautions** — watch-outs and growth areas
- **Ministry fit** — suggested serving opportunities

Bar chart preferred over radar/spider for readability.

## Data Model

### Tables
- `sg_categories` — id, internal_name, public_name, description, strengths, cautions, ministry_fit, display_order, is_active
- `sg_questions` — id, category_id, question_text, is_active, version
- `sg_sessions` — id, participant_name, participant_email, church_name, group_name, status, current_page, callback_url, callback_token, external_id, started_at, submitted_at
- `sg_session_questions` — id, session_id, question_id, category_id, display_order
- `sg_responses` — id, session_id, question_id, response_value (1–5)
- `sg_scores` — id, session_id, category_id, raw_score, average_score, rank

## Admin Features

### Minimum
- Login-protected admin area
- CRUD for questions (add, edit, activate/deactivate)
- Edit category labels and result descriptions
- View completed assessments
- Export results as CSV

### Nice-to-Have
- Question import via CSV
- Duplicate question checker
- Aggregate analytics by church/group/date
- Configurable items-per-category per run
- Preview a generated assessment

## API Endpoints

### Public
- `POST /api/sessions/start` — start anonymous session
- `POST /api/sessions/provision` — start Trellis-provisioned session
- `GET /api/sessions/[id]` — get session with questions and responses
- `PATCH /api/sessions/[id]` — save responses, update page
- `POST /api/sessions/[id]/submit` — calculate scores, trigger callback
- `GET /api/sessions/[id]/results` — get results

### Admin
- `GET /api/admin/categories` — list categories
- `PATCH /api/admin/categories/[id]` — update category
- `GET /api/admin/questions` — list questions
- `POST /api/admin/questions` — create question
- `PATCH /api/admin/questions/[id]` — update question
- `GET /api/admin/sessions` — list completed sessions
- `GET /api/admin/export` — CSV export

## Content Assets Ready

- 192 veiled behavioral questions (in seed script)
- 8 category descriptions with strengths, cautions, ministry fit
- Instructional copy and disclaimer language

## Edge Cases

- Session persists through refresh (auto-save)
- Questions deactivated after session started: session remains scoreable
- Historical sessions preserved by question ID + version
- Duplicate submission prevention
- Tied category scores handled gracefully

## Environment Variables

```
DATABASE_URL        Neon connection string
NEXTAUTH_SECRET     For admin auth (if using NextAuth)
ADMIN_EMAIL         Whitelist for admin access
```

## Future Enhancements

- Short-form version (fewer questions)
- Custom branding per church/org
- Group dashboards and cohort tools
- Downloadable PDF report
- Discussion guide tied to results
- Benchmark comparisons
- Leader facilitation tools
