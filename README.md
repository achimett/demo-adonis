# demo-adonis
Throwaway-project that I used to learn AdonisJS. It's a simple back-end service that models employees belonging to a department.

It uses MariaDB in a Docker container. It can be started by `scripts/mariadb.sh` after changing `.env.example` to `.env`.

Useful shell commands:

| Use | Command |
|-----|---------|
| Run migrations | `node ace migration:run` |
| Run seeders | `node ace db:seed` |
| Run tests | `node -r @adonisjs/assembler/build/register japaFile.ts` |
| Run development server | `node ace serve --watch` |
| Compile for production | `node ace build --production` |

IntelliJ run configurations are available for the above commands.
