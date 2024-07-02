# Socket Event Naming Convention

This project adheres to a specific naming convention for Socket.IO events to ensure consistency and clarity throughout the codebase.

## General Rules

- **CamelCase**: All event names should use camelCase.
- **Clear and Descriptive**: Event names must clearly describe the action or event they represent.
- **Distinguish Between Client and Server**: Use prefixes to differentiate events sent from the client (`client`) and the server (`server`).
- **Use Prefixes for Modules**: For projects with multiple modules, use prefixes to group events (e.g., `chat`, `game`).
- **Avoid Special Characters**: Do not use special characters in event names.
- **Combine Nouns and Verbs**: Event names should combine nouns and verbs to describe the object and action.

## Examples

- `messageReceived`: Indicates that a message has been received.
- `userConnected`: Indicates that a user has connected to the server.
- `fileUploaded`: Indicates that a file has been uploaded.
- `chatMessageSent`: Indicates that a chat message has been sent.

## Note

- This convention is consistently applied throughout the project.
- All new events added must follow this convention.

## Conclusion

Adhering to a naming convention enhances transparency and maintainability of the code. Ensure that all team members understand and apply this convention.
