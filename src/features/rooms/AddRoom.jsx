import Button from "../../ui/Button";
import Modal from "./../../ui/Modal";
import CreateRoomForm from "./CreateRoomForm";

function AddRoom() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="room-form">
          <Button>Add new room</Button>
        </Modal.Open>
        <Modal.Window name="room-form">
          <CreateRoomForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddRoom() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new room
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateRoomForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddRoom;
