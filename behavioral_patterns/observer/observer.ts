/**
 * The subject also known as published declares a set of methods for managing subscribers
 */
interface Subject {
  // Attatch an observer to the publisher
  // i.e subscribe observer
  attatch(observer: Observer): void;

  // Remove an observer from the publisher
  // i.e. unsubscribe observer
  detatch(observer: Observer): void;

  // Notify all observers about an event
  notify(): void;
}

class ConcreteSubject implements Subject {
  attatch(observer: Observer): void {
    throw new Error("Method not implemented.");
  }
  detatch(observer: Observer): void {
    throw new Error("Method not implemented.");
  }
  notify(): void {
    throw new Error("Method not implemented.");
  }
}

/**
 * The Observer also knows as subscribers declare a set of methods for reacting to event that publisher has triggerd
 */
interface Observer {
  // Receive update from subject
  update(subject: Subject): void;
}

class ConcreteObserverA implements Observer {
  update(subject: Subject) {
    throw new Error("Method not implemented.");
  }
}
