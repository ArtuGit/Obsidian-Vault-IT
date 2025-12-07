AWS EventBridge is a serverless event bus service that enables you to build event-driven applications at scale. It acts as a central nervous system for your distributed applications, allowing different services to communicate through events without tight coupling.

## What is EventBridge?

EventBridge is a fully managed event routing service that connects applications using events. It receives events from various sources, applies rules to determine where to route them, and delivers them to target services. Think of it as a sophisticated post office that knows exactly where to deliver messages based on their content and addressing.

## Core Concepts

### Event Bus

An event bus is a pipeline that receives events. EventBridge provides a default event bus, but you can create custom event buses for different applications or environments.

### Events

Events are JSON objects that represent a change in state or an update. They contain metadata about what happened, when it happened, and where it happened.

### Rules

Rules determine which events to route to which targets. They use event patterns to match incoming events and can filter based on event content.

### Targets

Targets are AWS services or custom applications that receive events. Popular targets include Lambda functions, SQS queues, SNS topics, and Step Functions.

## Setting Up EventBridge with TypeScript

First, install the necessary AWS SDK packages:

bash

```bash
npm install @aws-sdk/client-eventbridge @aws-sdk/types
npm install -D @types/node typescript
```

### Basic EventBridge Client Setup

typescript

```typescript
import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';

const eventBridgeClient = new EventBridgeClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Type definitions for better TypeScript support
interface CustomEvent {
  orderId: string;
  customerId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
}

interface EventBridgeEvent {
  Source: string;
  DetailType: string;
  Detail: string;
  EventBusName?: string;
}
```

### Publishing Events

typescript

```typescript
async function publishOrderEvent(orderData: CustomEvent): Promise<void> {
  const event: EventBridgeEvent = {
    Source: 'ecommerce.orders',
    DetailType: 'Order Status Change',
    Detail: JSON.stringify(orderData),
    EventBusName: 'custom-event-bus', // Optional: defaults to 'default'
  };

  const command = new PutEventsCommand({
    Entries: [event],
  });

  try {
    const result = await eventBridgeClient.send(command);
    console.log('Event published successfully:', result);
    
    // Check for failed entries
    if (result.FailedEntryCount && result.FailedEntryCount > 0) {
      console.error('Some events failed to publish:', result.Entries);
    }
  } catch (error) {
    console.error('Error publishing event:', error);
    throw error;
  }
}

// Usage example
const orderEvent: CustomEvent = {
  orderId: 'order-123',
  customerId: 'customer-456',
  amount: 99.99,
  status: 'completed',
  timestamp: new Date().toISOString(),
};

publishOrderEvent(orderEvent);
```

### Batch Event Publishing

For better performance, you can publish multiple events in a single request:

typescript

```typescript
async function publishBatchEvents(events: CustomEvent[]): Promise<void> {
  const eventEntries: EventBridgeEvent[] = events.map(event => ({
    Source: 'ecommerce.orders',
    DetailType: 'Order Status Change',
    Detail: JSON.stringify(event),
  }));

  const command = new PutEventsCommand({
    Entries: eventEntries,
  });

  try {
    const result = await eventBridgeClient.send(command);
    console.log(`Published ${events.length} events successfully`);
    
    if (result.FailedEntryCount && result.FailedEntryCount > 0) {
      console.error(`${result.FailedEntryCount} events failed to publish`);
    }
  } catch (error) {
    console.error('Error publishing batch events:', error);
    throw error;
  }
}
```

## Creating and Managing Event Buses

typescript

```typescript
import { 
  CreateEventBusCommand, 
  DeleteEventBusCommand, 
  ListEventBusesCommand 
} from '@aws-sdk/client-eventbridge';

async function createCustomEventBus(busName: string): Promise<void> {
  const command = new CreateEventBusCommand({
    Name: busName,
    Tags: [
      { Key: 'Environment', Value: 'production' },
      { Key: 'Application', Value: 'ecommerce' },
    ],
  });

  try {
    const result = await eventBridgeClient.send(command);
    console.log('Event bus created:', result.EventBusArn);
  } catch (error) {
    console.error('Error creating event bus:', error);
    throw error;
  }
}

async function listEventBuses(): Promise<void> {
  const command = new ListEventBusesCommand({});
  
  try {
    const result = await eventBridgeClient.send(command);
    console.log('Available event buses:');
    result.EventBuses?.forEach(bus => {
      console.log(`- ${bus.Name}: ${bus.Arn}`);
    });
  } catch (error) {
    console.error('Error listing event buses:', error);
  }
}
```

## Event Rules and Patterns

typescript

```typescript
import { PutRuleCommand, PutTargetsCommand } from '@aws-sdk/client-eventbridge';

async function createEventRule(): Promise<void> {
  // Create a rule that matches order completion events
  const ruleCommand = new PutRuleCommand({
    Name: 'OrderCompletionRule',
    EventPattern: JSON.stringify({
      source: ['ecommerce.orders'],
      'detail-type': ['Order Status Change'],
      detail: {
        status: ['completed']
      }
    }),
    State: 'ENABLED',
    Description: 'Routes completed orders to processing Lambda',
  });

  try {
    const ruleResult = await eventBridgeClient.send(ruleCommand);
    console.log('Rule created:', ruleResult.RuleArn);

    // Add Lambda function as target
    const targetCommand = new PutTargetsCommand({
      Rule: 'OrderCompletionRule',
      Targets: [
        {
          Id: '1',
          Arn: 'arn:aws:lambda:us-east-1:123456789012:function:ProcessCompletedOrder',
          RoleArn: 'arn:aws:iam::123456789012:role/EventBridgeRole',
        },
      ],
    });

    await eventBridgeClient.send(targetCommand);
    console.log('Target added to rule');
  } catch (error) {
    console.error('Error creating rule:', error);
    throw error;
  }
}
```

## Lambda Function Event Handler

Here's how to handle EventBridge events in a Lambda function:

typescript

```typescript
import { EventBridgeEvent, Context } from 'aws-lambda';

interface OrderDetail {
  orderId: string;
  customerId: string;
  amount: number;
  status: string;
  timestamp: string;
}

export const handler = async (
  event: EventBridgeEvent<'Order Status Change', OrderDetail>,
  context: Context
): Promise<void> => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  const { source, 'detail-type': detailType, detail } = event;

  try {
    switch (detailType) {
      case 'Order Status Change':
        await handleOrderStatusChange(detail);
        break;
      default:
        console.log(`Unhandled event type: ${detailType}`);
    }
  } catch (error) {
    console.error('Error processing event:', error);
    throw error; // This will cause Lambda to retry
  }
};

async function handleOrderStatusChange(orderDetail: OrderDetail): Promise<void> {
  console.log(`Processing order ${orderDetail.orderId} with status ${orderDetail.status}`);
  
  if (orderDetail.status === 'completed') {
    // Send confirmation email
    await sendOrderConfirmation(orderDetail);
    
    // Update inventory
    await updateInventory(orderDetail);
    
    // Process payment
    await processPayment(orderDetail);
  }
}

async function sendOrderConfirmation(order: OrderDetail): Promise<void> {
  // Implementation for sending confirmation email
  console.log(`Sending confirmation email for order ${order.orderId}`);
}

async function updateInventory(order: OrderDetail): Promise<void> {
  // Implementation for updating inventory
  console.log(`Updating inventory for order ${order.orderId}`);
}

async function processPayment(order: OrderDetail): Promise<void> {
  // Implementation for processing payment
  console.log(`Processing payment for order ${order.orderId}`);
}
```

## Best Practices

### Error Handling and Retry Logic

typescript

```typescript
async function publishEventWithRetry(
  event: CustomEvent,
  maxRetries: number = 3
): Promise<void> {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await publishOrderEvent(event);
      return; // Success, exit retry loop
    } catch (error) {
      lastError = error as Error;
      console.warn(`Attempt ${attempt} failed:`, error);
      
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw new Error(`Failed to publish event after ${maxRetries} attempts: ${lastError?.message}`);
}
```

### Event Validation

typescript

```typescript
import Ajv from 'ajv';

const ajv = new Ajv();

const orderEventSchema = {
  type: 'object',
  properties: {
    orderId: { type: 'string' },
    customerId: { type: 'string' },
    amount: { type: 'number', minimum: 0 },
    status: { type: 'string', enum: ['pending', 'completed', 'failed'] },
    timestamp: { type: 'string', format: 'date-time' },
  },
  required: ['orderId', 'customerId', 'amount', 'status', 'timestamp'],
};

const validateOrderEvent = ajv.compile(orderEventSchema);

async function publishValidatedEvent(event: CustomEvent): Promise<void> {
  if (!validateOrderEvent(event)) {
    throw new Error(`Invalid event data: ${JSON.stringify(validateOrderEvent.errors)}`);
  }
  
  await publishOrderEvent(event);
}
```

## Monitoring and Observability

### Custom Metrics

typescript

```typescript
import { CloudWatchClient, PutMetricDataCommand } from '@aws-sdk/client-cloudwatch';

const cloudWatchClient = new CloudWatchClient({ region: 'us-east-1' });

async function publishCustomMetric(metricName: string, value: number): Promise<void> {
  const command = new PutMetricDataCommand({
    Namespace: 'EventBridge/CustomMetrics',
    MetricData: [
      {
        MetricName: metricName,
        Value: value,
        Unit: 'Count',
        Timestamp: new Date(),
      },
    ],
  });

  try {
    await cloudWatchClient.send(command);
  } catch (error) {
    console.error('Error publishing metric:', error);
  }
}

// Usage in event publishing
async function publishEventWithMetrics(event: CustomEvent): Promise<void> {
  const startTime = Date.now();
  
  try {
    await publishOrderEvent(event);
    await publishCustomMetric('EventsPublished', 1);
    
    const duration = Date.now() - startTime;
    await publishCustomMetric('EventPublishDuration', duration);
  } catch (error) {
    await publishCustomMetric('EventPublishErrors', 1);
    throw error;
  }
}
```

## Common Use Cases

EventBridge excels in several scenarios:

**Microservices Communication**: Decouple services by using events instead of direct API calls. When a user places an order, publish an event that triggers inventory updates, payment processing, and notification sending.

**Application Integration**: Connect SaaS applications with AWS services. For example, route Salesforce opportunity updates to Lambda functions for data processing.

**Real-time Processing**: Build reactive systems that respond immediately to changes. Stream processing pipelines can react to data updates in real-time.

**Audit and Compliance**: Create audit trails by routing all application events to logging and monitoring systems.

## Conclusion

AWS EventBridge provides a powerful foundation for building event-driven architectures. Its serverless nature, rich filtering capabilities, and extensive integration options make it ideal for modern cloud applications. By following the patterns and examples in this guide, you can create robust, scalable event-driven systems that respond efficiently to changing business requirements.

The key to success with EventBridge lies in designing clear event schemas, implementing proper error handling, and monitoring your event flows effectively. Start small with a single event type and gradually expand your event-driven architecture as your understanding and requirements grow.

