import { useForm } from "react-hook-form";
import {
  Button,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";

import { motion } from "framer-motion";

const ContactForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ri-user-fill"></i>
          </InputGroupText>
        </InputGroupAddon>
        <input
          className="form-control"
          name="fullName"
          placeholder="FullName"
          required
          ref={register}
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ri-mail-send-fill"></i>
          </InputGroupText>
        </InputGroupAddon>
        <input
          className="form-control"
          placeholder="Email"
          name="email"
          required
          ref={register}
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ri-smartphone-fill"></i>
          </InputGroupText>
        </InputGroupAddon>
        <input
          className="form-control"
          placeholder="Phone no."
          name="phoneno"
          required
          ref={register}
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ri-message-3-fill"></i>
          </InputGroupText>
        </InputGroupAddon>
        <input
          className="form-control"
          type="textarea"
          name="text"
          id="exampleText"
          placeholder="Message"
          name="message"
          ref={register}
          required
        />
      </InputGroup>
      <InputGroup>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="btn-contact"
        >
          <i className="ri-save-2-line" style={{ float: "left" }}></i> Submit
        </motion.button>
      </InputGroup>
    </form>
  );
};

export default ContactForm;
