---
title: Introduction to Embedded Systems and FreeRTOS
excerpt: Overview of embedded systems, their hardware/software components, and the use of FreeRTOS kernel for real-time task management.
tags:
  - Embedded
  - Systems
  - FreeRTOS
  - Microcontrollers
  - Real-Time
  - Systems
  - IoT
  - English
category: Embedded Systems
---

Based on the FreeRTOS kernel

Embedded system are material but also software. They can be brake system in cars, acceleration systeme etc... We don't need to use a traditional CPU to create them. Most of the time it's used by microcontroller. The design of those system is made for the application. Each task are limited to realize.

## Physical components
- Microcontroller
- Memory (integrated or external)
- Captors
- Actuator
- Communication (RS23 for TP)
- Converter analog
- Electrical supply 
- HMI
Embedded System Structure
![Structure Embedded System](Structure%20Embedded%20System.png)

### Design Hints
- Mostlu fast response time
	- 0.01s to tens of micros
- Smallest cost
	- Less Components
	- Smallest Area
	- Only needed resources
- Best Performance/cost ratio
- Portability
- Low power
	- Battery kife
- Maintainability
### Design Activiteis
- System specification
	- Functions, Time constraintsm Cost and Power constraints
- Hardware Software Partitioning
- Hardawre synsthesis
- Software synsthesis and code generation
- Simulation
- implementation
- test
- deployment
### Design management
Different models for those system
- Water fall model
- V-model
- W model
- Spiral model
- Cascade
![Waterfall Model](Waterfall%20Model.png)
### V Model
![V Model](V%20Model.png)
- Top Down design
- Completion of a design activity is required to start the following one
#### V model activities relationship 
- Step by Step design
	- Top Down
- Correspondence with tests
- Each step has base documents
![V model activities relations](V%20model%20activities%20relations.png)
#### V model documentation
- Design documents
- Tests documents
![V model documentation](V%20model%20documentation.png)
## How to describe the behavior of a complex system ?
### Structured Analysis

#### Structure modeling methods examples
- UML / UML-RT
	- Object oriented description
	- RT for real time considerations
- SADT (Structured Analysis and Design Technique)
	- Functional data flow-oriented design approach
	- Simple method
	- No time considerations
- SA (Structured Analysis by Yourdon & Demarco)
	- Similar concecpts of SADT
		- Different formalism
	- SA-RT with time considerations for real-time systems
		- Add control flow, state diagrams
	- Merise
		- Used for information systems design
	- Agile methods
- SA-RT usage
	- System specifications 
	- Software specifications  
	- Software logical architecture  
	- Software dynamical architecture
- Two dialects
	- WARD & MELLOR
	- HATLEY PIRBHAI
## Structure analysis objective
- System partitining
	- Top down system description
	- The latest level is a basic function
![Simple structure analysis example](Simple%20structure%20analysis%20example.png)
## Structure Analysis Concepts
### Process (data transformation)
- Activities that trasnform data
- linked by dataflow to other processes, data store, and external entities
### Data flow
- Indicate transfer of data from output of one entity to input of another
- represent a data group or data element
### Data store
- a place where data is held for later use
- data stores are passive: no transformations are performed on the data
### External entity
- An activity outside the target system
- Acts as source or destination for dataflow that cross the system boundary
- External entities cannot interact directly with data stores
### Data group
- A cluster of data represented as a singel dataflow
- consits of lower level data groups, or individual elements
### Data element
- A basic unit of data
## Structured Analysis tools
- Context diagram  
- Data flow diagram  
- Data dictionary 
- Primitive Process Specification 
- Structured Walkthrough (description)
## Real -time analysis tools
- Control
- COntrol specification
### Context diagram
- Gives the main aim of the system (highest view)
- identify the external entities with witch it will communicate
- Usually controls and data joined in the same diagram

![Context diagram example](Context%20diagram%20example.png)
![Legend for context diagram](Legend%20for%20context%20diagram.png)
### Data Flow diagram
- The system (PROCESS 0) is described with DFD 0
	- The main dataflow
- Split the unique process into several ideentified processes
	- Identified by a verb and an object
- Terminal processes are described by a specification
	- THe functional primitives
![Example data flow](Example%20data%20flow.png)
![Legend data flow](Legend%20data%20flow.png)
### Store / Reservoir
- Configuration constants
- Asynchronous communication elements
![Store example](Store%20example.png)
### Data dictionary
- Defines each data elemetn and data group
- Use of BNF (Backus-Naur Form) to define structured data groups
#### Examples
Mailing Label = 
	customer_name + customer_address 
customer_name = 
	customer_last_name + customer_first_name + customer_middle_initial 
customer_address = 
	local_address + community_address + zip_code 
local_address = 
	house_number + street_name + (apt_number) 
community address = 
	city_name + [state_name | province_name]
### DFD structure
![DFD Structure](DFD%20Structure.png)
### PSPEC to describe a primitive process
- Process SPECification
- Usually one page size
IN = AUTRE FLOT DONNEE
IN = FLOT DE DONNEE EN ENTREE
IN = PARTIE A 
OUT = AUTRE INFORMATION 
PSPEC F 1.1 
-- AUTRE FLOT DONNEE SI "AUTRE FLOT DONNEE" = "FLOT DE DONNEE EN ENTREE" ALORS ENVOYER "AUTRE INFORMATION" FIN SI
![Example SPEC](Example%20SPEC.png)
#### PSPEC of a vending system
	FOR EACH Shipped-order-detail 
		GET customer-name + customer-address 
		FOR EACH part-shipped 
			GET retail-price 
			MULTIPLY retail-price by quantity-shipped 
			TO OBTAIN total-this-order 
	CALCULATE shipping-and-handling 
	ADD shipping-and-handling TO total-this-order 
		TO OBTAIN total-this-invoice 
	PRINT invoice
### Dynamical behavior model (RT Part)
![Dynamical behavior Model](Dynamical%20behavior%20Model.png)
### In practice 
- Decompose the systeme process into his main fucntions (from 3to 7)
	- LEvel 1 processes will become the kernel tasks
- Place the data flow coming from the higher level diagram on the sub functions
	- if a flow is split at this level, notice it in the dictionary : (a=b+c)
	- If the processes don't execute continuously, place a CSPEC on the diagram
		- Put the controls that activate and deactivate the processes of this level
		- Define the CSPEC
- Add internal flow(data or controls) between processes
- dd sotre elemetns
- define the PSPECS of the terminal processes
- Do it again for each decomposed process
#### Example
- A booking system with : 
	- A user interface
	- An information system interface
- Function
	- The customer choose on e itierary and the date and get a ticket
	- The reservation system holds the reservation
![Example Architecture of processes](Example%20Architecture%20of%20processes.png)
#### Additional design considerations
- Choose the well suited logic system
	- Microprocessor/microcontroller
	- CPLD/FPGA or ASICs
- Realize the best hardware/software partition
	- Software gives flexibility
		- Is cost investment
		- has memory size impact
	- Hardware gives performance and security
		- Is cost recurrent
- Choose the devlopment tools

# Hardware Equipment
-72MHz STM32F107VC ARM Cortex™
-M3 processorbased MCU in 100-pin LQFP 
-On-Chip Memory: 256KB Flash & 64KB RAM 
-External Memory: 8KB I2C Flash -Color QVGA TFT LCD with touchscreen 
-10/100 Ethernet Port -USB 2.0 Full Speed 
- USB, USB-OTG, & USB Host 
- -2 CAN Interfaces 
- -Serial/UART Port -MicroSD Card Interface 
- -5-position Joystick and push-button 
- -3-axis Motion sensor / Accelerometer 
- -Analog Voltage Control for ADC Input 
- -Audio CODEC with Line-In/Out and Speaker
- -80 GPIO pins 
- Debug Interface Connectors 
	- 20 pin JTAG (0.1 inch connector) 
	- 10 pin Cortex debug (0.05 inch connector) 
	- 20-pin Cortex debug + ETM Trace (0.05 inch connector)
![STMMicroelectronics Processor](STMMicroelectronics%20Processor.png)
![MCBSTM32C board peripherals](MCBSTM32C%20board%20peripherals.png)
![MCBSTM32C schematics](MCBSTM32C%20schematics.png)
![MCBSTM32C schematics (GPIO and serial communication)](MCBSTM32C%20schematics%20(GPIO%20and%20serial%20communication).png)
![MCBSTM32C Schematic (Power & RS232)](MCBSTM32C%20Schematic%20(Power%20&%20RS232).png)

# Development tool chain
## Keil IDE
The Keil IDE is a cross graphical development environment including : 
- a source code editor
- a project manager
- a cross compiler tool chain 
- a source level debugger • an ARM simulator

![Keil IDE](Keil%20IDE.png)
![KEIL interface](KEIL%20interface.png)
### Software development tool
### Software debug tool (Not used)
## Segger JTAG debg solution
JtagJet is a JTAG emulator for the ARM Cortex M architectures. 
- Chameleon : the associated software tool. 
- Allow source level debug in C and assembly (ARM and THUMB2 (16/32 bit instructions))
![JTAGJet](JTAGJet.png)
![Cortex M3 Characteristics](Cortex%20M3%20Characteristics.png)
### Hardware debugger (Jlink)
### Keil software debugger

STM32F10x
- CPU ARM cortex MR
	- ALU works on registres
	- ![Arm CORTEX M3](Arm%20CORTEX%20M3.png)
- CPU registers
	- Grey : accesible in privileged mode
	- ![CPU registers](CPU%20registers.png)
![Register use in C language](Register%20use%20in%20C%20language.png)

# Designing a real time embedded system
## Sever consequences if
- logical correctness is not met
- Timing constraintes are not met
## Two types of real-time systems
- Soft real time (as fast as possible)
- Hard real-time (must be on time)
## Mostly, real-time systems are embeded
- Build around one or more microcontrollers
- Not seen by the user as a computer
### Real time system example
- Process flow control
- Automotive
- robots
- communications
- compter peripherals
- aerospace
- domestic
- IoT applications
### Complexity
Very small size systems
- Mostlu 8bit microcontrollers with little memory (<128 Kb flash & <1 Kb Ram)
- Software developed with a background / foreground scheme (BFS)
Small size systems
- High end 8 bits, 16bits and low end 32bits microC (up to 1Mb flash & up to 2 Mb oif Ram)
- BFS software or small or propietaryu real-time kernel(no royalties)
Middle to big size systems
- 32bits microC(up to 4Mb flash & up to 8Mb Ram)
- Commercial real-time kernels with debug tools, file systems, network,...
High end size systems
- PC like systems with scalable resources
- Use an operating system like Linux or equivalent
![Product without kernel](Product%20without%20kernel.png)
```Background
/* Background */
void main(void)
{
    Initialization;

    while (1)  // FOREVER loop
    {
        Read_Analog_Inputs();
        Read_Discrete_Inputs();
        Perform_Monitoring_Functions();
        Perform_Control_Functions();
        Update_Analog_Outputs();
        Update_Discrete_Outputs();
        Scan_Keyboard();
        Handle_User_Interface();
        Update_Display();
        Handle_Communication_Requests();
        // Other...
    }
}

/* Foreground */
ISR(void)
{
    Handle_Asynchronous_Event();
}
```
- The main problem with this type of architecture is that the response time in the background part is not deterministric
- Tasks have not always the same duration
- In case of a code change in the loop the global loop timing is modified
![Infitinite loop](Infitinite%20loop.png)

#### Why use a real time kernel ?
- To guarantee a better temporal response on an asynchronous real time event
- To be able to affect priorities to the different functions executed by the CPU
- TO ease the adding of functionalities to the system
- TO reduce the development time
- TO easily ashare the dev of the application between several progeammers
- To ease the software documentation
#### Real time copncepts
- Critical sections of code (criticatl region)
	- Code that need to be treated indivisibly (must not be interrupted)
	- Specific actions are done before entering in the critical region
- Resources
	- Entity used by a task it may be memory or I/Os
- Shared resources
	- Resource that can be used by one or more tasks
- Tasks
	- A simpel program that thinks it has the CPU for itself
	- Each task has a priority, its own registers an its own stack
	- IT can be in any of the following states: dormant, ready, running, waiting (for an event) or ISR (interrupted)
- Multitasking
	- Process of scheduling and switching the CPU between several tasks
	- Tasks scheduling
- Mutual exclusion and semaphores
	- Used to share common resources
Mutitasking 1/2 : 
![Multiple tasks](Multiple%20tasks.png)
Switch tasks operations
- Save the CPU registers in the current Task Control Bloc
- Recover the new task data from the TCB
- Resume the new task
- Tasks switches add overhead to the application (up to 5% of CPU time for well design appliucations)
#### Multitasking scheduling
- Round-Robin Scheduling
	- No tasks priorites
- Static priorities: do not change during execution of task
- In rate Monotonic Scheduling(RM)
	- Tasks with the highest rate of execution are given the highest priority
- Dynamic priorities
	- to remedy priority inversion
#### Tasks states
- Ready
- Running
- Suspended
- Blocked
![Tasks states](Tasks%20states.png)
#### Non preemptive kernel behavior
![Non preemptive kernel behavior](Non%20preemptive%20kernel%20behavior.png)
- Tasks must explicitly do something to give control to the kernel
	- This must be done frequently
- So called cooperative multitasking
- Each task can run up to completion
	- No need of reetrant fuctnions
	- Small interrupt latency
#### Preemptive Kernel behavior
![Preemptive Kernel behavior](Preemptive%20Kernel%20behavior.png)
- The highest priority task ready to run is always given the CPU
	- When an ISR makes an higher priority task ready, at the end of th3e ISR the interruypted task is suspended and the new higher priority task resumed
- So called preemptive multitasking
- Each task may be interrupted
	- Need of reetrant functions
		- Can use global but protected variable
		- Locals variables and parameters are preferred
	- Interrupt latency is higher

# FreeRTOS
Created in 2003 by Richard Barry and maintained by Real Time Engineers Ltd.
- OpenRTOS : Commercial grade with USB,TCP/IP and FAT
- SafeRTOS : for Critical systems
Since 2017 maintained by Amazon Web Services
- FreeRTOS for IoT
- Completed with commercial services
FreeRTOS is a portable, modular multitask real time kernel
- More than 20 silicon manufacturers
- many device families for each
FreeRTOS provides services for embedded applications
- Resources sharing
- Delays
- Inter-tasks communication and synchronization mechanisms
FreeRtos is ROMMABLE
- 4 to 9Kb size
- Used on embedded systems
FreeRtos well suited for IoT applications (Amazon, Nabto, ...)

Main characteristics of the FreeRtos real time kernel
- Creatio and mangement of virtually unlimited number of tasks in the hardware limit
- Tasks waiting functions
- Change of tasks priorities
- Deletion of Tasks
- Tasks suspension and resume
- Creation and management of numerical and binary semaphores
- sending of messages queues from interrupt function (ISR) or from task to an other task
- Round-Robin scheduling : if 2 or more tasks have the same priority
	- Each tasks takes turns to run

### What does it do?
Rate Monotonic Scheduling (RMS)
- tasks with the highest rate of executionn have the highest priority
DEadline-Monotonic Scheduling(DMS)
- Periodic tasks with shortest deadline have highest priority
Earliest Deadline First (EDF)
- The periodic task with earliest deadline will get highest priority (dynamic priority scheduling)
Only possible with additianl libraries
- ESFree

## FreeRTOS port & components
### Ports
Rules required to implement an RTOS on a micrcontroller
1. Have a C compiler that generates nesting code (preemptive RTOS)
2. THe microcontroller supports interrupts and a peridical interrupt is available(10 to 1KHz)
3. The interrupts mayu be deactivated by software
4. The processor can manage a hardware stack (some Kb min)
5. The processor has instruction to save and restore CPU registers in the stack (SP,PC and general registers)
Structure of a FreeRTOS application :
![Structure of a FreeRTOS application](Structure%20of%20a%20FreeRTOS%20application.png)
Kernel Structure
![Kernel Structure](Kernel%20Structure.png)
#### PRIMASK Register
THis register allow blocking exceptions
- Only exceptions with configurable priority
- One bit implemented
	- All priority configurable exceptions will be blocked
![PRIMASK](PRIMASK.png)
#### Stack & Stack pointer
The Cortex M3 CPU manage a hardware stack
- The stack acts as a LIFO (of words)
- A specific register SP (Stack POINTER is used to maintain the stack
	- SP countains the memory address of the last words in the stack
The SP register may be modifed for the programming purposes
- SP(=R13)
Example :
- putting a word in the stack (PUSH)
	- SP value is decreadsed with the objkect size to be pushed(multiple of 4 bytes)
	- Write the data at SP content address
- To free the stack from the data
	- Increase the SP value with size of the data to be removed (multiples of 4 bytes)
![Stack](Stack.png)
#### Processors exceptions
Possibility for the CPU to change is execution context on :
- Internal errors
- Special Instruction
- External events
	- Communciations, timers
Execution is passed to a dedicated function
- Independant from user code
- Communication thru global variables
Special Considerations
- Up to 16 priority levels
- Exception can be interrupted by a higher priority exception
- Context switch may be time consuming (regarding memory speed)
![Processor exceptions](Processor%20exceptions.png)
![Exceptions](Exceptions.png)
### Material ressources
#### FreeRTOS Cortex port
Use a specifi interrupts
- SysTick (preemptive RTOS mode) 
	- time base (timer interrupt) for the RTOS 
	- 1 kHz or 100 Hz typic.  May be repaced by other timer.
- PendSV (Pendable SerVice) 
		- used by the OS to force a context switch. 
- SVCall (SuperVisor Call)
	- triggered by the SVC instruction
	- used by FreeRTOS to start the scheduler. 
RTOS interrupts priorities 
- Lowest priority 
- Other interrupts may have higher priorities
![FreeRTOS interrupts ressources](FreeRTOS%20interrupts%20ressources.png)

### vPortPendSVHandler
```c
__asm void xPortPendSVHandler(void)
{
    extern uxCriticalNesting
    extern pxCurrentTCB
    extern vTaskSwitchContext

    PRESERVE8

    mrs     r0, psp                // Get Process Stack Pointer
    isb                            // Instruction Synchronization Barrier

    ldr     r3, =pxCurrentTCB     // Load address of pxCurrentTCB
    ldr     r2, [r3]              // Load the current TCB pointer

    stmdb   r0!, {r4-r11}         // Save r4–r11 on the task's stack (Decrement Before)
    str     r0, [r2]              // Save new stack pointer into current TCB

    stmdb   sp!, {r3, lr}         // Save r3 and LR before calling function

    mov     r0, #configMAX_SYSCALL_INTERRUPT_PRIORITY
    msr     basepri, r0           // Mask interrupts at or below priority level

    bl      vTaskSwitchContext    // Perform the actual context switch

    mov     r0, #0
    msr     basepri, r0           // Re-enable all interrupts

    ldmia   sp!, {r3, lr}         // Restore r3 and LR
    ldr     r1, [r3]              // Get new TCB (task to run)
    ldr     r0, [r1]              // Get top of stack from new TCB

    ldmia   r0!, {r4-r11}         // Restore registers for the new task
    msr     psp, r0               // Set PSP to new task's stack
    isb                           // Ensure instructions use updated PSP

    bx      lr                    // Return to the task
    nop                           // No operation (padding)
}
```
#### The Application Code:
`..\..\...\Application\User`
- `Main.c`
- `Gpio.c`
- *All peripherals that are needed…*

#### FreeRTOS (Kernel)
`..\..\..\Middlewares\Third_Party\FreeRTOS\Source`
- `Croutine.c`
- `Event_groups.c`
- `List.c`
- `Queue.c`
- `Tasks.c`
- `Timers.c`

`..\..\..\Middlewares\Third_Party\FreeRTOS\Source\Include`
- `croutine.h`
- `event_groups.h`
- `FreeRTOS.h`
- `FreeRTOSConfig_template.h`
- `list.h`
- `mpu_wrappers.h`
- `portable.h`
- `projdefs.h`
- `queue.h`
- `semphr.h`
- `stack_macros.h`
- `task.h`
- `timers.h`

#### FreeRTOS Port

`..\..\..\Middlewares\Third_Party\FreeRTOS\Source\CMSIS_RTOS`
- `cmsis_os.c`
- `cmsis_os.h`

`..\..\..\Middlewares\Third_Party\FreeRTOS\Source\portable\MemMang`
- `heap_1.c` to `heap_5.c`

`..\..\..\Middlewares\Third_Party\FreeRTOS\Source\portable\RVDS\ARM_CM3`
- `port.c` *(with assembly code)*
- `portmacro.h`

Kernel configuration
Initializing the kernel
Application considerations

The FreeRTOSConfig.h file present in the freeRTOS directory allow to configure FreeRTOS
- It selects the needed functionalities
- It fixes the number of tasks in the application
- It fixes the number of semaphores, queues..., the application will use
The kernel memory size of FreeRTOS will change regarding those parameters
- The will affect the code size and the data size.
#### Init and Config
##### Main config
configMINIMAL_STACK_SIZE
- Minimal Stack size reserved for each task
configLIBRARY_LOWEST_INTERRUPT_PRIORITY
- The lowerst interrupt priority that can be used in a call to a "set priority"
configLIBRARY_MAX_SYSCALL_INTERRUPT_PRIORITY
- The highest interrupt priority that can be used by any interrupt service routnine that makes dcalls to interrupt safe FreeRTOS API functions.
##### Main functions
MX_FREERTOS_Init()
- Parameter freeRTOS
osKernelStart()
- run the OS
```
void main(void)
{
    /* User initialization */
    MX_FREERTOS_Init();       // Kernel Initialization
    
    //- Initializes FreeRTOS’s Data Structures 
    //- Creation of the applications tasks 
    //- Create the ‘statistics task
    
    /* Install interrupt vectors */
    /* Create at least 1 task (Start Task) */
    /* Additional User code */
    osKernelStart();          // Start multitasking

	//- Creates the idle task ( xTaskCreate) 
	//- sets up a tick interrupt and timers for the correct tick frequency. 
	//- Determines the Highest Priority Task Created 
	//- Calls prvStartFirstTask () (asm code)

    while (1) // Standard main loop (never accessed)
    {
    }
}

```

#### Build an application with FreeRTOS 
![Build an application with FreeRTOS](Build%20an%20application%20with%20FreeRTOS.png)
### FreeRTOS Overview
- Task states & Resources
- Task management
- Interrupts management
- Communications
- Memory management
- Time management

#### Tasks states 
Running 
- task is actually executing. 
- It is currently utilizing the processor.  
Ready 
- tasks is able to execute (not in the Blocked or Suspended state) 
- not currently executing. 
Blocked 
- Task is waiting for either a temporal or external event. 
- Do not use the CPU and cannot enter the in Running state. 
Suspended 
- cannot be selected to enter the Running state. 
- do not have a time out. 
- Go into suspended state
- vTaskSuspend() function. 
- Exit from suspended state 
- xTaskResume() function.

Blocked examples : Task calls vTaskDelay() it will block until the delay period has expired Tasks is waiting for queue, semaphore, event group, notification or semaphore event. Tasks in the Blocked state may have a 'timeout' period to be automatically unblocked
![Example tasks management](Example%20tasks%20management.png)

#### Multiple Tasks
each Task Control Block (TCB) contains 
- An identifier 
	- character string 
- Memory address 
	- first instruction of the task 
- Priority 
- Current task state 
	- running, ready, block, or suspended. 
- Pointer to the stack 
	- where context of the task is stored
![Mutiple Tasks](Mutiple%20Tasks.png)


#### Stack grows
From top to bottom
- portSTACK_GROWTH = -1 for Cortex M processors
bottom to top
#### Two stacks
- MSP (Main Stack Pointer)
	- used during statrup, mian() and interrupts
- PSP (Process Stack Pointer)
	- Is used by the process/tasks
#### Tasks
Creation/deletion of tasks
- xTaskCreate, vTaskDelete
Tasks control:
- vTaskDelay, uxTaskPriorityGet, vTaskPrioritySet
- vTaskSuspend, vTaskResume
#### Tasks may not return a value
- Type is always void
#### Tasks must be 
- endless loop
- can be detected
```example
portTASK_FUNCTION( vATaskFunction, pvParameters ) {
	for( ;; ) 
		{ -- Task application code here. -- } 
}
```

- Unlimited number of tasks (RAM limitation only)
- Priority is a number between 0 and configMAX_PRIORITIES
- lowest priority is priority 0
- lowest levels the idle task priority !
- For configMAX_PRIORITIES see FreeRTOS.H
- There is always one task present: the idle task
	- Created when the scheduler is started

```c
portBASE_TYPE xTaskCreate(
    pdTASK_CODE         pvTaskCode,       // Pointer to the task function
    const portCHAR * const pcName,        // Name of the task (for debugging)
    unsigned portSHORT   usStackDepth,    // Stack size (in words, not bytes)
    void *               pvParameters,    // Pointer to parameters passed to the task
    unsigned portBASE_TYPE uxPriority,    // Task priority (0 to MAX_PRIORITIES - 1)
    xTaskHandle *        pvCreatedTask    // Pointer to return task handle (can be NULL)
);
```

#### Function prototype
```example
// Prototype for task creation
BaseType_t xTaskCreate(
    TaskFunction_t pvTaskCode,       // Pointer to the task entry function
    const char * const pcName,       // Descriptive name for the task
    unsigned short usStackDepth,     // Stack size in words (not bytes)
    void *pvParameters,              // Parameter passed into the task
    UBaseType_t uxPriority,          // Task priority
    TaskHandle_t *pxCreatedTask      // Handle returned to reference the task (optional)
);
```
#### Parameters
- **`pvTaskCode`**: Pointer to the task entry function.
- **`pcName`**: Descriptive name for the task (mainly for debugging).
- **`usStackDepth`**: Stack size in **words**, not bytes.
- **`pvParameters`**: Value passed into the task as its parameter.
- **`uxPriority`**: Priority of the task (e.g., `tskIDLE_PRIORITY`).
- **`pxCreatedTask`**: (Optional) Pointer to a handle to manage the created task. Can be `NULL`.
#### Return Value
- `pdPASS`: Task was successfully created.
- `errCOULD_NOT_ALLOCATE_REQUIRED_MEMORY` (or `pdFAIL`): Task creation failed (e.g., insufficient heap memory).

```
// Example task implementation
void vTaskCode(void *pvParameters)
{
    // Assert that the passed parameter is 1
    configASSERT(((uint32_t) pvParameters) == 1);

    for (;;)
    {
        // Task code goes here
    }
}

// Function to create and manage the task
void vOtherFunction(void)
{
    BaseType_t xReturned;
    TaskHandle_t xHandle = NULL;

    // Create the task and store its handle
    xReturned = xTaskCreate(
        vTaskCode,         // Task function
        "NAME",            // Task name
        STACK_SIZE,        // Stack size in words
        (void *)1,         // Parameter passed to task
        tskIDLE_PRIORITY,  // Task priority
        &xHandle           // Pointer to store task handle
    );

    if (xReturned == pdPASS)
    {
        // Task successfully created, now delete it
        vTaskDelete(xHandle);
    }
}

```

#### Tasks deletion
void vTaskDelete(TaskHandle_t xTask);
##### Parameter
- xTask : The handle of the task to be deleted
- NULL for self delete Task
Freeing resources before deletion
The task being deleted will be removed from all ready, blocked, suspended and event lists.
The idle task is freeing the RTOS kernel allocated memory from tasks that have been deleted.
```c
void vOtherFunction( void ) { 
	TaskHandle_t xHandle = NULL; // Create the task, storing the handle. 
	xTaskCreate( vTaskCode, "NAME", STACK_SIZE, NULL, tskIDLE_PRIORITY, &xHandle ); 
	// Use the handle to delete the task. 
	if( xHandle != NULL ) { 
	vTaskDelete( xHandle ); 
	} 
}
```

```c
/* Task to be created */
void vTaskCode(void *pvParameters)
{
    for (;;)
    {
        /* Task code goes here */
    }
}

/* Function that creates a task */
void vOtherFunction(void)
{
    static unsigned char ucParameterToPass;
    xTaskHandle xHandle;

    xTaskCreate(
        vTaskCode,              // Task function
        "NAME",                 // Task name
        STACK_SIZE,             // Stack size (in words)
        &ucParameterToPass,     // Task parameter
        tskIDLE_PRIORITY,       // Task priority
        &xHandle                // Handle to created task
    );

    /* Use the handle to delete the task */
    vTaskDelete(xHandle);
}

```
#### Scheduling tasks : priorities
The scheduler determine which task to run
- Depending on the priorities 
	- In preemptive mode by default 
	- May be configured for collaborative operation
- Number of priorities : tskMAX_PRIORITIES in FreeRTOSConfig.h
Static priorities: Do not change during execution of task
- FreeRTOS implemetation
	- low priority numbers denot low priority taks
	- the idle task has priority zero (tskIDLE_PRIORITY)
- Code can change the priority:
	- vTaskPrioritySet
Dynamic priorities: to remedy priority inversion
	- Not supported by FreeRTOS
		- BUt manage priority inheritance (Mutex)
		- minimize priority inversion effects in some situations
##### Scheduler
Starvation
- if a maximal priority task is continously running, the other tasks wont execute
- there is no automatic mechanism to avoid this
Solutions
- Verify that there is no such situation

##### Idle Task
The microcontroller must always do something
- An idle task is automatically created at the scheduler start
- The idle task is responsible for:
	- Compute statistics
	- Recover memory from deleted tasks
	- calculate the processor utilization
	- put the processor in low power mode
##### Lists
Lists = internal system tools
Used in FreeRTOS
- For tasks scheduling
- For files implementation
- Many structures to descibe the lists
xLIST is the header of the scheduler created and used lists :
```c
typedef struct xLIST
{
    volatile unsigned portBASE_TYPE uxNumberOfItems;
    /* Number of items in the list. */

    volatile xListItem *pxIndex;
    /* Pointer used to iterate through the list. */

    volatile xMiniListItem xListEnd;
    /* Sentinel item marking the end of the list. */
} xList;
```
xLIST_ITEM: are the double chained lists of elements :
```c
typedef struct xLIST_ITEM
{
    portTickType xItemValue;
    /* A value assigned to this list item. */

    volatile struct xLIST_ITEM *pxNext;
    /* Pointer to the next list item. */

    volatile struct xLIST_ITEM *pxPrevious;
    /* Pointer to the previous list item. */

    void *pvOwner;
    /* Pointer to the object that owns this list item. */

    void *pvContainer;
    /* Pointer to the list this item belongs to. */
} xListItem;

```
xMINI_LIST_ITEM: smaller implementation of xLIST_ITEM.
- Doesn't have pvOwner and pvContainer members
- Represents an end of list element.
Lists synoptic :
![Lists synoptic](Lists%20synoptic.png)

#### Tasks communication
Semaphore why to use?
- Access to a shared resource
- signal the occurrence of event 
- allow two tasks to synchronize
Type
- binary
- counting
Message mailboxes
message queues
events

##### Message Queues
xQueueCreate,xQueueCreateStatic
- Creates a message queue
vQueueDelete
- Deletes the queue(queue memory also)
xQueueReceive, xQueueSend
- Queues send and receive functions
Additional fucntions
- uxQueueMessagesWaiting : returns the number of message in the queue
- uxQueueSpacesAvailable : returns the number of free spaces available in the queue.
- xQueueReset : resets a queue to its originial empty state
##### Queues
Create a queue
```c
xQueueHandle xQueueCreate( 
unsigned portBASE_TYPE uxQueueLength, 
/* Nombre d’éléments. */ 
unsigned portBASE_TYPE uxItemSize 
/* Taille d’un élément. */ );
```
###### Reading
IF several task want read in a queue the one of the highest priority choosen
In case of same priorityu the firstwhich asked fir the queue will get the info.
A read element will be removed from the queue
- xQueuePeek
```c
portBASE_TYPE xQueueReceive( 
xQueueHandle xQueue, 
/* Identifiant de la file. */ 
const void * pvBuffer, /* Pointeur vers un buffer où la donnée sera copiée. */ portTickType xTicksToWait /* Valeur de timeout. */ );
```

Same considerations as for reading
```c
/* FIFO Mode */ portBASE_TYPE xQueueSend( 
xQueueHandle xQueue, /* Identifiant de la file. */ 
const void * pvItemToQueue, /* Pointeur vers l‘élément à copier */ 
portTickType xTicksToWait /* Valeur de timeout. */ ); 

portBASE_TYPE xQueueSendToBack(xQueueHandle xQueue, const void * pvItemToQueue, portTickType xTicksToWait); 
/* LIFO Mode */ portBASE_TYPE xQueueSendToFront(xQueueHandle xQueue, const void * pvItemToQueue, portTickType xTicksToWait);
```

Message queue example : 
```c
struct AMessage
{
    char ucMessageID;
    char ucData[20];
};
void vATask(void *pvParameters)
{
    QueueHandle_t xQueue1, xQueue2;
    /* Create a queue capable of containing 10 unsigned long values. */
    xQueue1 = xQueueCreate(10, sizeof(unsigned long));
    if (xQueue1 == NULL)
    {
        /* Queue was not created and must not be used. */
    }
    /* Create a queue capable of containing 10 pointers to AMessage
       structures. These are to be queued by pointers as they are
       relatively large structures. */
    xQueue2 = xQueueCreate(10, sizeof(struct AMessage *));
    if (xQueue2 == NULL)
    {
        /* Queue was not created and must not be used. */
    }
    /* ... Rest of task code. */
}
```

Message queue 2 : 
```c
struct AMessage
{
    char ucMessageID;
    char ucData[20];
} xMessage;
QueueHandle_t xQueue;
void vATask(void *pvParameters) // Task to create a queue and post a value.
{
    struct AMessage *pxMessage;
    pxMessage = &xMessage;
    // Create a queue capable of containing 10 pointers to AMessage structures.
    // These should be passed by pointer as they contain a lot of data.
    xQueue = xQueueCreate(10, sizeof(struct AMessage *));
    if (xQueue == 0)
    {
        // Failed to create the queue.
    }
    // Send a pointer to a struct AMessage object. Don't block if the queue is already full.
    xQueueSend(xQueue, (void *)&pxMessage, (TickType_t)0);
    // ... Rest of task code.
}
```
Illustration queue
![Illustration queue](Illustration%20queue.png)

Queue reading example 
![example deux queue](example%20deux%20queue.png)
#### Semaphore and mutexes
Semaphores and mutexes are the main methods for FreeRTOS to synchromise tasks
2 main type of semaphore binary and counters
#### Binary
Easiest way to synchroize tasks
similar to a one element queue
Must be created before using it

At creation the binary sempahore is available

```c
xSemaphoreHandle xSemaphore; 
void vATask( void * pvParameters ) { 
// Semaphore cannot be used before a call to vSemaphoreCreateBinary (). 
// This is a macro so pass the variable in directly. 
	vSemaphoreCreateBinary( xSemaphore ); if( xSemaphore != NULL ) { 
	// The semaphore was created successfully. 
	// The semaphore can now be used. 
	} 
}
```
##### Semaphore operations
xSempahoreCreateBinary() or xSemaphoreCreateBinaryStatic :
- Create new semaphore
vSemaphoreDelete():use with care !
- Deletes the semaphore\
- Do not delete a semaphore that has tasks blocked on it
xSemaphoreTake(), xSemaphoreGive()
- Wait on or free a semaphore
From ISR
	portBASE_TYPE xGiveSemaphoreFromISR(xSemaphoreHandle xSemaphore);

Taking a semaphore
	portBASE_TYPE xSemaphoreTake(xSemaphoreHandle xSemaphore, portTickType xTicksToWait);
Freeing a semaphore
	portBASE_TYPE xSemaphoreGive(xSemaphoreHandle xSemaphore);
Giving from ISR
	portBASE_TYPE xGiveSemaphoreFromISR(xSemaphoreHandle xSemaphore);

##### Semaphore take example
```c
if( xSemaphore != NULL ) { 
// See if we can obtain the semaphore. If the semaphore is not available 
// wait 10 ticks to see if it becomes free. 
	if( xSemaphoreTake( xSemaphore, ( portTickType ) 10 ) == pdTRUE ) {
	// xSemaphore available} else {
	// time overflow, xSemaphore is not available
	}
}
```
##### Semaphore give example
```c
if( xSemaphoreGive( xSemaphore ) != pdTRUE ) { 
// error xSemaphore not released …. }
```
##### Waiting binary semaphores from ISR
```c
#define LONG_TIME       0xffff
#define TICKS_TO_WAIT   10

SemaphoreHandle_t xSemaphore = NULL;

/* Repetitive task that waits on a semaphore. */
void vATask(void *pvParameters)
{
    // Create a binary semaphore before the ISR uses it.
    xSemaphore = xSemaphoreCreateBinary();

    if (xSemaphore == NULL)
    {
        // Failed to create semaphore, handle error.
        for (;;); // Optional: loop forever.
    }

    for (;;)
    {
        // Block waiting for the semaphore to be given (e.g., by an ISR).
        if (xSemaphoreTake(xSemaphore, LONG_TIME) == pdTRUE)
        {
            // Semaphore obtained – perform the task action here.
            // For example:
            // Toggle an LED, read a sensor, etc.
            // ...

            // After finishing the task, the loop restarts and waits again.
        }
    }
}

```
###### Giving a semaphore from ISR

```c
/* Timer ISR */
void vTimerISR(void *pvParameters)
{
    static unsigned char ucLocalTickCount = 0;
    BaseType_t xHigherPriorityTaskWoken = pdFALSE;

    /* A timer tick has occurred. Do any necessary timer-related operations here. */
    // ... Other timer-related code

    /* Increment local tick count. */
    ucLocalTickCount++;

    /* Check if it's time to unblock the task (every TICKS_TO_WAIT ticks). */
    if (ucLocalTickCount >= TICKS_TO_WAIT)
    {
        /* Unblock the task by giving the semaphore. */
        xSemaphoreGiveFromISR(xSemaphore, &xHigherPriorityTaskWoken);

        /* Reset tick count to start the cycle again. */
        ucLocalTickCount = 0;
    }

    /* Perform a context switch if the unblocked task has a higher priority. */
    portYIELD_FROM_ISR(xHigherPriorityTaskWoken);
}
```
##### ISR toTask synchronisation using semaphore
![ISR toTask synchronisation using semaphore](ISR%20toTask%20synchronisation%20using%20semaphore.png)
##### COunting semaphores
- Can be used several time before becoming unavailable
- Creating a counting semaphore

```c
xSemaphoreHandle xSemaphoreCreateCounting( 
unsigned portBASE_TYPE uxMaxCount, 
/* Capacité du sémaphore compteur. */ 
unsigned portBASE_TYPE uxInitialCount 
/* Valeur du compteur après création. */ );
```
###### Static allocation
- Dynamic memory allocation
	- SemaphoreHandle_t xSemaphoreCreateBinary( void );
- Statiuc memory allocation
	- SemaphoreHandle_t xSemaphoreCreateBinaryStatic( StaticSemaphore_t  
	* pxSemaphoreBuffer );
```c
SemaphoreHandle_t xSemaphore = NULL;            // Handle for the semaphore
StaticSemaphore_t xSemaphoreBuffer;             // Static memory buffer for the semaphore

void vATask(void *pvParameters)
{
    // Create the binary semaphore using static allocation.
    // The semaphore's internal structure is stored in xSemaphoreBuffer.
    xSemaphore = xSemaphoreCreateBinaryStatic(&xSemaphoreBuffer);

    // Ensure the semaphore was created successfully.
    configASSERT(xSemaphore != NULL);

    // ... Rest of the task code
}
```

- Semaphore given by interrupts 
	- xSemaphoreTakeFromISR ( SemaphoreHandle_t xSemaphore, signed BaseType_t 
	* pxHigherPriorityTaskWoken) 
	- xSemaphoreGiveFromISR ( SemaphoreHandle_t xSemaphore, signed BaseType_t 
	* pxHigherPriorityTaskWoken)
![Semaphore interrupts](Semaphore%20interrupts.png)
#### Mutexes
Used to share common ressources
- Avoid mutual exclusion
- the task whioch takes the mutex must release it
- Mutex is a semaphore with priority inheritance
Mutex creation
```c
void vATask( void * pvParameters ) { 
/* Create a mutex type semaphore. */ 
xSemaphore = xSemaphoreCreateMutex(); 
	if( xSemaphore != NULL ) { 
	/* The semaphore was created successfully and can be used. */ 
	} 
}
```
A task needs a ressource and try to take the mutex
- It get it
A second task needs the ressource
- Try to get it, ut fail
Used as a semaphore
![Mutexes](Mutexes.png)
Mutex Overview
![Mutex Overview](Mutex%20Overview.png)
```c
SemaphoreHandle_t xSemaphore = NULL;

/* A task that creates a mutex semaphore. */
void vATask(void *pvParameters)
{
    // Create a mutex to protect access to a shared resource.
    xSemaphore = xSemaphoreCreateMutex();
}

/* A task that uses the mutex semaphore. */
void vAnotherTask(void *pvParameters)
{
    // ... Perform other operations first

    if (xSemaphore != NULL)
    {
        // Try to take the mutex. Wait for up to 10 ticks.
        if (xSemaphoreTake(xSemaphore, (TickType_t)10) == pdTRUE)
        {
            // Successfully obtained the mutex.
            // Safe access to shared resource begins.
            // ...

            // Done with the shared resource, release the mutex.
            xSemaphoreGive(xSemaphore);
        }
        else
        {
            // Failed to obtain the mutex within 10 ticks.
            // Cannot safely access the shared resource.
        }
    }
}

```
Priority inversion
![Priority inversion](Priority%20inversion.png)
This dangerous sequence of events is illustrated in before
- Low priority LP task and high priority HP task share a resource
- After LP task takes the resources, HP Task becomes ready to run
- HP task must wait for LP aTask to finish with the resource so it pends
- Before LP Task finishes with the resource, MP Task becomes ready to run preempting LP Task
- While MP Task( and perhaps additional intermediate priority task) runs, HP task, the highest-priority task in the system, remains in a pending state
![Task priority inversion](Task%20priority%20inversion.png)

###### If the second task has a higher priority 
- It waits
- The priority of the running task is raised to the second task priority
###### The waiting task keeps is initial priority
##### Interrupts
Interrups rely on material
FreeRTOS provides methods to use interrupts
ISR functions are directly handled by the processor
- Specific actions must be taken for FreeRTOS to reconize them
Interrupt processing
- Interrupt Service Routine
- Interrupt Latency, Response and recovery
- Interrupts to taks dialog
![Interrupt latency NON preemptive](Interrupt%20latency%20NON%20preemptive.png)

![Interrupt latency preemptive](Interrupt%20latency%20preemptive.png)

##### FreeRTOS interrupts sharing
![Interrupts sharing](Interrupts%20sharing.png)
ISR Processing must be as short as possible
- Long interrupts are partly deferred to a task
![ISR deferred interrupts](ISR%20deferred%20interrupts.png)
#### Task resume
Interrupts may dialog with tasks 
- Use of dedicated API functions 
	- Ends with "FromISR« 
Resume task from isr 
- xTaskResumeFromISR
```c

TaskHandle_t xHandle; // Handle to the task so it can be resumed later

/* Function that creates the task. */
void vAFunction(void)
{
    // Create a task and save its handle in xHandle
    xTaskCreate(vTaskCode, "NAME", STACK_SIZE, NULL, tskIDLE_PRIORITY, &xHandle);

    // ... Other initialization code
}

/* The task function that suspends itself. */
void vTaskCode(void *pvParameters)
{
    for (;;)
    {
        // Do something useful here...

        // Suspend the task — NULL means "suspend self"
        vTaskSuspend(NULL);

        // When resumed, it continues here
    }
}

/* Example ISR that resumes the suspended task. */
void vAnExampleISR(void)
{
    BaseType_t xYieldRequired;

    // Resume the task from the ISR
    xYieldRequired = xTaskResumeFromISR(xHandle);

    // If resuming the task unblocked a higher priority task, request a context switch
    if (xYieldRequired == pdTRUE)
    {
        // This macro is port-specific: it ensures a proper context switch if needed
        portYIELD_FROM_ISR();
    }
}

```

#### Critical Sections
Critical section: the task must not be preempted. 
- All Interrupts are disabled 
- the tick timer too! 

Use a FreeRTOS primitive or a macro like cli()/sti() under Linux! 
- void taskENTER_CRITICAL( void ); 
- void taskEXIT_CRITICAL( void );

```c
void vDemoFunction(void) {
    taskENTER_CRITICAL();
    /* Protected action here */
    taskEXIT_CRITICAL();
}

void vTask1(void *pvParameters) {
    for (;;) {
        /* Functionality before critical section */
        taskENTER_CRITICAL();
        vDemoFunction();
        taskEXIT_CRITICAL();
    }
}
```
##### scheduler suspend
Suspends the scheduler 
- without disabling interrupts. 
- void vTaskSuspendAll( void ); 
- Disables Context switches 
- RTOS ticks will be held pending 
Restart with 
- xTaskResumeAll().

```c
void vTask1(void *pvParameters) {
    for (;;) {
        // Task code goes here.
        // ...
        // At some point the task wants to perform a long operation during which it does not want to get swapped out.
        // It cannot use taskENTER_CRITICAL()/taskEXIT_CRITICAL() as the length of the operation may cause interrupts to be missed - including the ticks.
        // Prevent the RTOS kernel swapping out the task.
        vTaskSuspendAll();
        // Perform the operation here. There is no need to use critical sections as we have all the microcontroller processing time.
        // During this time interrupts will still operate and the RTOS kernel tick count will be maintained.
        // ...
        // The operation is complete. Restart the RTOS kernel.
        xTaskResumeAll();
    }
}

```


#### Evetn groups 
Event groupsa llow events to be communicated to tasks
- Allow a task toi wait in the blocked state for a combination of one of more events to occur
- Unblock all the tasks that were waiting for the same event, or combination eof events, when the event occurs
- USeful for synchronizing multiple tasks
- 24 flag availale per event group
![Event group](Event%20group.png)
#### event group or flags
xEventGroupCreate():
- Creates an Event Group Flag (a bit from a memory location)
- number of bits (or flags) implemented within an event group
	- 8 bits if configUSE_16_BIT_TICKS =1
	- 24 bits if configUSE_16_BIT_TICKS =0
vEventGroupDelete()
- Deletes the group flag
xEventGroupSetABits(), xEventGroupWaitBits():
- a task posts for a Event Flag or waits an Event
xEventGroupClearBits
- Clears specific bits
Additional functions:
- xEventGroupGetBits() : get the current flag value

Example 1 : 
```c
#define BIT_0 (1 << 0)
#define BIT_4 (1 << 4)
void aFunction(EventGroupHandle_t xEventGroup) {
    EventBits_t uxBits;
    /* Set bit 0 and bit 4 in xEventGroup. */
    /* The event group being updated. */
    /* The bits being set. */
    uxBits = xEventGroupSetBits(xEventGroup, BIT_0 | BIT_4);
    /* uxBits may be different from the value it is supposed to be: e.g. a task waiting on an event may clear it */
    if ((uxBits & (BIT_0 | BIT_4)) == (BIT_0 | BIT_4)) {
        /* Both bit 0 and bit 4 remained set when the function returned. */
    } else if ((uxBits & BIT_0) != 0) {
        /* Bit 0 remained set when the function returned, but bit 4 was
           cleared. It might be that bit 4 was cleared automatically as a
           task that was waiting for bit 4 was removed from the Blocked
           state. */
    } else if ((uxBits & BIT_4) != 0) {
        /* Bit 4 remained set when the function returned, but bit 0 was
           cleared. It might be that bit 0 was cleared automatically as a
           task that was waiting for bit 0 was removed from the Blocked
           state. */
    } else {
        /* Neither bit 0 nor bit 4 remained set. It might be that a task
           was waiting for both of the bits to be set, and the bits were cleared
           as the task left the Blocked state. */
    }
}

```

```c
/* Definitions for the event bits in the event group. */
#define mainFIRST_TASK_BIT  (1UL << 0UL) /* Event bit 0, set by a task. */
#define mainSECOND_TASK_BIT (1UL << 1UL) /* Event bit 1, set by a task. */
#define mainISR_BIT         (1UL << 2UL) /* Event bit 2, set by an ISR. */

int main(void) {
    /* Before an event group can be used it must first be created. */
    xEventGroup = xEventGroupCreate();

    /* Create the task that sets event bits in the event group. */
    xTaskCreate(vEventBitSettingTask, "Bit Setter", 1000, NULL, 1, NULL);

    /* Create the task that waits for event bits to get set in the event group. */
    xTaskCreate(vEventBitReadingTask, "Bit Reader", 1000, NULL, 2, NULL);

    /* Create the task that periodically generates a software interrupt. */
    xTaskCreate(vInterruptGenerator, "Int Gen", 1000, NULL, 3, NULL);

    /* Install the handler for the software interrupt.
       The syntax depends on the FreeRTOS port.
       This example is for the Windows port, where interrupts are simulated. */
    vPortSetInterruptHandler(mainINTERRUPT_NUMBER, ulEventBitSettingISR);

    /* Start the scheduler so the created tasks start executing. */
    vTaskStartScheduler();

    /* The following line should never be reached. */
    for(;;);

    return 0;
}

```

```c
static void vEventBitSettingTask(void *pvParameters) {
    const TickType_t xDelay200ms = pdMS_TO_TICKS(200UL);
    for (;;) {
        /* Delay before setting bit 0. */
        vTaskDelay(xDelay200ms);
        /* Notify and set event bit 0. */
        vPrintString("Bit setting task -\t about to set bit 0.\r\n");
        xEventGroupSetBits(xEventGroup, mainFIRST_TASK_BIT);

        /* Delay before setting bit 1. */
        vTaskDelay(xDelay200ms);
        /* Notify and set event bit 1. */
        vPrintString("Bit setting task -\t about to set bit 1.\r\n");
        xEventGroupSetBits(xEventGroup, mainSECOND_TASK_BIT);
    }
}

```

```c
static void vEventBitReadingTask(void *pvParameters) {
    EventBits_t xEventGroupValue;
    const EventBits_t xBitsToWaitFor = (mainFIRST_TASK_BIT | mainSECOND_TASK_BIT | mainISR_BIT);

    for (;;) {
        /* Block to wait for event bits to become set within the event group. */
        xEventGroupValue = xEventGroupWaitBits(
            xEventGroup,        /* The event group to read. */
            xBitsToWaitFor,     /* Bits to test. */
            pdTRUE,             /* Clear bits on exit if condition met. */
            pdFALSE,            /* Don't wait for all bits (wait for any). */
            portMAX_DELAY       /* Wait indefinitely. */
        );

        /* Print a message for each bit that was set. */
        if ((xEventGroupValue & mainFIRST_TASK_BIT) != 0)
            vPrintString("Bit reading task -\t Event bit 0 was set\r\n");

        if ((xEventGroupValue & mainSECOND_TASK_BIT) != 0)
            vPrintString("Bit reading task -\t Event bit 1 was set\r\n");

        if ((xEventGroupValue & mainISR_BIT) != 0)
            vPrintString("Bit reading task -\t Event bit 2 was set\r\n");
    }
}

```

```c
static uint32_t ulEventBitSettingISR(void)
{
    /* The string is static to ensure it exists when the daemon task prints it, since ISR stack won't exist then. */
    static const char *pcString = "Bit setting ISR -\t about to set bit 2.\r\n";
    BaseType_t xHigherPriorityTaskWoken = pdFALSE;

    /* Defer printing from ISR to RTOS daemon task by pending the function call. */
    xTimerPendFunctionCallFromISR(vPrintStringFromDaemonTask, (void *)pcString, 0, &xHigherPriorityTaskWoken);

    /* Set bit 2 in the event group from ISR. */
    xEventGroupSetBitsFromISR(xEventGroup, mainISR_BIT, &xHigherPriorityTaskWoken);

    /* If any operation caused a higher priority task to unblock, request context switch. */
    portYIELD_FROM_ISR(xHigherPriorityTaskWoken);
}

```

#### Memory Managament
The memory Management includes :
- Static allocation
- Dynamic allocation
	- heap_1 :simplest, does not permit memory to be freed
	- heap_2 : permits memory to be freed, but not does coalescence adjacent free blocks. 
	- heap_3 : wraps the standard malloc() and free() for thread safety 
	- heap_4 : coalescences adjacent free blocks to avoid fragmentation. Includes absolute address placement option 
	- heap_5 : heap_4, with the ability to span the heap across multiple non-adjacent memory areas
Problem with malloc() and free(): it can run out of memory 
Even if you calculate the memory, fragmentation can occur. 
Use well suited dynamic allocation scheme : 
- Heap_1 to heap_5 
Or use static memory attribution 
- To have more control on allocated 
- When dynamic memory allocation is forbidden in some applications

#### Time management
Clock tick: a clcok tick is a peridoci time source to keep track of time delays and time outs.
- Tick intervals: 1~100ms
The faster the tick rate, the higher the overhead impose on the system
When ever a clock tick occurs FreeRTOS increments a 32 bit counter
The counter starts at zero, and rolls over ot 4,294,967,295 * 2^32-2 ticks
A tasks can be delayed and a delayed task can also be resumed

Five services :
- vTaskDelay(): delaying a task according a number of clock ticks
- vTaskDelayUntil
Maximum delay 256 hours (11 days)
- xTaskAbortDelay(): resuming a Delayed Task

#### Software timers
implemented by and under the control of the kernel.
They do not require hardware support.
Do not use processing time(except call back function)

2 mode:
- One shot timer
- auto reload timers
![Software timers](Software%20timers.png)
Software timers have 2 states :
- Dormant
- Running
- They execute in a daemon task context
![State software timer](State%20software%20timer.png)
Software timer creation and deletion
- xTimerCreate, xTimerCreateStatic
- xTimerDelete
Timer informations
- xTimerIsTimerActive, pvTimweGetTimerID
- pcTimerGetName, pvTimerGetTimerID
- vTimerSetTimerID, pcTimerGetName
- xTimerGetPeriod,xTiomerGetExpiryTime
Timer operation
- xTimerStart, xTimerStop
- xTimerChangePeriod, xTimeReset
From ISR
- xTimerStartFromISR, xTimerStopFromISR
- xTimerChangePeriodFromeISR,xTimerResetFromISR

Static task creation
```c
TaskHandle_t xTaskCreateStatic(
    TaskFunction_t pvTaskCode,    // Pointer to the task entry function
    const char * const pcName,    // Name of the task (for debugging)
    uint32_t ulStackDepth,        // Size of the task stack (number of StackType_t elements)
    void *pvParameters,           // Pointer to parameters passed to the task
    UBaseType_t uxPriority,       // Priority of the task
    StackType_t *pxStackBuffer,   // Pointer to pre-allocated stack array (at least ulStackDepth elements)
    StaticTask_t *pxTaskBuffer    // Pointer to pre-allocated task control block (StaticTask_t variable)
);

```
Returns
- pdPASS if neither pxStackBuffer or pxTaskBuiffer are NULL
- errCOULD_NOT_ALLOCATE_REQUIRED_MEMORY:pxStackBuffer or pxTaskBuffer are NULL
Example : 
```c
// Dimensions the buffer that the task being
// created will use as its stack.
// NOTE: This is the number of words the stack
// will hold, not the number of bytes.
// For example, if each stack item is 32-bits,
// and this is set to 100,
// then 400 bytes (100 * 32-bits) will be allocated.
#define STACK_SIZE 200

// Structure that will hold the TCB (Task Control Block) of the task being created.
StaticTask_t xTaskBuffer;

// Buffer that the task being created will use as its stack. Note this is
// an array of StackType_t variables. The size of StackType_t is dependent on the RTOS port.
StackType_t xStack[STACK_SIZE];

// Function that implements the task being created.
void vTaskCode(void * pvParameters)
{
    // The parameter value is expected to be 1 as 1 is passed in
    // the pvParameters value in the call to xTaskCreateStatic().
    configASSERT((uint32_t) pvParameters == 1UL);

    for (;;)
    {
        // Task code goes here.
    }
}

// Function that creates the task.
void vOtherFunction(void)
{
    TaskHandle_t xHandle = NULL;

    // Create the task without using any dynamic memory allocation.
    xHandle = xTaskCreateStatic(
        vTaskCode,          // Function that implements the task.
        "NAME",             // Text name for the task.
        STACK_SIZE,         // Stack size in words, not bytes.
        (void *) 1,         // Parameter passed into the task.
        tskIDLE_PRIORITY,   // Priority at which the task is created.
        xStack,             // Array to use as the task's stack.
        &xTaskBuffer        // Variable to hold the task's data structure.
    );

    // puxStackBuffer and pxTaskBuffer were not NULL,
    // so the task will have been created,
    // and xHandle will be the task's handle.
    // Use the handle to suspend the task.
    vTaskSuspend(xHandle);
}

```
##### Function Lists
- **System Functions Lists (primitives)**
  - `MX_FREERTOS_Init();` `osKernelStart();`
  - `vTaskStartScheduler`
  - `xTaskCreate`, `vTaskDelete`, `vTaskPrioritySet`
  - `vTaskDelayUntil`, `vTaskDelay`, `uxTaskPriorityGet`
  - `vTaskSuspend`, `vTaskResume`
  - `xTaskResumeFromISR`, `xTaskAbortDelay`
  - `taskENTER_CRITICAL`, `taskEXIT_CRITICAL`
  - `xTaskNotifyGive`, `ulTaskNotifyTake`, `xTaskNotify`
  - `xTimerCreate`, `xTimerStart`, `xTimerStop`
  - `xTimerChangePeriod`, `xTimerDelete`
  - `xTaskResumeFromISR`
  - `xQueueCreate`, `vQueueAddToRegistry`
  - `xQueueSend`, `xQueueReceive`
  - `xSemaphoreCreateBinary`, `xSemaphoreCreateCounting`, `xSemaphoreCreateMutex`, `vSemaphoreDelete`
  - `xSemaphoreGive`, `xSemaphoreTake`
  - `xTimerCreate`, `xTimerStart`

##### Split an application in tasks
Separate all "parallel" activities
A cyclic activity generally needs a dedicated task
Splitt the app by functionalities:
- USer interface
- Update of a display
- errors handling
- communications
- etc...

![App split in tasks](App%20split%20in%20tasks.png)
A driver may need one or more tasks (EX : Client - Server)
![Driver](Driver.png)
Reduce inter-task coupling
- In the following example the second solution is often the best one
![Multiple vs one](Multiple%20vs%20one.png)
Have not too few task
- Whats the utility of the kernel?
Have not too much tasks
- It increase the time spent in the kernel and the necessary RAM space
The task body
- must generally consume more than twice the time needed for a context switch
Keep the task body simple
- A task may call functions
No definitive rules Keep in mind:
- All tasks are not critical 
- Examples of non critical tasks
	- User interface
	- Screen refresh
	- Keyboard scanning
	- Communication (eg:terminal)
- Example of critical tasks
	- Errors handling (system protection)
	- Control loops
	- I/O (analogical, digitals, etc)
	- Communciations (eg:CanBus)
