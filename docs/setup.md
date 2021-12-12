To install the Secret Santa app on a new server, first install the prerequisites (node, npm, and postgresql server and client).
It's up to you or your system administrator to create a database user, create an empty database, and to provide a hostname,
port, and credentials to access the database.

Once this is done, run `npm install` to download Secret Santa's dependencies.

Create the database tables by running `database/database_init.sql` in your postgresql client. For example, if the postgresql
server is running on localhost and default authentication is enabled (i.e., with the default username and no password),
and the database has been created and is called `ssanta`, you can run `psql -d ssanta < database/fake_data.sql` to create all
of the tables. If you would like some fake data so you can explore the interface, this can be loaded by running
`psql -d ssanta < database/fake_data.sql`.

Then, to run the web server on port 3030, execute this command:

`PORT=3030 DATABASE_URL=postgres://user:pass@localhost/ssanta node bin/www`

Then navigate to http://localhost:3030 and enjoy!
