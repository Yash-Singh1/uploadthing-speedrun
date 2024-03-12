# Create a donor app in ~/uploadthing-speedrun/donor that's cache and deps will be used
BUN_DEBUG_QUIET_LOGS=1 bunx create-next-app --ts --tailwind --use-bun --no-src-dir --app --import-alias \~/\* --eslint yo && cd yo && ln -s ../donor/bun.lockb ./bun.lockb && ln -s ../donor/node_modules node_modules && ln -s ../donor/.next .next
