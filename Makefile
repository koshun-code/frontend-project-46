install: #make install after problem
				npm ci
gendiff:
				node gendiff.js
publish:
				npm publish --dry-run
lint:
				npx eslint .
