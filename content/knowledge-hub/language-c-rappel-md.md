---
title: C Language Quick Reference for LeetCode Beginners
excerpt: Comprehensive C programming guide tailored for beginners practicing LeetCode problems, including arrays, pointers, linked lists, trees, recursion, sorting, dynamic programming, and more.
tags:
  - C
  - Programming
  - LeetCode
  - Algorithms
  - Data
  - Structures
  - Beginner
  - French
category: Programming
---


Pour declarer un tableau : 
```c
char tableau[] = {'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'};
```

Prendre le premier charactere d'une chaine de charactere : 

### Chaîne sous forme de pointeur (`char *`)

```C
char *s = "bonjour";

char premier = *s;     // OK : donne 'b'
char aussiPremier = s[0]; // OK : donne aussi 'b'
```
### Chaîne sous forme de tableau (`char[]`)
```C
char tableau[] = "bonjour";

char premier = *tableau;   // OK : donne 'b'
char aussiPremier = tableau[0]; // OK : donne aussi 'b'
```

Great! I’ll create a C language note tailored for a beginner focused on solving LeetCode problems. It will include syntax reminders and code templates for common algorithms and data structures like arrays, linked lists, trees, recursion, dynamic programming, and more.  
I'll let you know once it's ready for you to review and use.

# C Quick Reference for LeetCode

## Basic Input/Output

**Template: Reading and Printing an Integer**

```c
#include <stdio.h>
int main() {
    int x;
    scanf("%d", &x);
    printf("%d\n", x);
    return 0;
}
```

**Template: Reading a String and Printing**

```c
#include <stdio.h>
int main() {
    char str[100];
    scanf("%99s", str);
    printf("%s\n", str);
    return 0;
}
```

## Arrays and Strings

**Template: Array Declaration and Traversal**

```c
#include <stdio.h>
int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    int n = 5;
    for(int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
    return 0;
}
```

**Template: String Declaration and Functions**

```c
#include <stdio.h>
#include <string.h>
int main() {
    char s[100] = "hello";
    int len = strlen(s);
    char t[100];
    strcpy(t, s);
    strcat(s, " world");
    printf("%s (len=%d)\n", s, len);
    return 0;
}
```

## Pointers and Memory Management

**Template: Pointer and malloc**

```c
#include <stdio.h>
#include <stdlib.h>
int main() {
    int *p = malloc(sizeof(int));
    if (p == NULL) return 1;
    *p = 10;
    printf("%d\n", *p);
    free(p);
    return 0;
}
```

**Template: Pointer to Array**

```c
#include <stdio.h>
int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int *p = arr;
    printf("%d\n", *(p+2)); // prints arr[2]
    return 0;
}
```

## Linked Lists (Singly and Doubly)

**Template: Singly Linked List Node & Insert at Head**

```c
#include <stdlib.h>
typedef struct ListNode {
    int val;
    struct ListNode *next;
} ListNode;

ListNode* insertAtHead(ListNode* head, int val) {
    ListNode* newNode = malloc(sizeof(ListNode));
    newNode->val = val;
    newNode->next = head;
    return newNode;
}
```

**Template: Doubly Linked List Node & Insert at Head**

```c
#include <stdlib.h>
typedef struct DListNode {
    int val;
    struct DListNode *prev, *next;
} DListNode;

DListNode* insertDoubly(DListNode* head, int val) {
    DListNode* newNode = malloc(sizeof(DListNode));
    newNode->val = val;
    newNode->prev = NULL;
    newNode->next = head;
    if (head) head->prev = newNode;
    return newNode;
}
```

## Binary Trees and Tree Traversal

**Template: Binary Tree Node**

```c
#include <stdlib.h>
typedef struct TreeNode {
    int val;
    struct TreeNode *left, *right;
} TreeNode;
```

**Template: Inorder Traversal**

```c
#include <stdio.h>
void inorder(TreeNode* root) {
    if (root) {
        inorder(root->left);
        printf("%d ", root->val);
        inorder(root->right);
    }
}
```

**Template: Preorder Traversal**

```c
#include <stdio.h>
void preorder(TreeNode* root) {
    if (root) {
        printf("%d ", root->val);
        preorder(root->left);
        preorder(root->right);
    }
}
```

**Template: Postorder Traversal**

```c
#include <stdio.h>
void postorder(TreeNode* root) {
    if (root) {
        postorder(root->left);
        postorder(root->right);
        printf("%d ", root->val);
    }
}
```

**Template: Level Order (Breadth-First) Traversal**

```c
#include <stdio.h>
#include <stdlib.h>
#define MAX_QUEUE 100
TreeNode* queue[MAX_QUEUE];
int front = 0, back = 0;

void enqueue(TreeNode* x) { queue[back++] = x; }
TreeNode* dequeue() { return queue[front++]; }
int isEmpty() { return front == back; }

void levelOrder(TreeNode* root) {
    if (!root) return;
    front = back = 0;
    enqueue(root);
    while (!isEmpty()) {
        TreeNode* node = dequeue();
        printf("%d ", node->val);
        if (node->left) enqueue(node->left);
        if (node->right) enqueue(node->right);
    }
}
```

## Recursion

**Template: Factorial (Recursion)**

```c
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
```

**Template: Fibonacci (Recursion)**

```c
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}
```

## Iteration and Loops

**Template: For Loop**

```c
for (int i = 0; i < n; i++) {
    // code
}
```

**Template: While Loop**

```c
int i = 0;
while (i < n) {
    // code
    i++;
}
```

**Template: Do-While Loop**

```c
int i = 0;
do {
    // code
    i++;
} while (i < n);
```

## Hashing (Arrays or Structs)

**Template: Frequency Array (Counting)**

```c
int freq[1000] = {0};
int x = 5;
freq[x]++;
```

**Template: Simple Hash Map Using Array of Struct (No Collision Handling)**

```c
#define SIZE 100
typedef struct {
    int key;
    int value;
} Entry;

Entry table[SIZE];

int hash(int key) {
    return key % SIZE;
}

void insert(int key, int value) {
    int idx = hash(key);
    table[idx].key = key;
    table[idx].value = value;
}
```

**Template: Hash Map Using Chaining (Linked Lists)**

```c
#define SIZE 100
typedef struct Node {
    int key, value;
    struct Node* next;
} Node;

Node* hashTable[SIZE];

int hash(int key) {
    return key % SIZE;
}

void insert(int key, int value) {
    int idx = hash(key);
    Node* newNode = malloc(sizeof(Node));
    newNode->key = key;
    newNode->value = value;
    newNode->next = hashTable[idx];
    hashTable[idx] = newNode;
}
```

## Stacks and Queues

**Template: Stack Using Array**

```c
#define MAX 100
int stackArr[MAX];
int top = -1;

void push(int x) {
    if (top < MAX - 1) stackArr[++top] = x;
}

int pop() {
    if (top >= 0) return stackArr[top--];
    return -1; // or error
}
```

**Template: Stack Using Linked List**

```c
#include <stdlib.h>
typedef struct Node {
    int val;
    struct Node* next;
} Node;

Node* topNode = NULL;

void push(int x) {
    Node* newNode = malloc(sizeof(Node));
    newNode->val = x;
    newNode->next = topNode;
    topNode = newNode;
}

int pop() {
    if (!topNode) return -1;
    Node* temp = topNode;
    int val = temp->val;
    topNode = topNode->next;
    free(temp);
    return val;
}
```

**Template: Queue Using Array**

```c
#define MAXQ 100
int queueArr[MAXQ];
int frontQ = 0, backQ = 0;

void enqueue(int x) {
    queueArr[backQ++] = x;
}

int dequeue() {
    if (frontQ < backQ) return queueArr[frontQ++];
    return -1;
}
```

**Template: Queue Using Linked List**

```c
#include <stdlib.h>
typedef struct NodeQ {
    int val;
    struct NodeQ* next;
} NodeQ;

NodeQ* head = NULL;
NodeQ* tail = NULL;

void enqueue(int x) {
    NodeQ* newNode = malloc(sizeof(NodeQ));
    newNode->val = x;
    newNode->next = NULL;
    if (tail) tail->next = newNode;
    else head = newNode;
    tail = newNode;
}

int dequeue() {
    if (!head) return -1;
    NodeQ* temp = head;
    int val = temp->val;
    head = head->next;
    if (!head) tail = NULL;
    free(temp);
    return val;
}
```

## Sorting Algorithms

**Template: Bubble Sort**

```c
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}
```

**Template: Merge Sort**

```c
void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}
```

**Template: Quick Sort**

```c
int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i+1];
    arr[i+1] = arr[high];
    arr[high] = temp;
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
```

## Binary Search

**Template: Iterative Binary Search**

```c
int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
```

**Template: Recursive Binary Search**

```c
int binarySearchRec(int arr[], int left, int right, int target) {
    if (left > right) return -1;
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    else if (arr[mid] < target) return binarySearchRec(arr, mid+1, right, target);
    else return binarySearchRec(arr, left, mid-1, target);
}
```

## Sliding Window Technique

**Template: Fixed-Size Sliding Window (Max Sum of Size k)**

```c
int maxSumSubarray(int arr[], int n, int k) {
    if (n < k) return 0;
    int max_sum = 0;
    int window_sum = 0;
    for (int i = 0; i < k; i++) {
        window_sum += arr[i];
    }
    max_sum = window_sum;
    for (int i = k; i < n; i++) {
        window_sum += arr[i] - arr[i-k];
        if (window_sum > max_sum) {
            max_sum = window_sum;
        }
    }
    return max_sum;
}
```

**Template: Variable-Size Sliding Window (Subarray Sum equals Target)**

```c
int subarraySum(int arr[], int n, int target) {
    int left = 0, sum = 0, count = 0;
    for (int right = 0; right < n; right++) {
        sum += arr[right];
        while (sum > target && left <= right) {
            sum -= arr[left];
            left++;
        }
        if (sum == target) {
            count++;
        }
    }
    return count;
}
```

## Two Pointer Technique

**Template: Two Pointers from Ends (Sum equals Target)**

```c
int twoSum(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) {
            return 1; // found
        }
        if (sum < target) left++;
        else right--;
    }
    return 0;
}
```

**Template: Two Pointers One Slow, One Fast (Remove Duplicates)**

```c
int removeDuplicates(int arr[], int n) {
    if (n == 0) return 0;
    int i = 0;
    for (int j = 1; j < n; j++) {
        if (arr[j] != arr[i]) {
            i++;
            arr[i] = arr[j];
        }
    }
    return i + 1;
}
```

## Dynamic Programming (1D and 2D)

**Template: 1D DP (Fibonacci Tabulation)**

```c
int fibDP(int n) {
    if (n <= 1) return n;
    int dp[n+1];
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}
```

**Template: 1D DP (Fibonacci Memoization)**

```c
int fibMemo(int n, int dp[]) {
    if (dp[n] != -1) return dp[n];
    if (n <= 1) dp[n] = n;
    else dp[n] = fibMemo(n-1, dp) + fibMemo(n-2, dp);
    return dp[n];
}
```

**Template: 2D DP (Grid Minimum Path Sum)**

```c
int minPathSum(int grid[][100], int m, int n) {
    int dp[100][100];
    dp[0][0] = grid[0][0];
    for (int i = 1; i < m; i++) {
        dp[i][0] = dp[i-1][0] + grid[i][0];
    }
    for (int j = 1; j < n; j++) {
        dp[0][j] = dp[0][j-1] + grid[0][j];
    }
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            int up = dp[i-1][j];
            int left = dp[i][j-1];
            dp[i][j] = grid[i][j] + (up < left ? up : left);
        }
    }
    return dp[m-1][n-1];
}
```