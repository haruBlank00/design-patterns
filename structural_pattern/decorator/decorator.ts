function column(target, key, descriptor) {
  console.log("target", target);
  console.log("key", key);
  console.log("descriptor", descriptor);
}

class User {
  @column
  greet(name: string) {
    console.log("hello world", name);
  }
}

new User();
