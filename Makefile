install: #make install after problem
				npm link
publish:
				npm publish --dry-run
push:
			npm update
lint:
				npx eslint .
test:
				npm run test