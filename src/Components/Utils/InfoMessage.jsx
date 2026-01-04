import { toast } from "react-toastify";

const WarningMessage = (message) => {
  toast.warn(message, {
    position: "top-right",  
    autoClose : 1500
  });
}

const ErrorMessage = (message) => {
  toast.error(message, {
    position: "top-right", 
    autoClose : 1500 
  });
}

export {WarningMessage,ErrorMessage};