# RabbitMQ Queue Naming Convention

To ensure clarity, consistency, and scalability in our application's messaging system, we adhere to a specific naming convention for RabbitMQ queues. This convention facilitates easier management, monitoring, and troubleshooting of queues across different environments and features within our application.

## Convention Structure

Our queue naming convention follows the structure:

```
  <app>.<env>.<feature>.<action>
```

- `app`: The name of the application or service. This helps in identifying which application the queue belongs to.
- `env`: The deployment environment of the queue. Typical values include `dev`, `test`, `staging`, `prod`, etc. This is crucial for separating queues across different stages of the development lifecycle.
- `feature`: The specific feature or domain within the application that the queue is associated with. This could be a broad area like `notifications`, `orders`, `users`, etc.
- `action`: The specific action or type of messages the queue handles. Examples include `send`, `update`, `delete`, etc.

## Example

Given the convention, a queue name might look like this:

This name indicates that the queue belongs to the `myApp` application, is used in the `prod` (production) environment, pertains to the `notifications` feature, and handles `send` actions.

## Benefits

Adhering to this naming convention offers several benefits:

- **Clarity**: The purpose and scope of each queue are immediately apparent from its name.
- **Scalability**: New queues can be systematically named and integrated into the system without confusion.
- **Environment Separation**: It's easy to distinguish between queues used in different environments, preventing cross-environment message processing.
- **Troubleshooting**: Identifying problematic queues or patterns becomes more straightforward.

## Compliance

All team members are expected to follow this naming convention when creating new queues or modifying existing ones. Adherence to the convention should be checked as part of the code review process.
