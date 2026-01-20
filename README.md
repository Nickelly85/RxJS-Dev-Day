# RxJS Dev Day

## Development server

To start a local development server, run:

```
ng serve
```

## Introduction

This project consists of 5 exercises that will cover different rxjs concepts some basic and some more complicated.
The solutions are provided in the solutions branch. There are five components you will be working in each marked by there exercise number.
I have set up a `user.service.ts` file that has three methods `getUsers` which returns an
observable of static users that will not change, `getRandomUsers` which returns an observable of random
users everytime and `getRandomUser` which returns a singular random user.

## EXERCISE 1 - Manual vs Async Subscription

### Part 1 - Manual

The button at the top of the screen calls a `loadUsers` method. Create a private function that subscribes to an `RxJS` Observable to fetch
and display users. Store the subscription in a variable, and use its closed property to control the UI: show the `<app-loading-spinner>` instead
of the "Load Users" text and disable the loadUsers button while the subscription is active.

Subscription cleanup will be covered throughout all the exercises and while it is not strictly necessary here, it is 
good practice to use the `takeUntilDestroyed` operator with `DestroyRef` because the subscription isn't done inside
an injection context. Doing this makes sure that if a user navigates away from the component, the network call will be
cancelled and resources will not be wasted.

### Part 2 - Async

Solve the same problem as Part 1 but this time make use of the `async` pipe to automatically manage the subscription,
cancelling it if the user navigates away from the component.

<details>
  <summary><strong>Hint</strong></summary>
  One way to handle the loading state is to use a BehaviourSubject and finalize pipe operator. In the HTML
  use the | async to unwrap the Behaviour subject into it's boolean value.
</details>

## EXERCISE 2 - Multicasting with Subjects

### Part 1 - Basic

In RxJS Subjects are both observers and observables, which means you can emit values into them and also subscribe to receive those values. This
makes them ideal for sharing data between multiple subscribers. On this page, the setup simulates two separate components. You will use a `Subject`
to emit values from the `userService.getUsers()` method, which returns a list of random users. Each component has its own `User[]` property to hold its
list of users. Create two subscriptions from the Subject, one for each component and assign the emitted value to the corresponding `User[]`. This way,
both components share the same list of random users.

Subjects are hot observables, they can emit values even if no one is subscribed.
If a subscription to a subject is not cleaned up, it retains a reference to the subscriber, 
which can prevent the component from being garbage collected and cause memory leaks.
To avoid this, always clean up subscriptions to subjects, for example by using `takeUntilDestroyed` in Angular components.

### Part 2 - Subject as Event Emitter

Subjects aren’t just for multicasting values — they can also act as event emitters. In this part, you’ll modify your code from Part 1 to use a
`Subject<void>` that triggers the HTTP request whenever it emits. You can create a subject called `loadUsers$` and use `switchMap` to connect it to your
`userService.getUsers()` observable. This way, emitting a value into the subject will automatically trigger the HTTP request. In your loadUser() method
call `loadUser$.next()` to start the request. To avoid repeating the `pipe()` statement for each subscription, assign the piped observable to a new variable.
Finally create two separate subscriptions from the new variable, one for usersA and one for usersB.


### Part 3 - shareReplay()

After completing the previous part, you may have noticed that each component was receiving its own separate list of users. This happens because each
subscription was triggering a new network request, and since the method returns a random list of users each time, the results were different for
each component. One way to solve this is by using `shareReplay()`. This operator allows multiple subscriptions to share the same underlying observable and caches the
last emitted values, preventing duplicate HTTP requests. Using `shareReplay(1)` ensures that all subscribers receive the same most recent value without
triggering a new network call. Finally for fun use the `map` operator to filter Component B's list to only include users where `isActive` is true.

### Optional

Behaviour Subjects are great for state, in exercise one part 2 we handled loading state with a Behaviour subject and `| async`.
Try and do the same thing here.


## EXERCISE 3 - Live Search with RxJS

FormControls have a property called valueChanges which is an observable that emits a new value every time the control's value changes.
On the page there is a text input that is hooked up to a FormControl, use the valueChanges observable to access the input value using it to filter
the userServices `getUsers()` response observable. Implement filtering against any of the object fields.
`getUsers()` returns the same list of users everytime, this
helps simulate a database.

Constraints:
1. The user list should be populated immediately when the page loads, before any input is provided.
2. Requests should only be triggered after the user has stopped typing for at least 300 ms.
3. Identical consecutive input values should not trigger a new request.
4. If a new input value is entered while a request is still in progress, the previous request should be cancelled and replaced with the new one.
5. Observable should be cleaned up on component destruction.

<details>
  <summary><strong>Show Operators</strong></summary>

Make use of operators: **`debounceTime`**, **`startWith`**, **`distinctUntilChanged`**, **`switchMap`**, **`map`**

Clean up the observable with **`takeUntilDestroyed()`**.  
If done outside an injection context, create a **`DestroyRef`**.
</details>

## EXERCISE 4 - Polling with Flattening Operators

### Part 1

RxJS lets us create observables that emit values at regular intervals,
and by combining these with flattening operators, we can implement polling. For this exercise the goal is to
create an `interval` that runs every `1` second for a total of `5` emissions. On each emission, filter the results to include
only users with a 'hotmail' email, and accumulate the results so that each new emission adds to the previous ones
instead of replacing them. Finally, while the interval is finite, (using take pipe) there is still potential for a
memory leak if the user navigates away from the component before polling is complete. Make sure to use 
`takeUntilDestroyed()` with a `DestroyRef` (because it's outside the injection context) to clean up the
subscription and avoid this.


<details>
  <summary><strong>Show Operators</strong></summary>

Make use of operators: **`mergeMap`**, **`take`**, **`interval`**, **`map`**, **`scan`**
</details>

### Part 2 - Same but Different...

There are four main flattening operators `switchMap`, `mergeMap`, `concatMap` and `exhaustMap`. They provided
the same core functionality but differ in how and when they subscribe and execute inner observables.

Try swapping out your current flattening operator for another and watch your dev tools network tab, notice the differences.

<details>
  <summary><strong>Show Flattening Operator Definitions</strong></summary>

- **`mergeMap`** - Subscribes to inner observables concurrently, allowing multiple observables to run in parallel.
- **`switchMap`** - Cancels the active inner observable and switches to the latest one.
- **`concatMap`** - Subscribes to inner observables sequentially, waiting for each observable to finish before subscribing to the next.
- **`exhaustMap`** - Ignores new inner observables while the current one is active, only subscribing to the next after the current completes.
</details>

Similarly `scan` and `reduce` share a same core functionality. Try swapping `scan` for `reduce`.

<details>
  <summary><strong>Show Accumulator Operator Definitions</strong></summary>

- **`scan`** - Keeps a running total, emitting the updated result every time a new value arrives.
- **`reduce`** - Waits until the stream finishes, then emits a single final total.
</details>

Finally `take`, `takeWhile` and `takeUntil` share a common functionality. Make use of takeWhile to run the interval
until we have at least 10 users.

<details>
  <summary><strong>Hint</strong></summary>
  Move takeWhile below `scan` and compare against the allUsers accumulator making use of the inclusive flag
to emit the value that fails the condition.
</details>
<br>
<details>
  <summary><strong>Show Filtering Operator Definitions</strong></summary>

- **`take`** - Emits only the first N values from the source observable, then completes.
- **`takeWhile`** - Emits values while a given condition is true, and completes immediately when the condition becomes false, without emitting the final value.
- **`takeUntil`** - Emits values from the source observable until another notifier observable emits, at which point it completes immediately.
</details>

## EXERCISE 5 - Event Observables & Combining Observable Streams

Oh no, where did the load users button go! How will we load users now...with `fromEvent` we can create observables
from events! For this exercise you will create three event observables, `click`, `dblclick` and `keydown`. When a user performs a single click
wait briefly before executing the logic. If a double click occurs during this waiting period the single click action should be cancelled. If no
double click occurs trigger, `userService.getRandomUsers()` and `userService.getUser()` merging the two streams together and combining the 
data into one array. When a user performs a double click trigger, `userService.getRandomUser()` to get one random user add this user to the existing
user array, ensure this behaviour doesn't trigger the single-click event. Finally, when a user presses the `Backspace` on their keyboard clear the
users list. Ensure all subscriptions are properly cleaned up.

<details>
  <summary><strong>Show Operators</strong></summary>

Make use of operators: **`fromEvent`**, **`takeUntil`**, **`takeUntilDestroyed`**, **`switchMap`**, **`timer`**, **`map`**, **`filter`**, 
**`forkJoin`**
</details>
