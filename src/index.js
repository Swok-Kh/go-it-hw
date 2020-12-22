import './styles.css';
import { CountdownTimer } from './js/CountdownTimer';
import { DatePicker } from './js/DatePicker';
import { Date } from 'core-js';

const countdownTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Dec 18, 2021'),
});

const date = new Date();
const datePicker = new DatePicker({
  yearSelector: '#year',
  monthSelector: '#month',
  daySelector: '#day',
  hourSelector: '#hour',
  minSelector: '#min',
  secSelector: '#sec',
  buttonSelector: 'button[data-action="set-timer"]',
  startYear: date.getFullYear(),
  startMonth: date.getMonth() + 1,
  startDay: date.getDate(),
  startHour: date.getHours(),
  startMin: date.getMinutes(),
  startSec: date.getSeconds(),
});

datePicker._dateRefs.button.addEventListener(
  'click',
  datePicker._buttonHandler.bind(
    datePicker,
    countdownTimer.setTargetDate.bind(countdownTimer),
  ),
);
