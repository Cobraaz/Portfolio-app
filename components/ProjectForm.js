import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const ProjectForm = ({ onSubmit, initialData = {} }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: initialData,
  });

  const handleDateChange = (dateType, setDate) => (date) => {
    setValue(dateType, date);
    setDate(date);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="title">Header</label>
        <input
          ref={register}
          name="header"
          type="text"
          className="form-control"
          id="header"
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">Image</label>
        <input
          ref={register}
          name="img"
          type="text"
          className="form-control"
          id="img"
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">Title</label>
        <input
          ref={register}
          name="title"
          type="text"
          className="form-control"
          id="title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="street">Description</label>
        <input
          ref={register}
          name="description"
          type="text"
          className="form-control"
          id="description"
        />
      </div>

      <div className="form-group">
        <label htmlFor="street">Github</label>
        <input
          ref={register}
          name="github"
          type="text"
          className="form-control"
          id="github"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Link</label>
        <textarea
          ref={register}
          name="link"
          rows="5"
          type="text"
          className="form-control"
          id="link"
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default ProjectForm;
