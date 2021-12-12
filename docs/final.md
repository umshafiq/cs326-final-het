## Title
Team-het

## Subtitle
Secret Santa Organizer

## Semester
Fall 2021

## Overview
The Secret Santa Organizer is meant to facilitate the creation and maintenance of Secret Santa groups. Typically there would be an administrator who is responsible for making sure that certain basic properties are maintained for Secret Santa assignments (for example, that nobody is assigned as their own Secret Santa), but this means that the administrator may not be able to participate. This website would maintain anonymity for everyone and make it so that even the administrator can participate in Secret Santa. The assignment algorithm is optimal in the sense that many people can quit without violating the basic rule that participants won't be assigned to themselves and (as long as there are three or more participants), nobody is their own giftee's giftee. Furthermore, the site can provide recommendations on products to buy, with referral links that will give a percentage back to the site maintainers to help offset hosting costs.

## Team Members
Umar Shafiq

## User Interface
Users are able to see different views depending on their access level.

- Unauthenticated Users
  - Sign in page
  - Sign up page
- Authenticated Users
  - Sign out page
  - Profile edit page
  - New group page (which makes them the administrator of the group they're creating)
  - Group list page (lists all the groups the user is a member of)
  - Group info page (lists information for a specific group, including the signed-in user's assignment)
  - Items suggestion page
  - Report that an item has been purchased and dispatched
  - Report that an item has been received and rate it
  - Withdraw from the group
- Group administrators
  - Group edit page
  - Create assignment
- Site administrators
  - Pages to add/edit/delete items

## APIs

- Create profile: POST to `/crud/user`
- Edit profile: PUT to `/crud/user/:id` [authenticated]
- Create group: POST to `/crud/group` [authenticated]
- Create group assignments: POST to `/crud/group/:id/assign` [authenticated, admin only]
- Update group: PUT to `/crud/group/:id`
- Report that an item has been purchased or received: PUT to `/crud/group_users/:group_id/:user_id`
- Withdraw from a group: DELETE to `/crud/group_users/:group_id/:user_id/withdraw`

## URL Routes

The following routes are all obtained via `GET` requests.

- Sign in `/login/:id` [anybody]
- Sign out `/logout` [anybody]
- Sign up `/signup` [unauthenticated]
- Edit profile `/profile` [authenticated]
- Create group page `/group`
- Group list page (lists all the groups the user is a member of) `/groups`
- Group edit page `/groups/:id/edit`
- Group info page (lists information for a specific group, including the signed-in user's assignment) `/groups/:id`
- Items suggestion page `/items`
- Report that an item has been purchased and dispatched `/groups/:id/gifter`
- Report that an item has been received and rate it `/groups/:id/giftee`
- Withdraw from the group `/groups/:id/withdraw`

## Database
The database is documented in [our schema diagram](../database/schema.pdf).

## Authentication/Authorization
Authentication is intended to be satisfied by third-party OAuth so that users don't have to maintain yet another password. OAuth can be provided by Google, Facebook, etc. This was not implemented as it was beyond our intended scope. For development use, authentication is simply done without a password (i.e., I promise that I am Bob).

## Division of Labor
I (Umar) am the sole remaining member of the group. I did the vast majority of the work.

## Conclusion
I learned a lot about deployment using Heroku and Express Routing. I think we had a few false starts with implmenting the views as HTML pages that we wound up converting to Express's native rendering engine. I also didn't anticipate that we would need some starter data to make meaningful recommendations; I'm not sure how we could have gotten more data for the project; maybe we could have sent out a survey early in the semester? As it is, we had to make do with synthetic data (i.e., my own opinions).
