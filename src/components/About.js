import React from "react";

const AboutUs = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>About iNotebook</h1>
          <p>
            Welcome to iNotebook, your digital companion for seamless note-taking and organization. iNotebook is a robust web application crafted with the power of React and the
            flexibility of Bootstrap. Designed to simplify your note-taking experience, iNotebook empowers you to create, update, and delete notes with ease, all while ensuring the
            security of your information through robust authentication mechanisms.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h2>Features:</h2>
          <ul>
            <li>
              <strong>Intuitive User Interface:</strong> iNotebook boasts an intuitive and user-friendly interface that makes note-taking a breeze. The clean design ensures that
              you can focus on your thoughts without unnecessary distractions.
            </li>
            <li>
              <strong>Responsive Design:</strong> Whether you're on a desktop, tablet, or smartphone, iNotebook adapts to your screen size, providing a seamless experience across
              all devices. Take your notes on the go, wherever inspiration strikes.
            </li>
            <li>
              <strong>Note Management:</strong> Create, update, and delete notes effortlessly. iNotebook's efficient note management system allows you to organize your thoughts and
              ideas in a structured manner.
            </li>
            <li>
              <strong>Authentication:</strong> Your privacy and security are our top priorities. iNotebook implements a robust authentication system to ensure that only authorized
              users have access to their notes. Feel confident in the confidentiality of your information.
            </li>
          </ul>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h2>How It Works:</h2>
          <ol>
            <li>
              <strong>Sign Up or Log In:</strong> Get started by creating an account or logging in with your existing credentials. Your account ensures a personalized and secure
              space for your notes.
            </li>
            <li>
              <strong>Create Notes:</strong> Once logged in, unleash your creativity by creating new notes. Capture your ideas, to-do lists, or anything else you want to remember.
            </li>
            <li>
              <strong>Update with Ease:</strong> Need to make changes? No problem. iNotebook allows you to update your notes effortlessly, ensuring that your information stays
              current.
            </li>
            <li>
              <strong>Delete When Needed:</strong> Whether it's decluttering or reorganizing, iNotebook lets you delete notes seamlessly. Your workspace remains tidy and efficient.
            </li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h2>Our Mission:</h2>
          <p>
            At iNotebook, we believe in the power of organization and creativity. Our mission is to provide users with a reliable and secure platform to express their thoughts,
            manage their tasks, and enhance productivity. We are committed to continuous improvement, listening to user feedback, and evolving to meet the dynamic needs of our
            community.
          </p>

          <p>Join us on this journey of digital note-taking excellence. Welcome to iNotebook – where your ideas find a home.</p>

          <p>Happy Note-Taking!</p>

          <p>The iNotebook Team</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
