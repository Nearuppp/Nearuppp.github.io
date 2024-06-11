---
title: "Electronic"
date: 2024-05-26T12:00:00Z
tags: ["Electronic", "Microcontroller"]
categories: ["School","Electronic"]
---

## 1. Conversion (Binary, Hexadecimal, etc.)

Understanding number systems is crucial in the field of engineering, especially in computer science and electrical engineering. Here's a brief overview of the different number systems and how to convert between them.

### Binary to Decimal
Binary numbers (base-2) use only 0 and 1. To convert binary to decimal (base-10), we sum the products of each bit and its corresponding power of 2. \
Those are the numbers to remember : 1 2 4 8 16 32 64 128 256

**Example:**
Binary: `1101`
Decimal: \(1 \times 2^3 + 1 \times 2^2 + 0 \times 2^1 + 1 \times 2^0 = 8 + 4 + 0 + 1 = 13\)
11010011=1∗1+1∗2+0∗4+0∗8+1∗16+0∗32+1∗64+1∗128=211

### Decimal to Binary
To convert a decimal number to binary, we repeatedly divide the number by 2 and record the remainders.

**Example:**
Decimal: `13` \
13 ÷ 2 = 6 remainder 1 \
6 ÷ 2 = 3 remainder 0 \
3 ÷ 2 = 1 remainder 1 \
1 ÷ 2 = 0 remainder 1 

Binary: `1101`

### Hexadecimal to Decimal
Hexadecimal numbers (base-16) use digits 0-9 and letters A-F. To convert hexadecimal to decimal, we multiply each digit by its corresponding power of 16.

**Example:**
Hexadecimal: `1A3`

Decimal: \(1 \times 16^2 + 10 \times 16^1 + 3 \times 16^0 = 256 + 160 + 3 = 419\)

### Decimal to Hexadecimal
To convert a decimal number to hexadecimal, we repeatedly divide the number by 16 and record the remainders.

**Example:**
Decimal: `419`  
419 ÷ 16 = 26 remainder 3  
26 ÷ 16 = 1 remainder 10 (A)  
1 ÷ 16 = 0 remainder 1  
Hexadecimal: `1A3`

## 2. Logic Gates (Logigramme)

Logic gates are the building blocks of digital circuits. They perform basic logical functions and are implemented using electronic switches like transistors.

### Basic Logic Gates
- **AND Gate:** Outputs true (1) only if both inputs are true.
- **OR Gate:** Outputs true if at least one input is true.
- **NOT Gate (Inverter):** Outputs the opposite of the input.
- **NAND Gate:** Outputs false (0) only if both inputs are true.
- **NOR Gate:** Outputs true only if both inputs are false.
- **XOR Gate:** Outputs true if the inputs are different.
- **XNOR Gate:** Outputs true if the inputs are the same.


![Doors](/img/Doors.png)

### Logic Diagrams
A logic diagram (logigramme) is a graphical representation of a circuit using symbols for logic gates. These diagrams help visualize how different gates are interconnected to perform a specific function.

## 3. Karnaugh Maps (K-maps)

Karnaugh Maps (K-maps) are a method for simplifying Boolean algebra expressions. They provide a visual way of minimizing logical functions by grouping adjacent cells representing the truth table of the function.



### How to Use K-maps
1. **Construct the K-map:** Based on the number of variables, create a grid where each cell represents a possible combination of variables.
2. **Fill in the K-map:** Place 1s in the cells corresponding to the output of the function being 1.
3. **Group the 1s:** Form groups of 1s in powers of two (1, 2, 4, 8, etc.). Groups should be as large as possible and can wrap around the edges.
4. **Write the simplified expression:** Each group translates to a product term (AND) in the simplified Boolean expression.

**Example:**
![Karnaugh](/img/Karnaugh.png)

  (a) = ā + dāb + c̄db + acđ+ caƀ+ aƀcđ 

## 4. Flip-Flops (Bascule D, JK, RS)

Flip-flops are fundamental building blocks in sequential logic circuits, used for storing binary data.

### D Flip-Flop
The D (Data or Delay) flip-flop captures the value of the D input at a particular portion of the clock cycle (usually the rising or falling edge).

**Characteristic Table:**
| D | Q(next) |
|---|---------|
| 0 |    0    |
| 1 |    1    |
![Chronogramme](/img/Dflipflop.png)
### JK Flip-Flop
The JK flip-flop is a more versatile version of the SR flip-flop that eliminates the invalid state. It has two inputs, J and K.

**Characteristic Table:**
| J | K | Q(next) |
|---|---|---------|
| 0 | 0 |   Q     | 
| 0 | 1 |   0     |
| 1 | 0 |   1     |
| 1 | 1 |  Q'     |
![Chronogramme](/img/JKflipflop.png)

### RS (or SR) Flip-Flop
The RS flip-flop has two inputs, Set (S) and Reset (R). It has a potential invalid state when both S and R are 1.

**Characteristic Table:**
| R | S | Q(next) |
|---|---|---------|
| 0 | 0 |   Q     |
| 0 | 1 |   1     |
| 1 | 0 |   0     |
| 1 | 1 |   X (Invalid) |

By understanding these fundamental concepts, we lay the groundwork for more advanced topics in digital logic design and computer architecture. These concepts are essential tools in an engineer's toolkit, enabling us to design and analyze complex systems efficiently.
