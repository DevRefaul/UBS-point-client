import React from "react";

const Blog = () => {
  return (
    <div className="w-[90%] md:w-[80%] mx-auto">
      <h2 className="text-3xl font-semibold text-center py-10">Our Blogs</h2>
      {/* questions and asnwers */}
      <div className="mt-10">
        {/* no 1 */}
        <div className="my-4 pb-4 border-b border-teal-400">
          <div className="flex justify-center">
            <img
              src="https://i.ibb.co/CQtD23Q/download.png"
              alt="What are the different ways to manage a state in a React
            application"
              className="h-32"
            />
          </div>
          <h4 className="text-2xl font-bold mb-6">
            What are the different ways to manage a state in a React
            application?
          </h4>
          <p>
            <span className="text-xl font-semibold underline">Ans :</span>
            There are some kinds of state but all of them four main types of
            state is used for managing React Application. Those are - <br />
          </p>
          <ol className="list-decimal list-inside ml-3 mt-2 font-bold">
            <li>Local state</li>
            <li>Global state</li>
            <li>Server state</li>
            <li>URL state</li>
          </ol>
        </div>

        {/* no 2 */}
        <div className="my-4 pb-4 border-b border-teal-400">
          <div className="flex justify-center">
            <img
              src="https://i.ibb.co/M9V7FYj/download.jpg"
              alt="How does prototypical inheritance work"
              className="h-32"
            />
          </div>
          {/* image end */}
          <h4 className="text-2xl font-bold mb-6">
            How does prototypical inheritance work?
          </h4>
          <p>
            <span className="text-xl font-semibold underline">Ans :</span>
            The Prototypal Inheritance is a feature in javascript used to add
            methods and properties in objects. It is a method by which an object
            can inherit the properties and methods of another object.
            Traditionally, in order to get and set the [[Prototype]] of an
            object, we use Object. getPrototypeOf and Object
          </p>
        </div>

        {/* no 3 */}
        <div className="my-4 pb-4 border-b border-teal-400">
          <div className="flex justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUJG9_PpPuzRectzQqu-ksnW_9DYjDgs66TQ&usqp=CAU"
              alt="What is a unit test? Why should we write unit tests"
              className="h-32"
            />
          </div>
          {/* image end */}
          <h4 className="text-2xl font-bold mb-6">
            What is a unit test? Why should we write unit tests?
          </h4>
          <p>
            <span className="text-xl font-semibold underline">Ans :</span>
            The main objective of unit testing is to isolate written code to
            test and determine if it works as intended. Unit testing is an
            important step in the development process, because if done
            correctly, it can help detect early flaws in code which may be more
            difficult to find in later testing stages.
          </p>
        </div>

        {/* no 4 */}
        <div className="my-4">
          <div className="flex justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqt1IHEYx4vayxkekz9fE7Lndh-W-sL-c83g&usqp=CAU"
              alt="React vs. Angular vs. Vue"
              className="h-32"
            />
          </div>
          {/* image end */}
          <h4 className="text-2xl font-bold mb-6">
            React vs. Angular vs. Vue?
          </h4>
          <p>
            <span className="text-xl font-semibold underline">Ans :</span>
            There are three frameworks for building web applications that every
            frontend developer has heard about: React, Vue.js, and Angular.
            React is a UI library, Angular is a fully-fledged front-end
            framework, while Vue.js is a progressive framework.
          </p>
        </div>
        {/* finished */}
      </div>
    </div>
  );
};

export default Blog;
