import NotificationModal from 'notification-modal';
import 'notification-modal/style.css'
import roseImage from '../images/spoon.svg';

export default function Modal() {
  return (
    <NotificationModal
      openButtonImageSrc= {roseImage}
      openButtonImageAlt="Abrir"
      modalTitle="Notificación"
      inputPlacehold="Escribe algo"
      notifyButtonText="Enviar"
      buttonColor="#000000"
      buttonHoverColor="#ffffff"
      buttonTextColor="#ffffff"
      inputFocusColor="#ffffff"
      modalTextColor="#ffffff"
      onNotify={(input: string) => alert(input)}
    />
  );
}