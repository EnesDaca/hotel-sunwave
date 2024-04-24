import Stat from "./Stat";
import PropTypes from "prop-types";

import {
  LuBriefcase,
  LuBanknote,
  LuCalendarDays,
  LuBarChart4,
} from "react-icons/lu";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, roomCount }) {
  // 1.
  const numBookings = bookings.length;

  // 2.
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3.
  const checkins = confirmedStays.length;

  // 4.
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * roomCount);
  // num checked in nights / all available nights
  // (num days * num rooms)

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<LuBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<LuBanknote />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<LuCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Ocupancy rate"
        color="yellow"
        icon={<LuBarChart4 />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}
Stats.propTypes = {
  bookings: PropTypes.array.isRequired,
  confirmedStays: PropTypes.array.isRequired,
  numDays: PropTypes.number,
  roomCount: PropTypes.number,
};

export default Stats;
