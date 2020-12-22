import './styles.css';
import ColorSwitcher from './js/ColorSwitcher';
import colors from './js/colors';

new ColorSwitcher({
  startButton: 'button[data-action="start"]',
  stopButton: 'button[data-action="stop"]',
  colors,
});
