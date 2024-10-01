import register_success from "../../assets/sounds/success.mp3";



export const soundSuccessCreateTransportation = () => {
  let snd = new Audio(register_success);
  snd.volume = 0.6;
  snd.play();
};
// export const soundUserRegisterError = () => {
//   let snd = new Audio(register_error);
//   snd.volume = 1;
//   snd.play();
// };

