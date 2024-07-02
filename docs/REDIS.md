# Redis Naming Convention Guide

This guide outlines the naming conventions for Redis keys, as adopted by many large companies to ensure consistency, maintainability, and performance in their Redis usage.

## Key Structure

A Redis key is typically structured as follows:

```
  <namespace>:<type>:<identifier>
```

- **Namespace**: A namespace is a high-level category or the name of the application or service. It helps in logically separating keys in shared Redis instances.
- **Type**: The type indicates the kind of data the key holds (e.g., `user`, `order`, `session`).
- **Identifier**: A unique identifier for the item, such as a user ID, order ID, etc.

## Naming Convention Rules

1. **Use Colons for Hierarchy**: Use colons `:` to separate the parts of your keys into a hierarchy.
2. **Keep It Short but Meaningful**: While keys should be descriptive, they also need to be concise to save memory and reduce lookup time.
3. **Use Dashes or Underscores for Multi-Word Fields**: If your type or identifier consists of multiple words, use dashes `-` or underscores `_` to separate the words.
4. **Lowercase**: Use lowercase letters for all parts of the key to maintain consistency.
5. **Prefix with Namespace**: Always prefix your keys with a namespace related to your application or service.

## Examples

- `app:user:12345` - Represents data for a user with ID 12345 in the application.
- `ecommerce:order:98765` - Represents an order with ID 98765 in an e-commerce system.
- `service:session:abcde` - Represents a session with ID abcde in a service.
