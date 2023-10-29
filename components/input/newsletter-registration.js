import { useRef, useContext } from 'react';

import classes from './newsletter-registration.module.css';
import NotificationContext from '../../store/notification-context';

// the goal of this component is pass in notification data to the NotificationProvider component so its data can be displayed Notification component ...
// (<Notification />) component is being rendered under layout.js, the Notification coponent itself is found under notification.js

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending',
    });

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        // if signup was sucessful, return the notification object with success title, message, and status
        if (response.ok) {
          return response.json();
        }

        // if something went wrong, return a notification object with a status and title of error
        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      // if response.ok, it will return this object
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully registered for newsletter!',
          status: 'success',
        });
      })
      // if it hit the error block, it will return this object
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong!',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
