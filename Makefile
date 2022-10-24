install: #make install after problem
				npm link
publish:
				npm publish --dry-run
lint:
				npx eslint .
