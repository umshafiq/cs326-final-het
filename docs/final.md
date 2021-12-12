Title
: Team-het

Subtitle
: Secret Santa Organizer

Semester
: Fall 2021

Overview
: The Secret Santa Organizer is meant to facilitate the creation and maintenance of Secret Santa groups. Typically there would be an administrator who is responsible for making sure that certain basic properties are maintained for Secret Santa assignments (for example, that nobody is assigned as their own Secret Santa), but this means that the administrator may not be able to participate. This website would maintain anonymity for everyone and make it so that even the administrator can participate in Secret Santa. The assignment algorithm is optimal in the sense that many people can quit without violating the basic rule that participants won't be assigned to themselves and (as long as there are three or more participants), nobody is their own giftee's giftee. Furthermore, the site can provide recommendations on products to buy, with referral links that will give a percentage back to the site maintainers to help offset hosting costs.

Team Members
: Umar Shafiq

User Interface


APIs


URL Routes



Database
: The database is documented in a schema diagram located at `database/schema.pdf` in this repo.

Authentication/Authorization
: Authentication is intended to be satisfied by third-party OAuth so that users don't have to maintain yet another password. OAuth can be provided by Google, Facebook, etc. This was not implemented as it was beyond our intended scope. For development use, authentication is simply done without a password (i.e., I promise that I am Bob).

Division of Labor
: I (Umar) am the sole remaining member of the group. I did the vast majority of the work.

Conclusion
: I learned a lot about deployment using Heroku and Express Routing. I think we had a few false starts with implmenting the views as HTML pages that we wound up converting to Express's native rendering engine. I also didn't anticipate that we would need some starter data to make meaningful recommendations; I'm not sure how we could have gotten more data for the project; maybe we could have sent out a survey early in the semester? As it is, we had to make do with synthetic data (i.e., my own opinions).

https://ssanta0.herokuapp.com/



