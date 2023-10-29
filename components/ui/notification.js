import { useContext } from 'react';

import classes from './notification.module.css';
import NotificationContext from '../../store/notification-context';

// this component is responsible for conditionly rendering the notification footer by setting CSS classes which are determined with the current notification context values
// if you give an VALID email for the notifcation signup form, the footer background will be green
// if you give an INVALID email for the notifcation signup form, the footer background will be red

// the useEffect in the NotificationContextProvider has the job out setting notificationData(null) after three seconds, which will hide the banner
// the code for conditionally rendering the <Notification /> component when there is active notification data can also be found in the layout.js file

function Notification(props) {
  const notificationCtx = useContext(NotificationContext);

  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  if (status === 'pending') {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
