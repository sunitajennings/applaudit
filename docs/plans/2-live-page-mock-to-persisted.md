# Live Page: Mock → Persisted Data

Analysis of every mocked element in `src/app/(onboarding)/live/page.tsx` and what real data source exists (or needs to exist) to replace it.

---

## Resolved

| Item | Replacement |
|---|---|
| `CURRENT_USER_ID` | `useSession().user.id` |
| `MOCK_BALLOTS` (mine) | `getBallotsByUser(supabase, userId)` from `src/lib/queries/ballots.ts` |
| `MOCK_CHOICES` (mine) | `getChoicesForBallot(supabase, ballotId)` per ballot from `src/lib/queries/ballots.ts` |
| `MOCK_USERS` | `getProfilesByGroup(supabase, groupId)` from `src/lib/queries/profiles.ts`; groupId from `useSession().profile.groupId`; null groupId fetches users with no group |

---

## Remaining mocked elements

### 1. `MOCK_BALLOTS` (all) → All group ballots for leader scoring + who-picked-whom
**Used at:** `allBallots`, which feeds:
- `leaderUserIds` — scoring all users across all ballots
- `ballotsWhoPickedNominee` — which ballots picked each nominee per category

**Real source needed:** `getBallotsByGroup(supabase, groupId)` — no such query exists yet. `groupId` is available from `useSession().profile.groupId`.

---

### 2. `MOCK_CHOICES` (all) → All choices across all group ballots
**Used at:** `getLeaderUserIds` and `getBallotsWhoPickedNominee`

**Real source needed:** Bulk `getChoicesForBallots(supabase, ballotIds)` — doesn't exist yet. Would be called after resolving all group ballots.

---

### 3. `declaredWinners` → Winner state
**Current:** `localStorage` via `src/lib/live/storage.ts` — single-device only, not shared across users.

**Real source needed:** A Supabase table (e.g. `declared_winners`) for real-time multi-user sync. Not blocking for prototype, but all users currently see independent winner states.

---

## What still needs to be built

| Mocked item | Used for | Real source needed | Exists? |
|---|---|---|---|
| `MOCK_BALLOTS` (all) | Leader scoring + who-picked-whom | `getBallotsByGroup(groupId)` | ❌ |
| `MOCK_CHOICES` (all) | Leader scoring + who-picked-whom | `getChoicesForBallots(ballotIds)` | ❌ |
| `declaredWinners` | Winner state | Supabase table for multi-user sync | ⚠️ localStorage only |

`MOCK_BALLOTS` and `MOCK_CHOICES` (all) share the same dependency: `groupId` from `profile.groupId` in the session. Once `getBallotsByGroup` exists, `getChoicesForBallots` can be called with the resulting ballot IDs.
