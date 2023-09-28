# The core Folder

The core folder is where anything goes that is part of the core of the application and should ONLY be imported into the AppModule.

- DO import modules that should be instantiated once in your app.
- DO place services in the module, but do not provide them.
- DO NOT declare components, pipes, directives.
- DO NOT import the CoreModule into any modules other than the AppModule.
