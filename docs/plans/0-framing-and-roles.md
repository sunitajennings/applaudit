# Applaudit

A social Oscar prediction party app. Host parties, fill out ballots, and compete with friends during live award shows.

## Proposed Definitions

### Award show
An event that people are making predictions for. 
An award-show has a name (example: "Oscars 2026"), list of categories (fixed), nominees per category (fixed) that represent the show's roster, and a winner per category. 

The award-show will have a state: start in "upcoming", move to "inprogress", end in "completed". 

When the award-show is "upcoming", no categories will have a winner.
When the award-show is "inprogress", categories may be updated with a winner.
When the award-show is "completed", all categories must have a winner, and the award-show will no longer be editable.

In this version, there can only be one award-show at a time.

### Ballot 
A user's predictions for an award-show. 
Predictions are made per award-show category, i.e. which nominee will win each category. A ballot can also have a user-specified name. A user can have multiple ballots for a single award-show. 

A user must be part of a group to create a ballot.

Ballots are only user-editable when the award-show is "upcoming".
Ballot categories will have a computed score of 0 or 1, based on whether the prediction matches the award-show category winner.
Ballots have a computed overall score: the sum of all its category scores.

Admins can modify user ballots, but it will be clear when a change is made by an admin or the ballot's owner. No other user can modify someone else's ballot.

### Group (aka party)
A set of users that can see each other's ballots for an award-show.

Any user can create a new group. The creator of the group is called the "host". The host invites users to the group and users will "click to join". 

A user can be part of multiple groups. Their ballots are scoped to an individual group. Users can copy ballots between groups

An admin can do everything any host can do.

## Joining a group (invitation flow)

## Scoring

## Proposed Roles

- Admin - site admin, can do everything on site. Think of us as "app support" for all parties.
- User - can host parties or join existing groups.
- Host - an admin or a user who...
- Participant - an admin or a user who can create ballots, fill them out, and see other ballots in their group.
