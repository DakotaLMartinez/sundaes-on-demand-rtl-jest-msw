# Sundaes On Demand

This project is the example project built alongside Bonnie Schulkin's [React Testing Library with Jest](https://www.udemy.com/course/react-testing-library/) course. I'm including some information below about the course content and below that I'll summarize my impressions of the course and some key takeaways.

### Description
React Testing Library has become an extremely popular option for testing React, and with good reason! This detailed, comprehensive course  provides a solid foundation for React app tests.

### Best Practices

React Testing Library is famously opinionated about testing best practices, and is written to encourage these best practices. This course teaches:

- testing behavior over testing implementation

- tests that interact with your app the way a user would

- finding elements by accessibility handles, to make sure your code is accessible as possible

### Broad range of testing examples

The course apps start very with very simple examples (clicking a button to change its color) and work up to progressively more complicated testing concepts, such as: 

- testing asynchronous page changes

- simulating data from a server using Mock Service Worker

- applying a context provider to a component when rendering

The course builds up to complex concepts gradually, in a way designed to support your learning and ensure your success.

### Practice your new skills

You will also have plenty of opportunities to practice what you’ve learned. The course provides "code quizzes" while building the course projects, where you can apply what you learned and then watch a video to see the solution. The (optional) final section provides even more exercises to complete the second app and reinforce concepts from the course.

## My Impressions

I really appreciated the code quizzes. I felt they were well paced, keeping you just on the edge of being comfortable but definitely not too much. I also really liked that they became more frequent towards the end of the course, so it really started to feel like we were building the app & tests based on a mockup and spec rather than just doing a codealong.

I also really liked the introduction of a workflow with a series of questions to ask when writing tests. I ended up making a [dash](https://kapeli.com/dash) snippet for it and using it to guide the process. Here's a breakdown of it:

### Feature description


| Question                | Answer |
| ----------------------- | ------ |
| What to render?         |        |
| Pass props?             |        |
| Wrap render?            |        |
| Which file for tests?   |        |
| What to test?           |        |
| How to test?            |        |
| Do we need async/await? |        |

The idea is to think about the feature you're building and then ask this series of questions to determine the how/what/where of your approach to testing the components involved. I love this questions driven approach and use it a lot in my own teaching as I find it's effective at delivering lasting value to students. 

I came away from the course with a good sense of how to test most situations that I find myself in when building React applications. My next learning goals at the moment are to start working on integrating typescript in my work and also getting CI/CD set up for my own projects. I've worked on projects that had an integrated pipeline already set up, but never done the setup and configuration myself, so that's my current next step.

Overall, I definitely recommend the course. I'm looking forward to doing more of Bonnie's courses in the future. In particular, I've got my eye on her [course on React Query](https://www.udemy.com/course/learn-react-query/) (TanStack Query). 