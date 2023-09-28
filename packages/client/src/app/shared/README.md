# The shared Folder

The shared folder is where anything goes that can be reused within the app and is NOT a singleton. Anything here should never be imported into the AppModule.

- DO declare components, pipes, directives, and export them.
- DO import FormsModule, ReactiveFormsModule and other (3rd-party) modules you need.
- DO import the SharedModule into any other Feature Modules.
- DO NOT provide app-wide singleton services in your SharedModule. Instead move these to the CoreModule.
- DO NOT import the SharedModule into the AppModule.
