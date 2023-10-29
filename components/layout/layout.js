import { Fragment, useContext } from 'react';

import MainHeader from './main-header';
import Notification from '../ui/notification';
import NotificationContext from '../../store/notification-context';

// this component has the job of conditionally rendering the <Notification /> component when there is data available, and also propping in the necessary data to the component
// so that the values can be used to correctly display the background and text of the notification banner, this Layout component itself is being rendered as a Footer component
// back in the _app.js file

function Layout(props) {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
