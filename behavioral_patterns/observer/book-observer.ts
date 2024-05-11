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

interface OptIn {
  author: string[];
  genre: string[];
}
class Customer implements Reader {
  private name: string = "";
  private optIn: OptIn = {
    author: [],
    genre: [],
  };
  constructor(name: string) {
    this.name = name;
  }

  normalizeText(text: string) {
    const newText = text.trim().toLowerCase();
    const isFalsy = Boolean(newText) === false;
    if (isFalsy) {
      throw new Error(
        `Please enter a valid text, not an empty one !!. \n text: ${text}`
      );
    }
    return newText;
  }

  optInAuthor(author: string) {
    this.optIn.author.push(this.normalizeText(author));
    return this;
  }
  optOutAuthor(author: string) {
    try {
      const index = this.optIn.author.indexOf(this.normalizeText(author));
      const doestNotExist = index === -1;
      if (doestNotExist) {
        console.log(
          "Oh well. Looks like you're not subscribed to that autor..."
        );
      }
      return this;
    } catch (e) {
      console.log((e as Error).message);
    }
  }

  optInGenre(genre: string) {
    this.optIn.genre.push(this.normalizeText(genre));
    return this;
  }

  optOutGenre(genre: string) {
    try {
      const index = this.optIn.genre.indexOf(this.normalizeText(genre));
      const doestNotExist = index === -1;
      if (doestNotExist) {
        console.log(
          "Oh well. Looks like you're not subscribed to that genre..."
        );
      }
      return this;
    } catch (e) {
      console.log((e as Error).message);
    }
  }

  update(subject: PublicationHouse, book: Book): void {
    const { author, genre } = book;

    const hasOptIn = this.hasOptIn();

    if (!hasOptIn) {
      console.group("\nUpdate with no OptIn");
      console.log("name: ", this.name);
      console.log(`Hey ${this.name}. We got a new book for you :).`);
      console.log(`Book: ${book.title} by ${book.author} (${book.genre})`);
      console.groupEnd();
      return;
    }

    const isMyOptInAuthor = this.optIn.author.includes(
      this.normalizeText(author)
    );

    const isMyOptInGenre = this.optIn.genre.includes(this.normalizeText(genre));

    if (isMyOptInAuthor || isMyOptInGenre) {
      console.group("\nUpdate for OPT in");
      console.log(`Hey ${this.name}. We got a new book for you :).`);
      console.log(`Book: ${book.title} by ${book.author} (${book.genre})`);
      console.groupEnd();
      return;
    }
  }

  private hasOptIn() {
    const hasOptInAuthor = this.optIn.author.length > 0;
    const hasOptInGenre = this.optIn.genre.length > 0;
    return hasOptInAuthor || hasOptInGenre;
  }
}

const penguinPublisher = new Publication();

const reader1 = new Customer("Haru");
const reader2 = new Customer("Baka");
const reader3 = new Customer("Rose");

reader3.optInAuthor("Rock Lee");
penguinPublisher.attatch(reader1);
penguinPublisher.attatch(reader2);
penguinPublisher.addABook({
  title: "To Kill a Mockingbird",
  author: "Harper Lee",
  description:
    "A novel set in the American South during the 1930s, dealing with the issues of racial injustice and moral growth.",
  genre: "Fiction",
});

console.log("*** *** ***");

reader1.optInAuthor("Harper Lee");
penguinPublisher.addABook({
  title: "Not to kill a mocking bird",
  author: "Rock Lee",
  description:
    "A novel set in the American South during the 1930s, dealing with the issues of racial injustice and moral growth.",
  genre: "Fiction",
});

penguinPublisher.addABook({
  title: "Not to kill a mocking bird",
  author: "Harper Lee",
  description:
    "A novel set in the American South during the 1930s, dealing with the issues of racial injustice and moral growth.",
  genre: "Fiction",
});
