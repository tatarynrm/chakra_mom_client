import register_success from "../../assets/sounds/success.mp3";
import register_error from "../../assets/sounds/error.m4a";



export const soundSuccessCreateTransportation = () => {
  let snd = new Audio(register_success);
  snd.volume = 0.6;
  snd.play();
};
export const soundErrorCreateTransportation = () => {
  let snd = new Audio(register_error);
  snd.volume = 1;
  snd.play();
};

