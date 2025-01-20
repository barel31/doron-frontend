import Modal from '@/components/Modal';
import { IconErrorPajamas } from '@/lib/icons';

function ErrorModal() {
  return (
    <Modal>
      <IconErrorPajamas className="m-auto mb-4 w-1/4" />

      <h1 className="text-3xl/10">תקלה התרחשה בעט שליחת ההודעה</h1>

      <h2 className="font-bold text-lime-500 text-lg m-2">
        מצטערים, אבל משהו קרה :( אפשר לנסות שוב.
      </h2>
    </Modal>
  );
}

export default ErrorModal;
