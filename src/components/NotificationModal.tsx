import NotificationModal from 'notification-modal';
import 'notification-modal/style.css'

export default function Modal() {
  return (
    <NotificationModal
      openButtonImageSrc= "../images/spoon.svg"
      openButtonImageAlt="Abrir"
      modalTitle="Notificación"
      inputPlacehold="Escribe algo"
      notifyButtonText="Enviar"
      buttonColor="#000000"
      buttonHoverColor="#ffffff"
      buttonTextColor="#ffffff"
      inputFocusColor="#0b520e"
      modalTextColor="#ffffff"
      onNotify={(input: string) => alert(input)}
    />
  );
}