/* 
  Ok Let's make a Book Subscription system 
  - There's a publisher 
  - whenever publisher publishes a new book, observer gets notified 
  
  Let's make it into two steps:
  1. whenever publisher publishes any book, all observers gets notified
  2. Observer can opt in to genre and only get notified when that books gets added
  
  */

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
}

interface PublicationHouse {
  attatch(observer: Reader): void;
  detatch(observer: Reader): void;
  notify(book: Book): void;
}

interface Reader {
  update(subject: PublicationHouse, book: Book): void;
}

class Publication implements PublicationHouse {
  books: Book[] = [];
  private observers: Reader[] = [];

  attatch(observer: Reader): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log(`Subject: Observer has already been attatched.`);
    }
    this.observers.push(observer);
    console.log(`Subject: Attatched an observer.`);
  }
  detatch(observer: Reader): void {
    const observerIndex = this.observers.indexOf(observer);
    const notFound = observerIndex === -1;
    if (notFound) {
      return console.log("Subject: Nonexistent observer.");
    }

    this.observers.splice(observerIndex, 1);
    console.log("Subject: Detached an observer");
  }
  notify(book: Book): void {
    console.log("Subject: Notifying observers...");
    for (const observer of this.observers) {
      observer.update(this, book);
    }
  }

  addABook(book: Omit<Book, "id">) {
    const newBook = {
      id: crypto.randomUUID(),
      ...book,
    };
    this.books.push(newBook);
    console.log("Subject: Publisher has added a new book");
    this.notify(newBook);
  }

  logBooks() {
    for (const book of this.books) {
      console.log(`Book: ${book.title}`);
    }
  }
}

class Customer implements Reader {
  private name: string = "";
  constructor(name: string) {
    this.name = name;
  }

  update(subject: PublicationHouse, book: Book): void {
    console.log(`Hey ${this.name}. We got a new book for you :).`);
    console.log(`Book: ${book.title} by ${book.author} (${book.genre})`);
  }
}

const penguinPublisher = new Publication();

const reader1 = new Customer("Haru");

penguinPublisher.attatch(reader1);

penguinPublisher.addABook({
  title: "To Kill a Mockingbird",
  author: "Harper Lee",
  description:
    "A novel set in the American South during the 1930s, dealing with the issues of racial injustice and moral growth.",
  genre: "Fiction",
});

/*  [
    {
      id: "1",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      description: "A novel set in the American South during the 1930s, dealing with the issues of racial injustice and moral growth.",
      genre: "Fiction"
    },
    {
      id: "2",
      title: "1984",
      author: "George Orwell",
      description: "A dystopian novel set in a totalitarian regime, exploring themes of surveillance, propaganda, and individual freedom.",
      genre: "Science Fiction"
    },
    {
      id: "3",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description: "A novel depicting the decadence and moral decline of the American Dream in the 1920s.",
      genre: "Fiction"
    },
    {
      id: "4",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      description: "A romantic novel set in the English countryside, exploring themes of love, class, and marriage.",
      genre: "Romance"
    }
  ];
  
  */
