# Server API Endpoints

This document lists the HTTP endpoints currently registered by `server/app.js` and the route modules under `server/src/routes`.

## Base URL and conventions

- Local default: `http://localhost:5000`
- API routes use the `/api` prefix, except for the health/root route `GET /`.
- Request and JSON response bodies use JSON unless an endpoint returns a PDF.
- Protected endpoints accept either `Authorization: Bearer <token>` or the `accessToken` HTTP-only cookie set at login.
- `protect` accepts a valid Admin or Teacher token. `adminOnly` additionally restricts access to users whose role is `Admin` or `Super-Admin`.
- Login tokens are signed with `ACCESS_SECRET`; expiration is configured by `ACCESS_EXPIRY`.

## Endpoint index

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/` | Public | API health message |
| POST | `/api/auth/login` | Public | Log in an Admin or Teacher |
| GET | `/api/students` | Authenticated | List students, optionally filtered and paginated |
| GET | `/api/classes` | Authenticated | List classes |
| POST | `/api/classes` | Admin | Create a class |
| DELETE | `/api/classes` | Admin | Delete a class by ID |
| GET | `/api/sections` | Authenticated | List distinct student section names |
| POST | `/api/sections` | Admin | Create a section for a class |
| GET | `/api/subjects` | Authenticated | List subjects |
| GET | `/api/exams` | Authenticated | List exams with optional filters |
| POST | `/api/exam` | Admin | Create an exam |
| PATCH | `/api/exam/:eId` | Admin | Change an exam's status |
| GET | `/api/teacher` | Admin | List teachers |
| POST | `/api/teacher` | Admin | Create a teacher |
| DELETE | `/api/teacher/:id` | Admin | Revoke/delete a teacher |
| POST | `/api/results/bulk` | Authenticated | Insert or update marks for multiple students |
| GET | `/api/results` | Authenticated | List results with optional filters |
| POST | `/api/report-cards` | Authenticated | Create/update report-card metadata |
| GET | `/api/report-cards/:studentId` | Authenticated | Get academic results and report-card metadata |
| GET | `/api/report-cards/pdf/:studentId` | Authenticated | Generate and download a report-card PDF |

## Endpoint details

### `GET /`

Public. Returns the plain-text message `School Result Management System API is running...`.

### `POST /api/auth/login`

Public. Supports either login flow:

- Admin: `{ "email": "admin@example.com", "password": "..." }`
- Teacher: `{ "name": "Teacher Name", "accessCode": "..." }`

On success, returns `200`, sets the HTTP-only `accessToken` cookie, and returns `{ "_id", "name", "role" }`. Invalid credentials return `401`; missing/incomplete credentials return `400`. The cookie uses `SameSite=Strict`; `Secure` is enabled in production.

### `GET /api/students`

Authenticated. Optional query parameters:

| Parameter | Meaning | Default |
| --- | --- | --- |
| `class` | Filter by the student's class value | — |
| `section` | Filter by the student's section value | — |
| `page` | Page number | `1` |
| `limit` | Students per page | `10` |

Returns `{ success, count, total, totalPages, currentPage, data }`; students are sorted by `rollNumber` ascending.

### Classes and sections

#### `GET /api/classes`

Authenticated. Returns `{ success, count, data }` containing class documents.

#### `POST /api/classes`

Admin. JSON body: `{ "clevel": "1" }`. `clevel` must be a string integer from `1` through `12`. Creates a class named `class <clevel>` and returns `201` with the created record in the standard `{ statusCode, success, data, message }` envelope.

#### `DELETE /api/classes`

Admin. JSON body: `{ "cId": "<class MongoDB _id>" }`. Deletes the matching class. The implementation responds with HTTP `201` and an envelope containing status code `204`; clients should treat this as an implementation quirk.

#### `GET /api/sections`

Authenticated. Optional query parameter: `class`. Returns distinct section values from student records as `{ success, count, data }`. The current controller applies this query value to the student field named `class`.

#### `POST /api/sections`

Admin. JSON body: `{ "name": "A", "cId": "<class MongoDB _id>" }`. Allowed names are `A` through `F`; the class ID must identify an existing class. Returns `201` with the created section in the standard response envelope.

### Master data

#### `GET /api/subjects`

Authenticated. Returns subjects sorted by name ascending as `{ success, count, data }`.

#### `GET /api/exams`

Authenticated. Optional query parameters: `name` (case-insensitive partial match), `status`, `term`, and `academicYear`. Returns matching exam documents sorted by name as `{ success, count, data }`. The controller filters out exams whose `deltetAt` field is non-null (field spelling as implemented).

### Exams

#### `POST /api/exam`

Admin. JSON body: `{ "name": "Mid Term", "academicYear": "2025-2026", "term": "Term 1" }`. All fields are required; `term` must be `Term 1` or `Term 2`. Returns `201` with the created exam in the standard response envelope.

#### `PATCH /api/exam/:eId`

Admin. `eId` is the exam MongoDB ID. JSON body: `{ "status": "open" }`. Allowed statuses are `draft`, `open`, and `closed`. Returns `200` with the updated exam in the standard response envelope.

### Teachers

#### `GET /api/teacher`

Admin. Returns `{ success, count, data }` with teachers sorted by name. The response excludes `__v`.

#### `POST /api/teacher`

Admin. JSON body: `{ "name": "Teacher Name", "accessCode": "unique-code", "role": "Teacher" }`. `name`, `accessCode`, and `role` are required by the route validator. Allowed roles are `Teacher` and `ClassTeacher`. Returns `201` with the new teacher's name, access code, and role. Duplicate access codes return `400`.

#### `DELETE /api/teacher/:id`

Admin. Deletes the teacher with the supplied MongoDB ID, revoking access. Returns `{ success: true, message: "Teacher access revoked successfully" }`; unknown IDs return `404`.

### Results

#### `POST /api/results/bulk`

Authenticated. JSON body:

```json
{
  "exam": "Half Yearly",
  "subjectId": "<subject MongoDB _id>",
  "marks": [
    { "studentId": "<student MongoDB _id>", "theoryMarks": 72, "practicalMarks": 18 }
  ]
}
```

Each mark is upserted by student, exam, and subject. Totals and grades are calculated by the server. Returns `{ success: true, message: "... student records processed successfully" }`. An unknown subject returns `404`.

#### `GET /api/results`

Authenticated. Optional query parameters: `exam`, `subjectId`, and `studentId`. Valid 24-character MongoDB IDs supplied for `subjectId` and `studentId` are applied as filters; malformed IDs are ignored. Returns `{ success, count, data }`, with student and subject details populated.

### Report cards

#### `POST /api/report-cards`

Authenticated. Creates or updates metadata for a student/exam pair (upsert). JSON body fields:

```json
{
  "studentId": "<student MongoDB _id>",
  "exam": "Half Yearly",
  "coCurricular": [],
  "personalAssessment": [],
  "remarks": "",
  "finalResult": "",
  "newSessionStartDate": ""
}
```

Returns `{ success: true, data: <report card> }`.

#### `GET /api/report-cards/:studentId?exam=<exam>`

Authenticated. Requires an ObjectId `studentId` and an `exam` query parameter. Returns `{ success: true, data: { academics, metaData } }`. If both academic results and metadata are absent, returns `404`; invalid ID or missing exam returns `400`.

#### `GET /api/report-cards/pdf/:studentId?exam=<exam>`

Authenticated. Requires a valid student ObjectId and `exam` query parameter. Streams a PDF download with `Content-Type: application/pdf` and an attachment filename based on the student's name. The generated PDF is also written under the server process's `generated-reports` directory. Missing exam or invalid ID returns `400`; unknown student returns `404`.

## Authentication and error responses

Protected routes return `401` when the token is missing, invalid, expired, or belongs to a user that no longer exists. Admin-only routes return `403` for authenticated non-admin users. Validation and controller errors generally return a JSON object with a `message`; endpoints using `ApiError` are passed through the shared error handler.

## Notes

- This reference reflects the routes registered in the current source code; it does not imply that a particular deployment exposes the same version.
- `GET /api/sections` currently reads distinct section names from student records. It does not list the `Section` collection.
- There is no logout route registered in the current server.
- Route files use singular prefixes for exams (`/api/exam`) and teachers (`/api/teacher`), despite some controller comments referring to plural paths.
