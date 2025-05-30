import NotificationModal from 'notification-modal';
import 'notification-modal/style.css'

export default function Modal() {
  return (
    <NotificationModal
      openButtonImageSrc="ruta/imagen.png"
      openButtonImageAlt="Abrir modal"
      modalTitle="Ejemplo"
      inputPlacehold="Escribe algo"
      notifyButtonText="Enviar"
      buttonColor="#007BFF"
      buttonHoverColor="#0056b3"
      buttonTextColor="#fff"
      inputFocusColor="#007BFF"
      modalTextColor="#000"
      onNotify={(input) => console.log(input)}
    />
  );
}