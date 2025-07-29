---
title: Introduction to Rust Programming and Cargo
excerpt: A beginner-friendly guide to Rust programming essentials, including file setup, compiling with rustc, using Cargo for project management, variable handling, and user input.
tags:
  - Rust
  - Programming
  - Cargo
  - Beginner
  - Systems
  - Programming
  - English
category: Programming
---

#programming #rust 
All files for rust end up with the extension .rs
Commands to compile rust on powershell :
```bash
rustc main.rs 
.\main.exe
```

## Anatomy of Rust
```rust
fn main() {

}
```
This is a function. Rust requires curly brackets around all function bodies. It’s good style to place the opening curly bracket on the same line as the function declaration, adding one space in between.

```rust
println!("Hello, world!");
```
First, `println!` calls a Rust macro. If it had called a function instead, it would be entered as `println` (without the `!`).
With a ! its a macro and not a fonction

## Cargo
Cargo is Rust’s build system and package manager.Most Rustaceans use this tool to manage their Rust projects because Cargo handles a lot of tasks for you, such as building your code, downloading the libraries your code depends on, and building those libraries.
### Creating a project with Cargo
```bash
$ cargo new hello_cargo
$ cd hello_cargo
```
The first command creates a new directory and project called _hello_cargo_. We’ve named our project _hello_cargo_, and Cargo creates its files in a directory of the same name.

You’ll see that Cargo has generated two files and one directory for us: a _Cargo.toml_ file and a _src_ directory with a _main.rs_ file inside.

It has also initialized a new Git repository along with a _.gitignore_ file. Git files won’t be generated if you run `cargo new` within an existing Git repository; you can override this behavior by using `cargo new --vcs=git`.

In the toml file you'll find information on the dependencies and the project version.
Your src file for your code should be in the src file. The top-level project directory is just for README files, license information, configuration files, and anything else not related to your code.
#### Building and Running a Cargo Project
Now to run a cargo you have to be in the directory of the cargo. Run : 
```shell
cargo build
```
This command creates an executable file in _target/debug/hello_cargo_ (or _target\debug\hello_cargo.exe_ on Windows) rather than in your current directory. Because the default build is a debug build, Cargo puts the binary in a directory named _debug_. You can run the executable with this command:
```bash
$ ./target/debug/hello_cargo # or .\target\debug\hello_cargo.exe on Windows
Hello, world!
```
Running `cargo build` for the first time also causes Cargo to create a new file at the top level: _Cargo.lock_. This file keeps track of the exact versions of dependencies in your project. This project doesn’t have dependencies, so the file is a bit sparse. You won’t ever need to change this file manually; Cargo manages its contents for you.

TO do this faster we can use : 
```bash
cargo run
```
This command compile and run the code of the Cargo
Now because we just built it before it didn't rebuilt it but if you didn't it would have did it.

Cargo also provides a command called `cargo check`. This command quickly checks your code to make sure it compiles but doesn’t produce an executable
```bash
cargo check
```
This is just to check if it compile or not without building the project. It will save you a lot of time if you check your code often.

### Building for relase
When your project is finally ready for release, you can use `cargo build --release` to compile it with optimizations. This command will create an executable in _target/release_ instead of _target/debug_. The optimizations make your Rust code run faster, but turning them on lengthens the time it takes for your program to compile. This is why there are two different profiles: one for development, when you want to rebuild quickly and often, and another for building the final program you’ll give to a user that won’t be rebuilt repeatedly and that will run as fast as possible. If you’re benchmarking your code’s running time, be sure to run 
```
cargo build --release
```
and benchmark with the executable in _target/release_.


#### Library standard : 
```rust
use std::io;
```
Always use the statement "use" for each libraries
"std::io" provide the ability to accept user input for example
#### Storing Values with Variables 
```rust
let mut guess = String::new();
let apples = 5;
```
"let" statement creates the variable.
This line creates a new variable named `apples` and binds it to the value 5.  In Rust, variables are immutable by default, meaning once we give the variable a value, the value won’t change.  To make a variable mutable, we add `mut` before the variable name
`String::new` is a function that returns a new instance of a `String`. The `::` syntax in the `::new` line indicates that `new` is an associated function of the `String` type.
It creates a new empty string.

#### Receiving User Input
```Rust
    io::stdin()
        .read_line(&mut guess)
```
The `stdin` function returns an instance of `std::io::Stdin`, which is a type that represents a handle to the standard input for your terminal.

`.read_line(&mut guess)` calls the [`read_line`] method on the standard input handle to get input from the user. We’re also passing `&mut guess` as the argument to `read_line` to tell it what string to store the user input in.

The `&` indicates that this argument is a _reference_, which gives you a way to let multiple parts of your code access one piece of data without needing to copy that data into memory multiple times.

```rust
println!("You guessed: {}", guess);
```
The value of guess will be put between `{}` . You can also do like this : 
```rust
let x = 5;
let y = 10;
println!("x = {x} and y + 2 = {}", y + 2);
```
This code would print `x = 5 and y + 2 = 12`.