import styled from "styled-components";
import PropTypes from "prop-types";

import CreateRoomForm from "./CreateRoomForm";
import { useDeleteRoom } from "./UseDeleteRoom";
import { formatCurrency } from "../../utils/helpers";
import { useCreateRoom } from "./useCreateRoom";

import { FaCopy } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

// const Img = styled.img`
//   display: block;
//   width: 6.4rem;
//   aspect-ratio: 3 / 2;
//   object-fit: cover;
//   object-position: center;
//   transform: scale(1.5) translateX(-7px);
// `;

const Room = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function RoomRow({ room }) {
  const { isDeleting, deleteRoom } = useDeleteRoom();
  const { isCreating, createRoom } = useCreateRoom();
  const {
    id: roomId,
    name,
    image,
    maxCapacity,
    regularPrice,
    discount,
    description,
  } = room;

  function handleDuplicate() {
    createRoom({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row>
      <img src={image} alt="room look" />
      <Room>{name}</Room>
      <div>Fits up tp {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <button disabled={isCreating} onClick={handleDuplicate}>
          <FaCopy />
        </button>

        <Modal>
          <Modal.Open opens="edit">
            <button>
              <FaPencilAlt />
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateRoomForm roomToEdit={room} />
          </Modal.Window>

          <Modal.Open opens="delete">
            <button>
              <FaTrashAlt />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="rooms"
              disabled={isDeleting}
              onConfirm={() => deleteRoom(roomId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

RoomRow.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default RoomRow;
